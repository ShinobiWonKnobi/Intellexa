
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAISummary = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful study assistant for university students. 
      Briefly summarize the key points or provide a helpful hint for this question: "${question}". 
      Keep it academic and concise.`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Sorry, I couldn't generate a summary right now. Please try again later.";
  }
};
