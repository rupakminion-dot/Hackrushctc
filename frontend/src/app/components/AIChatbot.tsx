import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const API = "http://127.0.0.1:5000/api";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your SkilledIn AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendToBackend = async (userText: string) => {
    try {
      const res = await fetch(`${API}/ai-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userText }),
      });

      const data = await res.json();
      return data.response;
    } catch (err) {
      return "Sorry, I couldn't connect to the library server.";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;

    const userMessage: Message = {
      id: Date.now(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Add temporary loading bot message
    const loadingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        text: "Thinking...",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);

    const botReply = await sendToBackend(userText);

    // Replace "Thinking..." message
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === loadingId
          ? { ...msg, text: botReply }
          : msg
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-6 pb-24">
      <h1 className="text-3xl font-serif text-amber-900 mb-4">
        SkilledIn AI Archivist
      </h1>

      <Card className="flex-1 bg-white border-2 border-amber-200 p-4 overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user"
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "bot"
                    ? "bg-amber-600"
                    : "bg-blue-600"
                }`}
              >
                {message.sender === "bot" ? (
                  <Bot className="text-white" size={18} />
                ) : (
                  <User className="text-white" size={18} />
                )}
              </div>

              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === "bot"
                    ? "bg-amber-50 text-amber-900 border border-amber-200"
                    : "bg-blue-600 text-white"
                }`}
              >
                <p className="whitespace-pre-line text-sm">
                  {message.text}
                </p>
                <span className="text-xs opacity-70 block mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      <div className="flex gap-2">
        <Input
          placeholder="Ask about skills, providers, swaps..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border-amber-300"
        />
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="bg-amber-700 hover:bg-amber-800 text-white"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
}
