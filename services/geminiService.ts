
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Ingredient, MealPlan, VisionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MEAL_PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    meals: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.NUMBER },
          slot: { type: Type.STRING },
          recipeName: { type: Type.STRING },
          executionNote: { type: Type.STRING, description: "A 1-sentence cooking tip." },
          usedIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          substitutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                replacedWith: { type: Type.STRING }
              }
            }
          },
          confidence: { type: Type.NUMBER }
        },
        required: ["day", "slot", "recipeName", "usedIngredients"]
      }
    },
    wasteAvoidedKg: { type: Type.NUMBER },
    monetarySaving: { type: Type.NUMBER },
    carbonSavedKg: { type: Type.NUMBER },
    zeroPointScore: { type: Type.NUMBER },
    requiredShopping: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          necessity: { type: Type.STRING },
          reason: { type: Type.STRING }
        }
      }
    }
  },
  required: ["meals", "zeroPointScore", "requiredShopping"]
};

const VISION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    suggestedQuantity: { type: Type.STRING },
    estimatedExpiryDays: { type: Type.NUMBER },
    confidence: { type: Type.NUMBER },
    category: { type: Type.STRING, enum: ["Produce", "Protein", "Dairy", "Pantry", "Grains", "Other"] }
  },
  required: ["name", "suggestedQuantity", "estimatedExpiryDays", "confidence", "category"]
};

export async function identifyIngredientFromImage(base64Image: string): Promise<VisionResult | null> {
  const prompt = "Analyze this food image. Identify the item, quantity, category, and estimated shelf life. Return JSON.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: VISION_SCHEMA
      }
    });

    if (!response.text) return null;
    return JSON.parse(response.text.trim()) as VisionResult;
  } catch (error) {
    console.error("Vision Error:", error);
    return null;
  }
}

export async function generateZeroPointPlan(
  ingredients: Ingredient[],
  preferences: string
): Promise<MealPlan | null> {
  const lockedItems = ingredients.filter(i => i.isLocked).map(i => i.name).join(", ");
  const availableItems = ingredients.map(i => `${i.name} (${i.quantity}, expires ${i.expiryDate})`).join(", ");

  const prompt = `
    ROLE: ZERO-POINT PREMIUM CULINARY OPTIMIZER.
    MANDATORY USE: [${lockedItems}].
    ADDITIONAL STOCK: [${availableItems}].
    DIETARY: ${preferences}.
    GOAL: ZERO WASTE. Create sophisticated, simple recipes. 
    Constraint: prioritize using items expiring soonest.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: MEAL_PLAN_SCHEMA,
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });

    if (!response.text) return null;
    return JSON.parse(response.text.trim()) as MealPlan;
  } catch (error) {
    console.error("Generation Error:", error);
    return null;
  }
}
