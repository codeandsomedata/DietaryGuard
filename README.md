# Dietary Guard

Dietary Guard is your offline grocery safety companion for travel. Standing in a store, holding a local snack with a label you can't read, no internet, and no desire to spend your vacation in a doctor's office, you can use Dietary Guard to translate the label, analyze ingredients, flag gluten, dairy, sugar, soy, and nuts, and save safe foods to your personal list. Everything runs locally on-device, stays private, and never sends your food or health information to the cloud.

## Repository Description

Universal dietary safety skill for Gemma-style local runtimes with ingredient scanning, allergen detection, caution logic, and safe-food list saving.

## Project Goal

This repository is now focused only on the **Gemma local / offline** path.

The intended runtime model is:

- local multimodal label reading
- local ingredient reasoning
- local safety classification
- local safe-food persistence

No cloud-backed development path is included anymore.

## Files

- `SKILL.md` - core dietary-guard instruction set
- `config.json` - skill metadata and capability declaration
- `gemma_local_prompt.md` - prompt scaffold for a local Gemma runtime
- `run_gemma_local.sh` - shell scaffold for local Gemma invocation
- `GEMMA_LOCAL.md` - notes on the true offline Gemma path
- `main.py` - local save-to-list fallback tool
- `safe_foods.json` - local saved-items file
- `LICENSE` - MIT license

## Core Features

- offline-first dietary safety workflow
- ingredient translation and interpretation
- allergen detection for nuts, soy, gluten, dairy, and sugar
- conservative caution handling for ambiguous ingredients
- local storage of verified safe foods
- privacy-first design with no cloud storage requirement

## Local Python Test

You can test the local save behavior right now:

```bash
cd "/Users/somdattabanerjee/Documents/ML course/dietary-guard"
python3 main.py
cat safe_foods.json
```

## Gemma Local Direction

The repository is structured for a true local Gemma runtime, but that runtime still depends on a working local LiteRT-LM or equivalent Gemma execution environment on your Mac.

Use the prompt and helper script as the local Gemma entry point:

```bash
cd "/Users/somdattabanerjee/Documents/ML course/dietary-guard"
./run_gemma_local.sh <MODEL_PATH> <IMAGE_PATH>
```

## Important Note

This repository is intentionally focused on the offline Gemma direction only.

At the moment, the final missing piece is a fully working local Gemma runtime installation for your machine. The project files here are prepared for that path, but the exact local model/runtime invocation still depends on the current LiteRT-LM and model packaging available for macOS.

## Demo Pitch

Dietary Guard is your offline grocery safety companion for travel. Standing in a store, holding a local snack with a label you can't read, no internet, and no desire to spend your vacation in a doctor's office, you can use Dietary Guard to translate the label, analyze ingredients, flag gluten, dairy, sugar, soy, and nuts, and save safe foods to your personal list. Everything runs locally on-device, stays private, and never sends your food or health information to the cloud.
