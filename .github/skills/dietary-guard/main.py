import json
import os
from datetime import datetime


def add_to_list(product_name: str, safety_status: str):
    """
    Saves a verified food product to the local on-device JSON vault.

    Args:
        product_name: The name of the scanned item (e.g., 'Oat Milk').
        safety_status: The safety rating (e.g., 'Safe', 'Caution').
    """
    # Define the sandboxed storage path for iOS AI Edge Gallery
    storage_dir = "/Documents/DietaryGuard"
    file_path = os.path.join(storage_dir, "saved_foods.json")

    # Ensure the directory exists
    if not os.path.exists(storage_dir):
        os.makedirs(storage_dir)

    # Prepare the new entry
    new_entry = {
        "timestamp": datetime.now().isoformat(),
        "product": product_name,
        "status": safety_status
    }

    # Load existing data or start fresh
    data = []
    if os.path.exists(file_path):
        try:
            with open(file_path, "r") as f:
                data = json.load(f)
        except json.JSONDecodeError:
            data = []

    # Append and save
    data.append(new_entry)
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)

    return f"Successfully logged {product_name} as {safety_status}."


if __name__ == "__main__":
    # Internal test for local validation
    print("Dietary Guard Native Bridge Active.")
