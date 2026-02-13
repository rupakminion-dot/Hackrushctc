import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your SkilledIn AI assistant. I can help you find the perfect skills to learn, recommend providers, and answer questions about skill swaps. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you navigate SkilledIn. Would you like recommendations for skills to learn, information about providers, or help with skill swaps?";
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return "Based on your profile and current learning trends, I recommend:\n\n1. **Web Development** - High demand, 15,420 learners\n2. **Data Science** - Great career prospects\n3. **UI/UX Design** - Perfect for creative minds\n\nWould you like more details about any of these?";
    }

    if (lowerMessage.includes('skill swap') || lowerMessage.includes('exchange')) {
      return "Skill swaps are a great way to learn while teaching! Here's how it works:\n\n1. Choose a skill you want to learn\n2. Offer a skill you can teach\n3. We'll match you with a compatible partner\n4. Set a duration and start learning!\n\nWould you like me to find swap opportunities for you?";
    }

    if (lowerMessage.includes('provider') || lowerMessage.includes('teacher')) {
      return "Our top providers include:\n\n• Dr. Sarah Chen - AI/ML Engineering ($125k earned)\n• Marcus Johnson - Web Development ($98.5k earned)\n• Priya Sharma - Data Science ($87.2k earned)\n\nEach provider is verified and rated by students. Would you like to see courses from a specific provider?";
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Skill courses range from $299 to $599 depending on complexity and duration. Many skills can also be acquired through skill swaps at no cost! Would you like to see affordable options or explore skill swapping?";
    }

    if (lowerMessage.includes('beginner') || lowerMessage.includes('start')) {
      return "Great to see you starting your learning journey! I recommend these beginner-friendly skills:\n\n1. Digital Marketing Strategy - $299\n2. UI/UX Design Basics - $399\n3. Python Programming Fundamentals - $349\n\nAll include step-by-step guidance and support. Which area interests you most?";
    }

    // Default response
    return "I understand you're asking about: \"" + userMessage + "\". I can help with:\n\n• Skill recommendations\n• Finding providers\n• Skill swap matching\n• Course pricing\n• Learning paths\n\nWhat specific information would you like?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response with delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickActions = [
    'Recommend skills for me',
    'Find skill swap partners',
    'Show top providers',
    'Beginner-friendly courses',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-6 pb-24">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-serif text-amber-900 mb-2">AI Assistant</h1>
        <p className="text-amber-700">Get personalized skill recommendations and guidance</p>
      </div>

      {/* Messages Area */}
      <Card className="flex-1 bg-white border-2 border-amber-200 p-4 overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'bot' ? 'bg-amber-600' : 'bg-blue-600'
                }`}
              >
                {message.sender === 'bot' ? (
                  <Bot className="text-white" size={18} />
                ) : (
                  <User className="text-white" size={18} />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'bot'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <p className="whitespace-pre-line text-sm">{message.text}</p>
                <span className={`text-xs mt-1 block ${
                  message.sender === 'bot' ? 'text-amber-500' : 'text-blue-200'
                }`}>
                  {message.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="mb-4">
        <p className="text-sm text-amber-600 mb-2">Quick Actions:</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                setInputValue(action);
                setTimeout(handleSend, 100);
              }}
              className="whitespace-nowrap border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              {action}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Ask me anything about skills, providers, or learning paths..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border-amber-300 focus:border-amber-600"
        />
        <Button
          onClick={handleSend}
          className="bg-amber-700 hover:bg-amber-800 text-white"
          disabled={!inputValue.trim()}
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
}
