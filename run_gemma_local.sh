#!/bin/zsh

set -euo pipefail

if [ $# -lt 2 ]; then
  echo "Usage: ./run_gemma_local.sh <MODEL_PATH> <IMAGE_PATH>"
  exit 1
fi

MODEL_PATH="$1"
IMAGE_PATH="$2"
PROMPT_FILE="$(cd "$(dirname "$0")" && pwd)/gemma_local_prompt.md"

echo "Preparing Gemma local run..."
echo "Model: $MODEL_PATH"
echo "Image: $IMAGE_PATH"
echo
echo "This script is a scaffold for the offline Gemma 4 path."
echo "Adjust the final litert-lm invocation to match the runtime you install."
echo
echo "Suggested prompt file:"
echo "  $PROMPT_FILE"
echo
echo "Example target shape once LiteRT-LM is fully installed:"
echo '  litert-lm chat --model "$MODEL_PATH" --image "$IMAGE_PATH" --prompt-file "$PROMPT_FILE"'
