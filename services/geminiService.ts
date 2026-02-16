
import { GoogleGenAI } from "@google/genai";

/**
 * Service to handle AI-related tasks.
 * Updated to prevent runtime crashes if API_KEY is missing.
 */

const getApiKey = () => {
  try {
    // Check both standard and Vite-style env variables
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

export const getAISummary = async (question: string) => {
  const apiKey = getApiKey();

  // If no key is found, return a helpful mock response instead of crashing
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Returning mock summary.");
    // Simulate a slight delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    return "This is a demo AI insight. To enable real AI summaries, please configure your API_KEY in the environment settings. This question seems to be about complex technical concepts that would benefit from collaborative study!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful study assistant for university students. 
      Briefly summarize the key points or provide a helpful hint for this question: "${question}". 
      Keep it academic and concise.`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "The AI assistant is having trouble reaching the brain-center. Please try again or ask a fellow student!";
  }
};
