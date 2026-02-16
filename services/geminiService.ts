
import { GoogleGenAI } from "@google/genai";

// Standard Vite/Vercel environments don't always shim 'process'
// This ensures we don't crash the whole app if the key is missing or process is undefined
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const getAISummary = async (question: string) => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
    return "AI Assistant is currently unavailable (API Key missing).";
  }

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
