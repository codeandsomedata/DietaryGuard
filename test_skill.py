import litert_lm
from main import add_to_list

# 1. Load your Skill Logic
with open("SKILL.md", "r") as f:
    skill_instructions = f.read()

# 2. Initialize the Engine (Using your local path)
model_path = "/Users/somdattabanerjee/.litert-lm/models/gemma-4-E4B-it/model.litertlm"

with litert_lm.Engine(model_path) as engine:
    # 3. Create a conversation with your Tools (main.py) and Instructions (SKILL.md)
    with engine.create_conversation(
        tools=[add_to_list],
        system_instruction=skill_instructions
    ) as session:

        # 4. Run the test
        test_ingredients = "Ingredients: Whole grain oats, sugar, honey, malt extract."
        print(f"Testing ingredients: {test_ingredients}\n")

        # This will trigger the 'Thinking' process automatically in Gemma 4
        response = session.send_message(test_ingredients)

        print("--- MODEL RESPONSE ---")
        print(response["content"][0]["text"])
