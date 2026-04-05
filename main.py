import json
import os

def add_to_list(product_name: str, safety_status: str):
    """Saves a safe food product to the local list."""
    new_entry = {
        "product": product_name,
        "status": safety_status,
        "date": "2026-04-05"
    }
    
    # Save to a local file on your Mac
    file_path = "safe_foods.json"
    data = []
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            data = json.load(f)
    
    data.append(new_entry)
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)
            
    return {"message": f"Successfully added {product_name} to your list."}
