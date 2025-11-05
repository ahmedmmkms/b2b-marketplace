#!/usr/bin/env python3
"""Aggregate runner that executes all task-specific success tests in sequence."""

import sys
from typing import Callable, List, Tuple

import test_utils

from test_t01_db_migrations import run as run_t01
from test_t02_health import run as run_t02
from test_t03_feature_flags import run as run_t03
from test_t05_catalog_browse import run as run_t05
from test_t06_catalog_detail import run as run_t06
from test_t07_admin_create_vendor import run as run_t07
from test_t08_admin_create_product import run as run_t08
from test_t10_toggle_flags import run as run_t10
from test_t12_rfq_create_get import run as run_t12
from test_t13_rfq_add_line import run as run_t13
from test_t14_rfq_issue import run as run_t14
from test_t15_submit_quote import run as run_t15
from test_t16_list_quotes import run as run_t16
from test_t17_accept_quote import run as run_t17
from test_t22_create_order_from_quote import run as run_t22
from test_t23_get_order import run as run_t23

TestRunner = Tuple[str, Callable[[], bool]]

TEST_SEQUENCE: List[TestRunner] = [
    ("T2 (App health)", run_t02),
    ("Authentication (admin)", lambda: test_utils.authenticate_user("admin")),
    ("T3 (Feature flags)", run_t03),
    ("T5 (Catalog browse)", run_t05),
    ("T6 (Catalog detail)", run_t06),
    ("T7 (Admin create vendor)", run_t07),
    ("T8 (Admin create product)", run_t08),
    ("T1 (DB migrations)", run_t01),
    ("T10 (Toggle exposure via flags)", run_t10),
    ("T12 (RFQ create + get)", run_t12),
    ("T13 (RFQ add line)", run_t13),
    ("T14 (RFQ issue)", run_t14),
    ("T15 (Submit quote)", run_t15),
    ("T16 (List quotes for RFQ)", run_t16),
    ("T17 (Accept quote)", run_t17),
    ("T22 (Create order from accepted quote)", run_t22),
    ("T23 (Get order)", run_t23),
]


def run_tests() -> bool:
    """Execute each registered test and print a consolidated summary."""
    print(
        "Running tests for T1 (DB migrations), T2 (App health), T3 (Feature flags), "
        "T5 (Catalog browse), T6 (Catalog detail), T7 (Admin create vendor), "
        "T8 (Admin create product), T10 (Toggle exposure via flags), "
        "T12 (RFQ create + get), T13 (RFQ add line), T14 (RFQ issue), "
        "T15 (Submit quote), T16 (List quotes for RFQ), T17 (Accept quote), "
        "T22 (Create order from accepted quote), and T23 (Get order)"
    )
    print("=" * 70)

    results: List[Tuple[str, bool]] = []
    for label, runner in TEST_SEQUENCE:
        print(f"\n--- {label} ---")
        try:
            success = runner()
        except Exception as exc:  # pylint: disable=broad-except
            print(f"[FAIL] {label}: Encountered unexpected exception: {exc}")
            success = False
        results.append((label, success))

    print("\n" + "=" * 70)
    print("SUMMARY:")
    for label, success in results:
        status = "[PASS]" if success else "[FAIL]"
        print(f"{label}: {status}")

    overall_success = all(success for _, success in results)
    print(f"Overall: {'[PASS]' if overall_success else '[FAIL]'}")

    return overall_success


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
