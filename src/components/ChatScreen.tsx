import { useState } from 'react';
import { ArrowLeft, Send, Heart, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Input } from './ui/input';

type Screen = 'main' | 'chat' | 'wishlist' | 'calendar' | 'profile';

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'partner';
  timestamp: Date;
  sticker?: string;
}

const ROMANTIC_STICKERS = ['💕', '❤️', '💖', '🥰', '😘', '💝', '💗', '💓'];
const QUICK_MESSAGES = [
  'Ты молодец ❤️',
  'Скучаю 💕',
  'Люблю тебя 💖',
  'Как дела? 🥰',
];

export function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Как твой день?',
      sender: 'partner',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'Отлично! Скучаю 💕',
      sender: 'me',
      timestamp: new Date(Date.now() - 3000000),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [showStickers, setShowStickers] = useState(false);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'me',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleQuickMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleSticker = (sticker: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: '',
      sticker,
      sender: 'me',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setShowStickers(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onNavigate('main')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-white">Мой партнер</h2>
            <p className="text-pink-100">онлайн</p>
          </div>
          <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Messages */}
      <div className="bg-purple-50 p-3">
        <div className="flex gap-2 overflow-x-auto">
          {QUICK_MESSAGES.map((msg, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              onClick={() => handleQuickMessage(msg)}
              className="shrink-0 bg-white"
            >
              {msg}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                msg.sender === 'me'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.sticker ? (
                <span className="text-4xl">{msg.sticker}</span>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stickers Panel */}
      {showStickers && (
        <div className="bg-white border-t p-4">
          <div className="grid grid-cols-4 gap-3">
            {ROMANTIC_STICKERS.map((sticker, index) => (
              <button
                key={index}
                onClick={() => handleSticker(sticker)}
                className="text-4xl hover:scale-110 transition-transform"
              >
                {sticker}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setShowStickers(!showStickers)}
          >
            <Smile className="w-5 h-5" />
          </Button>
          <Input
            type="text"
            placeholder="Введите сообщение..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <GradientButton
            size="icon"
            onClick={handleSend}
          >
            <Send className="w-5 h-5" />
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
