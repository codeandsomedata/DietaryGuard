# Gemma 4 Local Runtime Notes

This repository is focused only on the **Gemma local / offline** execution path.

## Target Runtime

The intended runtime stack is:

1. **Gemma local model bundle**
2. **LiteRT-LM** for local inference
3. **Image-capable prompt execution** for ingredient-label analysis
4. **Local safe-food persistence** through the existing JSON fallback tool

## Current State

The repository already includes:

- `SKILL.md` for the core dietary reasoning logic
- `gemma_local_prompt.md` for local prompt execution
- `run_gemma_local.sh` as a local LiteRT-LM runner
- `main.py` as a local persistence helper
- `safe_foods.json` as a local saved-items store

## Verified Runtime State

On this machine:

- `python3.14 --version` returns `Python 3.14.3`
- `pip install litert-lm` succeeded inside `.venv`
- `litert-lm --help` and `litert-lm run --help` both work

That means the LiteRT-LM runtime is no longer the blocker.

## What You Need for a True Local Run

1. A compatible Gemma `.litertlm` model package on disk, or an imported model ID
2. The dietary guard prompt or preset
3. A validated multimodal message path if image input is required

## Verified Invocation Shape

The verified CLI command shape is:

```bash
litert-lm run <MODEL_REFERENCE> --prompt "your prompt here"
```

## Notes on Image Input

The currently installed CLI help does not expose a documented `--image` flag. LiteRT-LM does expose a Python API and a `--preset` option for Python-based tools and system instructions, so multimodal input may still be possible through the lower-level message API or a future CLI surface. Until that interface is verified, this repository intentionally documents only the working prompt-driven path.
