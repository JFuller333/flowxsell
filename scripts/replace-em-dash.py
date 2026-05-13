#!/usr/bin/env python3
"""Replace U+2014 EM DASH in project text files: spaced form becomes comma+space; remainder becomes ASCII hyphen."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP_PARTS = frozenset({"node_modules", "dist", "build", ".git"})
EXTS = frozenset({".tsx", ".ts", ".js", ".html", ".css", ".json", ".md", ".mjs", ".cjs"})

EM = "\u2014"


def transform(s: str) -> str:
    out = s.replace(f" {EM} ", ", ")
    out = out.replace(EM, "-")
    out = re.sub(r",\s*,", ", ", out)
    return out


def main() -> int:
    changed = 0
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in EXTS:
            continue
        if any(p in SKIP_PARTS for p in path.parts):
            continue
        try:
            raw = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        if EM not in raw:
            continue
        new = transform(raw)
        if new != raw:
            path.write_text(new, encoding="utf-8")
            changed += 1
            print(path.relative_to(ROOT))
    print(f"Updated {changed} files.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
