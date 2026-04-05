# Dietary Guard

Dietary Guard is a universal on-device dietary safety skill for AI agents. It analyzes ingredient labels from images, flags potential issues across gluten, dairy, sugar, soy, and nuts, applies conservative caution rules for ambiguous ingredients and cross-contact warnings, and can save verified safe items to a local Safe Foods list.

## Repository Description

Universal dietary safety skill for on-device AI agents with ingredient scanning, allergen detection, caution logic, and safe-food list saving.

## What This Project Includes

- `SKILL.md` for the agent reasoning instructions
- `config.json` for capability and runtime configuration
- `main.py` for the local save-to-list tool
- `safe_foods.json` as a local fallback store after saving items

## Core Features

- multimodal ingredient label analysis
- allergen detection for nuts, soy, gluten, dairy, and sugar
- conservative caution logic for vague ingredients like `natural flavors`
- danger logic for cross-contact phrases like `may contain`
- local safe-food saving through a Python tool

## Files

- `SKILL.md` - main agent instructions and output schema
- `config.json` - proposed runtime metadata and tool declarations
- `main.py` - local safe-food storage tool
- `safe_foods.json` - generated local output file after running the tool
- `.gitignore` - common ignore rules
- `LICENSE` - MIT license

## Local Test

Run the local tool:

```bash
cd "/Users/somdattabanerjee/Documents/ML course/dietary-guard"
python3 main.py
```

That will write an example item into `safe_foods.json`.

## Example Output

```json
{
  "success": true,
  "saved_item": "Example Granola (Gluten-Free)",
  "storage": "/Users/somdattabanerjee/Documents/ML course/dietary-guard/safe_foods.json"
}
```

## Important Note

This repository is a practical GitHub-ready scaffold based on the requested design. The exact latest Google AI Edge / Gemma packaging and public gallery submission flow should still be verified against current official documentation before final submission.

## Suggested GitHub Topics

- `gemma`
- `on-device-ai`
- `multimodal`
- `allergen-detection`
- `dietary-safety`
- `ingredient-scanner`
- `food-tech`
- `python`
- `ai-agent`
- `ai-skill`

## Demo Pitch

Dietary Guard turns a food label photo into a structured dietary safety check for gluten, dairy, sugar, soy, and nuts, then lets users save verified safe foods locally.
