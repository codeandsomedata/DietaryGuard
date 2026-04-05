# Gemma 4 Local Runtime Notes

This repository now supports two distinct development paths:

## 1. ADK + Gemini API

This is the runnable local setup already implemented in:

- `agent.ts`
- `package.json`
- `.env.example`

Use this path when you want to test the agent logic and tool flow locally through ADK.

## 2. Gemma 4 + LiteRT-LM

This is the intended direction for a true offline/on-device workflow.

### Important Distinction

The Gemma-local path is **not the same runtime** as the ADK TypeScript web flow.

- ADK TypeScript uses a hosted model API during local development
- Gemma local requires a local runtime such as LiteRT-LM plus a local Gemma model bundle

### Current Status on This Machine

The `litert-lm` package is visible from PyPI, but installation failed because its dependency
`litert-lm-api` was not available in this environment at install time.

Because of that, this repository includes the prompt and script scaffolding for Gemma-local use,
but the actual local Gemma runtime still depends on the current LiteRT-LM installation path and
model packaging available for your machine.

### What You Need for the True Local Gemma Path

1. A working LiteRT-LM runtime
2. A compatible Gemma local model package
3. An image-capable invocation path that supports label analysis
4. A local notes/list persistence bridge or the existing JSON fallback

### Files Added for the Gemma-Local Direction

- `gemma_local_prompt.md`
- `run_gemma_local.sh`

These files are designed to keep the repository aligned with the offline Gemma goal even though
the TypeScript ADK app remains the most directly runnable local path right now.
