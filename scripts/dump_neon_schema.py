"""
Utility to capture the current schema of the live Neon database.

Usage:
    python scripts/dump_neon_schema.py --output docs/neon_schema.md

Reads database connection details from environment variables:
    DB_URL (optional JDBC URL)
    DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD (fallback pieces)

The output is a Markdown document listing tables and their columns.
"""

from __future__ import annotations

import argparse
import os
import sys
from collections import OrderedDict
from dataclasses import dataclass
from typing import Optional
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


def parse_jdbc_url(jdbc_url: str) -> Optional[DbConfig]:
    if not jdbc_url.startswith("jdbc:postgresql://"):
        return None

    url = urlparse(jdbc_url[len("jdbc:") :])
    if not url.hostname or not url.path:
        return None

    dbname = url.path.lstrip("/")
    query = parse_qs(url.query)
    user = query.get("user", [None])[0]
    password = query.get("password", [None])[0]

    return DbConfig(
        host=url.hostname,
        port=url.port or 5432,
        dbname=dbname,
        user=user or os.getenv("DB_USERNAME") or "",
        password=password or os.getenv("DB_PASSWORD") or "",
        sslmode=query.get("sslmode", ["require"])[0],
    )


def build_config_from_env() -> DbConfig:
    jdbc_url = os.getenv("DB_URL")
    if jdbc_url:
        config = parse_jdbc_url(jdbc_url)
        if config:
            return config

    missing = [v for v in ("DB_HOST", "DB_NAME", "DB_USERNAME", "DB_PASSWORD") if not os.getenv(v)]
    if missing:
        raise SystemExit(f"Missing required environment variables: {', '.join(missing)}")

    return DbConfig(
        host=os.environ["DB_HOST"],
        port=int(os.getenv("DB_PORT", "5432")),
        dbname=os.environ["DB_NAME"],
        user=os.environ["DB_USERNAME"],
        password=os.environ["DB_PASSWORD"],
        sslmode=os.getenv("DB_SSLMODE", "require"),
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


def fetch_schema(conn: PgConnection) -> OrderedDict[str, list[tuple]]:
    query = """
        SELECT
            table_name,
            column_name,
            data_type,
            is_nullable,
            column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
        ORDER BY table_name, ordinal_position
    """

    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    cur.close()

    tables: OrderedDict[str, list[tuple]] = OrderedDict()
    for table_name, column_name, data_type, is_nullable, column_default in rows:
        tables.setdefault(table_name, []).append(
            (column_name, data_type, is_nullable, column_default)
        )
    return tables


def format_markdown(tables: OrderedDict[str, list[tuple]]) -> str:
    lines = [
        "# Neon Live Schema Snapshot",
        "",
        "Generated from `information_schema.columns`.",
        "",
    ]

    for table_name, columns in tables.items():
        lines.append(f"## {table_name}")
        lines.append("Column | Type | Nullable | Default")
        lines.append("--- | --- | --- | ---")
        for col_name, data_type, is_nullable, column_default in columns:
            default = (column_default or "").replace("\n", " ").strip()
            lines.append(f"{col_name} | {data_type} | {is_nullable} | {default}")
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Dump Neon schema into Markdown.")
    parser.add_argument("--output", help="Write Markdown to this path (default: stdout)")
    args = parser.parse_args()

    cfg = build_config_from_env()

    with connect(cfg) as conn:
        tables = fetch_schema(conn)
    markdown = format_markdown(tables)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as fh:
            fh.write(markdown)
    else:
        sys.stdout.write(markdown)


if __name__ == "__main__":
    main()

