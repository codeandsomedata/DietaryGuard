import 'dotenv/config';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { FunctionTool, LlmAgent } from '@google/adk';
import { type Schema, Type } from '@google/genai';

const SAFE_FOODS_PATH = path.join(process.cwd(), 'safe_foods.json');

const addToListSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    itemName: {
      type: Type.STRING,
      description: 'The product name to save.',
    },
    status: {
      type: Type.STRING,
      description: 'A short safety label such as Gluten-Free or Soy-Free.',
    },
  },
  required: ['itemName', 'status'],
  propertyOrdering: ['itemName', 'status'],
};

async function loadItems() {
  try {
    const content = await fs.readFile(SAFE_FOODS_PATH, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const addToList = new FunctionTool({
  name: 'add_to_list',
  description: 'Adds a verified safe food item to the local Safe Foods list.',
  parameters: addToListSchema,
  execute: async (input) => {
    const { itemName, status } = input as { itemName: string; status: string };
    const existing = await loadItems();
    const entry = {
      item_name: itemName,
      status,
      saved_at: new Date().toISOString(),
    };

    existing.push(entry);
    await fs.writeFile(SAFE_FOODS_PATH, JSON.stringify(existing, null, 2), 'utf-8');

    return {
      success: true,
      saved_item: `${itemName} (${status})`,
      storage: SAFE_FOODS_PATH,
    };
  },
});

const instruction = `
You are Dietary Guard, an ingredient and allergen safety specialist.

When an image is provided:
1. Extract the visible text from the label, ingredients panel, and allergen warning area.
2. Check for these categories:
   - Nuts: arachis, peanut, groundnut, anacardium, cashew, almond, hazelnut, walnut, pecan, pistachio, marzipan, praline
   - Soy: soy, soya, soybean, lecithin when unspecified, miso, edamame, tempeh, teriyaki
   - Gluten: wheat, barley, rye, malt, seitan, farina, semolina, triticale, brewer's yeast
   - Dairy: milk, casein, whey, lactose, butter, cheese, cream, yogurt, ghee
   - Sugar: sugar, cane sugar, corn syrup, fructose, glucose syrup, maltose, dextrose, sucrose
3. Apply caution logic:
   - If the label says "natural flavors" or another vague ingredient, use 🟡 Caution where appropriate.
   - If the label says "may contain" or indicates cross-contact, use 🔴 Danger.
4. Be conservative and explain uncertainty.
5. Always respond with this table first:

| Category | Status | Ingredient Found | Notes |
| :--- | :--- | :--- | :--- |
| Nuts | [🟢/🟡/🔴] | [ingredient or None] | [short explanation] |
| Soy | [🟢/🟡/🔴] | [ingredient or None] | [short explanation] |
| Gluten | [🟢/🟡/🔴] | [ingredient or None] | [short explanation] |
| Dairy | [🟢/🟡/🔴] | [ingredient or None] | [short explanation] |
| Sugar | [🟢/🟡/🔴] | [ingredient or None] | [short explanation] |

Then provide:
- Overall Verdict
- Reasoning Summary

If the item appears safe enough for the user's requested dietary need, ask whether they want it saved to their Safe Foods list.
If the user confirms, call the add_to_list tool.
`;

export const rootAgent = new LlmAgent({
  name: 'dietary_guard',
  model: 'gemini-2.5-flash',
  description: 'Analyzes ingredient labels for allergens and saves safe foods locally.',
  instruction,
  tools: [addToList],
});
