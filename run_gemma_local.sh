#!/bin/zsh

set -euo pipefail

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
  echo "Usage: ./run_gemma_local.sh <MODEL_REFERENCE> [PROMPT_FILE]"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
MODEL_REFERENCE="$1"
PROMPT_FILE="${2:-$ROOT_DIR/gemma_local_prompt.md}"
VENV_PYTHON="$ROOT_DIR/.venv/bin/python"
VENV_LITERT="$ROOT_DIR/.venv/bin/litert-lm"

if [ ! -x "$VENV_PYTHON" ] || [ ! -x "$VENV_LITERT" ]; then
  echo "Missing local LiteRT-LM environment."
  echo
  echo "Set it up with:"
  echo '  python3.14 -m venv .venv'
  echo '  source .venv/bin/activate'
  echo '  python -m pip install --upgrade pip'
  echo '  pip install litert-lm'
  exit 1
fi

if [ ! -f "$PROMPT_FILE" ]; then
  echo "Prompt file not found: $PROMPT_FILE"
  exit 1
fi

PROMPT_TEXT="$("$VENV_PYTHON" -c 'from pathlib import Path; import sys; print(Path(sys.argv[1]).read_text())' "$PROMPT_FILE")"

echo "Running Dietary Guard with LiteRT-LM..."
echo "Model reference: $MODEL_REFERENCE"
echo "Prompt file: $PROMPT_FILE"
echo

"$VENV_LITERT" run "$MODEL_REFERENCE" --prompt "$PROMPT_TEXT"
