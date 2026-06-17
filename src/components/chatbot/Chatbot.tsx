// src/components/chatbot/Chatbot.tsx

import React, { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { SendHorizontal } from "lucide-react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  id?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! I'm your Mystic India Guide. 🌟\n• Ask me about Indian culture\n• Discover destinations\n• Know about festivals\n• Plan your journey!",
      timestamp: new Date(),
      id: "welcome",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const generateGeminiResponse = async (
    prompt: string,
    chatHistory: Message[]
  ): Promise<string> => {
    if (!API_KEY) throw new Error("API Key missing!");

    const contents = [
      {
        role: "user",
        parts: [
          { text: "You are a helpful travel guide for India. Always answer in short bullet points, with each bullet on a new line." },
        ],
      },
      ...chatHistory.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      { role: "user", parts: [{ text: prompt }] },
    ];

    const resp = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 600 },
      }),
    });

    if (!resp.ok) throw new Error(`API error: ${resp.status}`);
    const data = await resp.json();
    const txt = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!txt) throw new Error("Unexpected Gemini API response.");

    return formatResponseAsBullets(txt);
  };

  const formatResponseAsBullets = (text: string): string => {
    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
    return lines.map((line) => `• ${line.replace(/^[-•]/, "").trim()}`).join("\n");
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!API_KEY) {
      setError("Missing API Key!");
      return;
    }
    if (!trimmed || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const botText = await generateGeminiResponse(trimmed, messages.slice(-10));
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: botText, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading && input.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Robot Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110"
          aria-label="Open Mystic India Chatbot"
        >
          <FaRobot size={24} />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-5 z-50 w-[360px] h-[60vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md bg-white/20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGluZGlhbnxlbnwwfHx8fDE2OTI3NTY5NzE&ixlib=rb-4.0.3&q=80&w=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode : "soft-light",
          }}
        >
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
            <h2 className="text-lg font-semibold">Mystic India Guide</h2>
            <button onClick={toggleChat} className="hover:text-gray-300">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`whitespace-pre-line px-4 py-2 rounded-xl max-w-[80%] text-sm ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white self-end ml-auto"
                    : "bg-gray-900/70 text-white self-start mr-auto"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="px-4 py-2 rounded-xl bg-gray-900/70 text-white w-fit animate-pulse">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 p-4 border-t border-gray-600 bg-black/40">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me about India..."
              className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none"
              disabled={loading || !API_KEY}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700"
            >
              <SendHorizontal className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
