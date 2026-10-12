"""Check supplied learning materials against their recorded sizes and hashes."""

import hashlib
import json
from pathlib import Path


def main():
    root = Path(__file__).resolve().parents[1]
    manifest = json.loads((root / "materials/manifest.json").read_text(encoding="utf-8"))
    failed = []
    for item in manifest["files"]:
        relative = item["path"]
        path = (root / relative).resolve()
        if not path.is_relative_to(root) or not path.is_file():
            failed.append(relative)
            print(f"MISSING: {relative}")
            continue
        data = path.read_bytes()
        if len(data) != item["bytes"] or hashlib.sha256(data).hexdigest() != item["sha256"]:
            failed.append(relative)
            print(f"CHANGED: {relative}")
        else:
            print(f"OK: {relative}")
    print(f"Checked {len(manifest['files'])} files; {len(failed)} failed.")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
