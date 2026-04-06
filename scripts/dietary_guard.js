(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.DietaryGuard = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const CATEGORY_RULES = [
    {
      category: "Soy",
      status: "DANGER",
      notes: "Contains a soy ingredient or soy derivative.",
      terms: [
        { label: "Lecithin", pattern: /\bsoy lecithin\b|\blecithin\b/i },
        { label: "Edamame", pattern: /\bedamame\b/i },
        { label: "Tofu", pattern: /\btofu\b/i },
        { label: "Miso", pattern: /\bmiso\b/i },
      ],
    },
    {
      category: "Nuts",
      status: "DANGER",
      notes: "Contains a nut ingredient or nut derivative.",
      terms: [
        { label: "Arachis (Peanut)", pattern: /\barachis\b|\bpeanut\b/i },
        { label: "Cashew", pattern: /\bcashew\b/i },
        { label: "Almond", pattern: /\balmond\b/i },
        { label: "Marzipan", pattern: /\bmarzipan\b/i },
      ],
    },
    {
      category: "Gluten",
      status: "DANGER",
      notes: "Contains a gluten-bearing grain or derivative.",
      terms: [
        { label: "Malt", pattern: /\bmalt(?:\s+extract)?\b/i },
        { label: "Barley", pattern: /\bbarley\b/i },
        { label: "Rye", pattern: /\brye\b/i },
        { label: "Seitan", pattern: /\bseitan\b/i },
        { label: "Spelt", pattern: /\bspelt\b/i },
      ],
    },
    {
      category: "Added Sugar",
      status: "DANGER",
      notes: "Contains an added sugar ingredient.",
      terms: [
        { label: "Sugar", pattern: /\bsugar\b/i },
        { label: "Honey", pattern: /\bhoney\b/i },
        { label: "Agave", pattern: /\bagave\b/i },
        {
          label: "High Fructose Corn Syrup",
          pattern: /\bhigh[\s-]*fructose\s+corn\s+syrup\b/i,
        },
        { label: "Molasses", pattern: /\bmolasses\b/i },
      ],
    },
  ];

  const CAUTION_TERMS = [
    { label: "Natural Flavors", pattern: /\bnatural flavors?\b/i, notes: "Ingredient is ambiguous." },
    { label: "Natural Flavor", pattern: /\bnatural flavor\b/i, notes: "Ingredient is ambiguous." },
  ];

  function normalizeIngredientText(text) {
    return String(text || "")
      .replace(/^ingredients?\s*:\s*/i, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function splitIngredients(text) {
    const normalized = normalizeIngredientText(text);
    if (!normalized) return [];
    return normalized
      .split(/,(?![^()]*\))/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function hasMayContain(text) {
    return /\bmay contain\b/i.test(text);
  }

  function collectMatches(ingredients, sourceText) {
    const rows = [];
    const dedupe = new Set();

    if (hasMayContain(sourceText)) {
      rows.push({
        category: "Cross-contact",
        trigger: "May contain",
        status: "DANGER",
        notes: "The label indicates potential allergen cross-contact.",
      });
    }

    for (const ingredient of ingredients) {
      for (const rule of CATEGORY_RULES) {
        for (const term of rule.terms) {
          if (term.pattern.test(ingredient)) {
            const key = `${rule.category}::${term.label}::${ingredient}`;
            if (!dedupe.has(key)) {
              dedupe.add(key);
              rows.push({
                category: rule.category,
                trigger: `${term.label} in "${ingredient}"`,
                status: rule.status,
                notes: rule.notes,
              });
            }
          }
        }
      }

      for (const term of CAUTION_TERMS) {
        if (term.pattern.test(ingredient)) {
          const key = `CAUTION::${term.label}::${ingredient}`;
          if (!dedupe.has(key)) {
            dedupe.add(key);
            rows.push({
              category: "Ambiguous",
              trigger: `${term.label} in "${ingredient}"`,
              status: "CAUTION",
              notes: term.notes,
            });
          }
        }
      }
    }

    return rows;
  }

  function summarizeStatus(rows) {
    if (rows.some((row) => row.status === "DANGER")) return "DANGER";
    if (rows.some((row) => row.status === "CAUTION")) return "CAUTION";
    return "SAFE";
  }

  function statusEmoji(status) {
    if (status === "DANGER") return "🔴";
    if (status === "CAUTION") return "🟡";
    return "🟢";
  }

  function finalMessage(status) {
    if (status === "SAFE") {
      return "This item is safe for your profile based on the provided ingredient list.";
    }
    if (status === "CAUTION") {
      return "This item has ambiguous ingredients and should be reviewed carefully.";
    }
    return "This item contains flagged ingredients or cross-contact warnings.";
  }

  function buildMarkdownResult(productName, ingredientsText, rows) {
    const status = summarizeStatus(rows);
    const title = productName && productName.trim() ? productName.trim() : "Unknown Product";
    const header = `## Dietary Guard Result: ${title}\n\n**Overall Status:** ${statusEmoji(status)} ${status}\n\n`;
    const ingredientBlock = `**Ingredients Reviewed:** ${normalizeIngredientText(ingredientsText) || "None provided"}\n\n`;

    const tableHeader =
      "| Category | Trigger | Status | Notes |\n| :--- | :--- | :--- | :--- |\n";

    const tableRows =
      rows.length > 0
        ? rows
            .map(
              (row) =>
                `| ${row.category} | ${row.trigger} | ${statusEmoji(row.status)} ${row.status} | ${row.notes} |`
            )
            .join("\n")
        : '| None found | None | 🟢 SAFE | No soy, nuts, gluten, added sugar, or ambiguity triggers were detected. |';

    const summary = `\n\n**Summary:** ${finalMessage(status)}`;
    return `${header}${ingredientBlock}${tableHeader}${tableRows}${summary}`;
  }

  function analyze(payload) {
    const productName = String(payload.product_name || "");
    const ingredientsText = String(payload.ingredients_text || "");
    const normalizedText = normalizeIngredientText(ingredientsText);

    if (!normalizedText) {
      return {
        error: "No ingredient text was provided. Please pass `ingredients_text` with the extracted ingredient list.",
      };
    }

    const ingredients = splitIngredients(normalizedText);
    const rows = collectMatches(ingredients, normalizedText);
    return {
      result: buildMarkdownResult(productName, normalizedText, rows),
    };
  }

  return { analyze };
});
