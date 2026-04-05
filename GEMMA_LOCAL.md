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
- `run_gemma_local.sh` as a local invocation scaffold
- `main.py` as a local persistence helper
- `safe_foods.json` as a local saved-items store

## Current Local Blocker

On this machine, the LiteRT-LM installation path is partially reachable, but the package resolution failed because the dependency `litert-lm-api` was not available during install.

That means:

- the repository is aligned to the **correct local Gemma direction**
- the final missing step is a **working LiteRT-LM runtime installation**

## What You Need for a True Local Run

1. A working `litert-lm` install
2. A compatible Gemma model package on disk
3. A final command that accepts:
   - a model path
   - an image path
   - the dietary guard prompt

## Expected Invocation Shape

Once LiteRT-LM is working, the target command shape should look like:

```bash
litert-lm chat --model <MODEL_PATH> --image <IMAGE_PATH> --prompt-file gemma_local_prompt.md
```

The exact final flags may differ depending on the LiteRT-LM release available for your machine.
