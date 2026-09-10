"""
KYD overnight rescreen — offline twin of BAT-KYD-NIGHT.

Reads a distributor file, scores sanctions / PEP / media signals,
and writes an exception CSV that legal ops can open in Excel.

This is portfolio code: same control design as the Meridian workbench,
not a connection to live screening lists.
"""

from __future__ import annotations

import csv
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "distributors.csv"
EXCEPTIONS = ROOT / "kyd_exceptions.csv"

WEIGHTS = {
    "sanctions_score": 0.55,
    "pep_score": 0.25,
    "adverse_media": 0.20,
}
THRESHOLD = 0.62


def load_rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def score(row: dict[str, str]) -> float:
    total = 0.0
    for field, weight in WEIGHTS.items():
        total += float(row[field]) * weight
    if row.get("country_risk", "N") == "Y":
        total = min(1.0, total + 0.08)
    return round(total, 3)


def main() -> int:
    rows = load_rows(SOURCE)
    exceptions: list[dict[str, str]] = []
    for row in rows:
        value = score(row)
        row["composite"] = f"{value:.3f}"
        if value >= THRESHOLD or row.get("end_use_complete", "Y") == "N":
            row["reason"] = (
                "threshold"
                if value >= THRESHOLD
                else "incomplete_end_use"
            )
            exceptions.append(row)

    fields = [
        "party_id",
        "legal_name",
        "country",
        "composite",
        "reason",
        "end_use_complete",
    ]
    with EXCEPTIONS.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(exceptions)

    print(f"scanned={len(rows)} exceptions={len(exceptions)} -> {EXCEPTIONS.name}")
    print("Control: distributor rescreen must complete; exceptions cannot be silent.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
