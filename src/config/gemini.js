const apiKey = "AIzaSyAhVggP1_t3LictbiGprLuyJgvPwRDFbcg";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAhVggP1_t3LictbiGprLuyJgvPwRDFbcg",
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    },
  });
  console.log(response.text);
  return response.text;
}

export default main;
