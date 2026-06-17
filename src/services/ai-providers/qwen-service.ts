
import { AIProviderService } from '@/components/chatbot/types';

export function createQwenService(apiKey: string): AIProviderService {
  return {
    async generateResponse(prompt: string, systemPrompt: string, conversationHistory: {role: string, content: string}[] = []): Promise<string> {
      try {
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        };

        const messages = [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
          { role: "user", content: prompt }
        ];

        // Using the Alibaba Cloud API for Qwen
        const response = await fetch("https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation", {
          method: "POST",
          headers,
          body: JSON.stringify({
            model: "qwen-max",
            input: {
              messages
            },
            parameters: {
              temperature: 0.5, // Reduced for more consistent answers
              top_p: 0.9,
              max_tokens: 1000, // Increased for more detailed responses
              result_format: "message"
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Qwen API error:", errorData);
          throw new Error(`Qwen API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.output.choices[0].message.content;
      } catch (error) {
        console.error("Error calling Qwen API:", error);
        throw error;
      }
    }
  };
}
