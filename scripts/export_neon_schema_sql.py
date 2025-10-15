"""
Export the live Neon schema as executable SQL (functions, tables, constraints, indexes, triggers).

Usage:
    python scripts/export_neon_schema_sql.py --output docs/neon_schema.sql

Connection details are sourced from DB_URL / DB_USERNAME / DB_PASSWORD (same as dump_neon_schema).
"""

from __future__ import annotations

import argparse
import os
from collections import defaultdict
from dataclasses import dataclass
from typing import Dict, Iterable, List, Tuple
from urllib.parse import parse_qs, urlparse

import psycopg2
from psycopg2.extensions import connection as PgConnection


@dataclass
class DbConfig:
    host: str
    port: int
    dbname: str
    user: str
    password: str
    sslmode: str = "require"


def quote_ident(value: str) -> str:
    return '"' + value.replace('"', '""') + '"'


def parse_env() -> DbConfig:
    jdbc = os.getenv("DB_URL")
    if not jdbc or not jdbc.startswith("jdbc:postgresql://"):
        raise SystemExit("DB_URL must be provided in jdbc:postgresql:// format")

    url = urlparse(jdbc[5:])
    query = parse_qs(url.query)

    user = query.get("user", [os.getenv("DB_USERNAME") or ""])[0]
    password = query.get("password", [os.getenv("DB_PASSWORD") or ""])[0]

    if not user or not password:
        raise SystemExit("DB credentials missing (set DB_USERNAME/DB_PASSWORD or include in DB_URL)")

    return DbConfig(
        host=url.hostname or "localhost",
        port=url.port or 5432,
        dbname=(url.path or "/").lstrip("/"),
        user=user,
        password=password,
        sslmode=query.get("sslmode", ["require"])[0],
    )


def connect(cfg: DbConfig) -> PgConnection:
    return psycopg2.connect(
        host=cfg.host,
        port=cfg.port,
        dbname=cfg.dbname,
        user=cfg.user,
        password=cfg.password,
        sslmode=cfg.sslmode,
    )


def gather_functions(conn: PgConnection) -> List[str]:
    sql = """
        SELECT p.oid, quote_ident(n.nspname) || '.' || quote_ident(p.proname) AS name
        FROM pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
        WHERE n.nspname = 'public'
        ORDER BY 2
    """
    cur = conn.cursor()
    cur.execute(sql)
    fn_defs = []
    for oid, name in cur.fetchall():
        cur.execute("SELECT pg_get_functiondef(%s)", (oid,))
        fn_defs.append(cur.fetchone()[0].rstrip() + ";\n")
    cur.close()
    return fn_defs


def gather_tables(conn: PgConnection) -> Tuple[List[str], List[str]]:
    cur = conn.cursor()
    cur.execute(
        """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
        ORDER BY table_name
        """
    )
    tables = [row[0] for row in cur.fetchall() if row[0] != "flyway_schema_history"]
    table_statements: List[str] = []
    fk_statements: List[str] = []

    for table in tables:
        full = f"public.{quote_ident(table)}"
        cur.execute(
            """
            SELECT
                a.attnum,
                a.attname,
                pg_catalog.format_type(a.atttypid, a.atttypmod) AS data_type,
                a.attnotnull,
                pg_get_expr(ad.adbin, ad.adrelid) AS default_expr,
                a.attidentity
            FROM pg_attribute a
            LEFT JOIN pg_attrdef ad
                ON a.attrelid = ad.adrelid AND a.attnum = ad.adnum
            WHERE a.attrelid = %s::regclass
              AND a.attnum > 0
              AND NOT a.attisdropped
            ORDER BY a.attnum
            """,
            (full,),
        )
        columns = cur.fetchall()

        column_lines: List[str] = []
        for _, name, data_type, not_null, default_expr, identity in columns:
            line = f"    {quote_ident(name)} {data_type}"
            if identity and identity != " ":
                identity_clause = "ALWAYS" if identity == "a" else "BY DEFAULT"
                line += f" GENERATED {identity_clause} AS IDENTITY"
            if default_expr:
                line += f" DEFAULT {default_expr}"
            if not_null:
                line += " NOT NULL"
            column_lines.append(line)

        # Constraints
        cur.execute(
            """
            SELECT conname, contype, pg_get_constraintdef(oid, true)
            FROM pg_constraint
            WHERE conrelid = %s::regclass
              AND contype IN ('p','u','f','c','x')
            ORDER BY
                CASE contype WHEN 'p' THEN 0 WHEN 'u' THEN 1 WHEN 'f' THEN 2 WHEN 'c' THEN 3 ELSE 4 END,
                conname
            """,
            (full,),
        )
        constraints = cur.fetchall()
        for conname, contype, definition in constraints:
            if contype == "f":
                fk_statements.append(
                    f"ALTER TABLE {full} ADD CONSTRAINT {quote_ident(conname)} {definition};\n"
                )
            else:
                column_lines.append(f"    CONSTRAINT {quote_ident(conname)} {definition}")

        stmt = f"CREATE TABLE {full} (\n" + ",\n".join(column_lines) + "\n);\n"
        table_statements.append(stmt)

    cur.close()
    return table_statements, fk_statements


