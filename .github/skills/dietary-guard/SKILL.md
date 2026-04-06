---
name: dietary-guard
description: Analyze food label images or ingredient lists for soy, nuts, gluten, and added sugar risk.
version: 1.2.0
capabilities: [vision, reasoning]
---

# Dietary Guard

## Instructions
Use this skill when the user wants a food label image or ingredient list checked for soy, nuts, gluten, or added sugar.

1. If the user provides an image, first read the ingredient text from the image.
2. Call the `run_js` tool to analyze the ingredient list with these exact parameters:
   - skill name: `dietary-guard`
   - script name: `index.html`
   - data: a JSON string with:
     - `product_name`: string. Use an empty string if unknown.
     - `ingredients_text`: string. Pass the extracted or provided ingredient list exactly as text.
3. After the tool returns, present the returned markdown result as the final answer.
4. Do not call any other tools for the ingredient analysis.
5. If the ingredient text cannot be read, ask the user for a clearer image or a typed ingredient list.
