
import { AIProviderService } from '@/components/chatbot/types';

export function createGeminiService(apiKey: string): AIProviderService {
  return {
    async generateResponse(prompt: string, systemPrompt: string, conversationHistory: {role: string, content: string}[] = []): Promise<string> {
      try {
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        };

        // Format messages for Gemini API
        const formattedMessages = [
          { role: "system", parts: [{ text: systemPrompt }] },
          ...conversationHistory.map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
          })),
          { role: "user", parts: [{ text: prompt }] }
        ];

        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
          method: "POST",
          headers,
          body: JSON.stringify({
            contents: formattedMessages,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
              topP: 0.95,
              topK: 40
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Gemini API error:", errorData);
          throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
      } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
      }
    }
  };
}