def gather_indexes(conn: PgConnection) -> List[str]:
    cur = conn.cursor()
    cur.execute(
        """
        SELECT
            ns.nspname AS schemaname,
            tbl.relname AS tablename,
            idx.relname AS indexname,
            pg_get_indexdef(i.indexrelid)
        FROM pg_index i
        JOIN pg_class idx ON idx.oid = i.indexrelid
        JOIN pg_class tbl ON tbl.oid = i.indrelid
        JOIN pg_namespace ns ON ns.oid = tbl.relnamespace
        LEFT JOIN pg_constraint con ON con.conindid = i.indexrelid
        WHERE ns.nspname = 'public'
          AND con.oid IS NULL -- exclude indexes backing constraints
        ORDER BY tbl.relname, idx.relname
        """
    )
    index_statements = []
    for schema, table, indexname, indexdef in cur.fetchall():
        if table == "flyway_schema_history":
            continue
        index_statements.append(indexdef.rstrip() + ";\n")
    cur.close()
    return index_statements


def gather_triggers(conn: PgConnection) -> List[str]:
    cur = conn.cursor()
    cur.execute(
        """
        SELECT tg.tgname,
               pg_get_triggerdef(tg.oid, true) AS definition,
               quote_ident(n.nspname) || '.' || quote_ident(c.relname) AS table_name
        FROM pg_trigger tg
        JOIN pg_class c ON c.oid = tg.tgrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND NOT tg.tgisinternal
        ORDER BY table_name, tg.tgname
        """
    )
    triggers = []
    for name, definition, table_name in cur.fetchall():
        triggers.append(definition.rstrip() + ";\n")
    cur.close()
    return triggers


def gather_extensions(conn: PgConnection) -> List[str]:
    cur = conn.cursor()
    cur.execute(
        """
        SELECT extname, extversion
        FROM pg_extension
        WHERE extname NOT IN ('plpgsql')
        ORDER BY extname
        """
    )
    statements = []
    for extname, _ in cur.fetchall():
        statements.append(f"CREATE EXTENSION IF NOT EXISTS {quote_ident(extname)};\n")
    cur.close()
    return statements


def build_sql(conn: PgConnection) -> str:
    extensions = gather_extensions(conn)
    functions = gather_functions(conn)
    tables, foreign_keys = gather_tables(conn)
    indexes = gather_indexes(conn)
    triggers = gather_triggers(conn)

    parts: List[str] = []
    if extensions:
        parts.append("-- Extensions\n" + "".join(extensions))
    if functions:
        parts.append("-- Functions\n" + "\n".join(functions))
    if tables:
        parts.append("-- Tables\n" + "\n".join(tables))
    if foreign_keys:
        parts.append("-- Foreign Keys\n" + "".join(foreign_keys))
    if indexes:
        parts.append("-- Indexes\n" + "".join(indexes))
    if triggers:
        parts.append("-- Triggers\n" + "".join(triggers))

    return "\n".join(parts).rstrip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Export Neon schema as SQL DDL.")
    parser.add_argument("--output", help="Path to write SQL output (default stdout)")
    args = parser.parse_args()

    cfg = parse_env()
    with connect(cfg) as conn:
        sql = build_sql(conn)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as fh:
            fh.write(sql)
    else:
        print(sql)


if __name__ == "__main__":
    main()
