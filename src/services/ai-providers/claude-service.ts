
import { AIProviderService } from '@/components/chatbot/types';

export function createClaudeService(apiKey: string): AIProviderService {
  return {
    async generateResponse(prompt: string, systemPrompt: string, conversationHistory: {role: string, content: string}[] = []): Promise<string> {
      try {
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        };

        // Map our conversation history format to Claude's format
        const formattedMessages = conversationHistory.map(msg => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content
        }));

        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers,
          body: JSON.stringify({
            model: "claude-3-sonnet-20240229",
            system: systemPrompt,
            messages: [
              ...formattedMessages,
              { role: "user", content: prompt }
            ],
            max_tokens: 800,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Claude API error:", errorData);
          throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.content[0].text;
      } catch (error) {
        console.error("Error calling Claude API:", error);
        throw error;
      }
    }
  };
}
