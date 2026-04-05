import json
from datetime import datetime
from pathlib import Path
from typing import Dict


SAFE_FOODS_PATH = Path(__file__).with_name("safe_foods.json")


def _load_items():
    if not SAFE_FOODS_PATH.exists():
        return []

    try:
        with SAFE_FOODS_PATH.open("r", encoding="utf-8") as handle:
            data = json.load(handle)
    except (json.JSONDecodeError, OSError):
        return []

    return data if isinstance(data, list) else []


def _save_items(items):
    with SAFE_FOODS_PATH.open("w", encoding="utf-8") as handle:
        json.dump(items, handle, indent=2)


def add_to_list(item_name: str, status: str) -> Dict[str, object]:
    """
    Adds a safe food item to a local Safe Foods list.

    In a real ADK-integrated environment this tool can be mapped to
    a notes or reminders bridge. In this local fallback implementation,
    it writes to safe_foods.json in the skill folder.
    """
    entry = {
        "item_name": item_name,
        "status": status,
        "saved_at": datetime.utcnow().isoformat(timespec="seconds") + "Z"
    }

    items = _load_items()
    items.append(entry)
    _save_items(items)

    return {
        "success": True,
        "saved_item": f"{item_name} ({status})",
        "storage": str(SAFE_FOODS_PATH)
    }


if __name__ == "__main__":
    demo = add_to_list("Example Granola", "Gluten-Free")
    print(json.dumps(demo, indent=2))
