# Dietary Guard

Dietary Guard is your offline grocery safety companion for travel. Standing in a store, holding a local snack with a label you can't read, no internet, and no desire to spend your vacation in a doctor's office, you can use Dietary Guard to translate the label, analyze ingredients, and flag gluten, dairy, sugar, soy, and nuts. Everything runs locally on-device, stays private, and never sends your food or health information to the cloud.

## Repository Description

Universal dietary safety skill for Gemma-style local runtimes with ingredient scanning, allergen detection, and caution logic for food label images and ingredient lists.

## Project Goal

This repository is now focused only on the **Gemma local / offline** path.

The intended runtime model is:

- local multimodal label reading
- local ingredient reasoning
- local safety classification

No cloud-backed development path is included anymore.

## Verified Local Setup

The local LiteRT-LM runtime is working on this Mac with:

- `Python 3.14.3`
- `litert-lm 0.10.1`

Set it up with:

```bash
cd "/Users/somdattabanerjee/Documents/ML course/dietary-guard"
python3.14 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install litert-lm
```

The verified CLI surface is:

```bash
litert-lm --help
litert-lm run --help
```

The working command pattern is:

```bash
litert-lm run <MODEL_REFERENCE> --prompt "your prompt here"
```

## Files

- `SKILL.md` - core dietary-guard instruction set
- `config.json` - skill metadata and capability declaration
- `gemma_local_prompt.md` - prompt scaffold for a local Gemma runtime
- `run_gemma_local.sh` - verified LiteRT-LM runner for local prompt execution
- `GEMMA_LOCAL.md` - notes on the true offline Gemma path
- `main.py` - local save-to-list fallback tool
- `safe_foods.json` - local saved-items file
- `LICENSE` - MIT license

## Core Features

- offline-first dietary safety workflow
- ingredient translation and interpretation
- allergen detection for nuts, soy, gluten, dairy, and sugar
- conservative caution handling for ambiguous ingredients
- privacy-first design with no cloud storage requirement

## Local Python Test

You can test the local helper behavior right now:

```bash
cd "/Users/somdattabanerjee/Documents/ML course/dietary-guard"
python3 main.py
cat safe_foods.json
```

## Gemma Local Direction

The repository is now aligned to the verified LiteRT-LM local runtime on your Mac.

Use the prompt and helper script as the local Gemma entry point once you have a compatible `.litertlm` model file or imported model ID:

```bash
cd "/Users/somdattabanerjee/Documents/ML course/dietary-guard"
./run_gemma_local.sh <MODEL_REFERENCE>
```

## Important Note

This repository is intentionally focused on the offline Gemma direction only.

The remaining step is getting a compatible local Gemma `.litertlm` model bundle imported or available by path. The LiteRT-LM runtime itself is installed and verified. The current CLI help exposes text prompt execution and Python presets, but does not yet show a documented `--image` flag, so the repo avoids claiming a verified image command until that interface is confirmed.

## Demo Pitch

Dietary Guard is your offline grocery safety companion for travel. Standing in a store, holding a local snack with a label you can't read, no internet, and no desire to spend your vacation in a doctor's office, you can use Dietary Guard to translate the label, analyze ingredients, and flag gluten, dairy, sugar, soy, and nuts. Everything runs locally on-device, stays private, and never sends your food or health information to the cloud.
