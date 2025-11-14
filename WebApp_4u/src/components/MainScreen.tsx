import { useState } from 'react';
import { MessageCircle, Heart, Calendar, User, Coffee, Sparkles, Moon, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { PixelPet } from './PixelPet';
import { RoomBackground } from './RoomBackground';
import { toast } from 'sonner@2.0.3';

type Screen = 'main' | 'chat' | 'wishlist' | 'calendar' | 'profile';

interface MainScreenProps {
  onNavigate: (screen: Screen) => void;
  petName: string;
  petType: string;
  petColor: string;
  petSecondaryColor: string;
}

export function MainScreen({ onNavigate, petName, petType, petColor, petSecondaryColor }: MainScreenProps) {
  const [mood, setMood] = useState(85);
  const [energy, setEnergy] = useState(70);
  const [sleep, setSleep] = useState(60);
  
  // Calculate days together (from creation date)
  const startDate = new Date('2024-02-14'); // Example start date
  const today = new Date();
  const daysTogether = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const handleAction = (action: string) => {
    switch (action) {
      case 'feed':
        setEnergy(Math.min(100, energy + 15));
        toast.success('Вы покормили питомца! 💕');
        break;
      case 'support':
        setMood(Math.min(100, mood + 20));
        toast.success('Настроение улучшилось! ✨');
        break;
      case 'sleep':
        setSleep(Math.min(100, sleep + 25));
        toast.success('Питомец отдыхает 😴');
        break;
      case 'gift':
        setMood(Math.min(100, mood + 30));
        toast.success('Подарок получен! 🎁');
        break;
    }
  };

  const getMood = () => {
    if (mood > 70) return 'happy';
    if (mood > 40) return 'neutral';
    return 'sad';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-purple-600">{petName || 'Питомец'}</h1>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onNavigate('profile')}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Pet Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="relative bg-white/80 rounded-2xl p-8 text-center space-y-3 overflow-hidden">
          {/* Room Background */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <RoomBackground />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Stats above pet */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-red-600">{mood}%</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-yellow-600">{energy}%</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Moon className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-blue-600">{sleep}%</span>
              </div>
            </div>
            
            <div className="flex justify-center py-4">
              <PixelPet
                color={petColor}
                secondaryColor={petSecondaryColor}
                mood={getMood()}
                size={220}
                petType={petType as any}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-800 drop-shadow-md">
                {mood > 70 ? '😊 Счастлив' : mood > 40 ? '😐 Нормально' : '😔 Грустит'}
              </p>
            </div>
            
            {/* Days Counter */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 drop-shadow" />
              <span className="text-pink-600 drop-shadow-md">{daysTogether} {daysTogether === 1 ? 'день' : daysTogether < 5 ? 'дня' : 'дней'} вместе</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 drop-shadow" />
            </div>
          </div>
        </div>

        {/* Stats Details */}
        <div className="bg-white/80 rounded-2xl p-4 space-y-3">
          <h3 className="text-gray-700 mb-2">Детали</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-gray-700">Настроение</span>
              </div>
              <span className="text-red-600">{mood}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${mood}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-gray-700">Энергия</span>
              </div>
              <span className="text-yellow-600">{energy}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-300"
                style={{ width: `${energy}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Moon className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-gray-700">Отдых</span>
              </div>
              <span className="text-blue-600">{sleep}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${sleep}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/80 rounded-2xl p-4">
          <h3 className="text-gray-700 mb-4">Действия</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleAction('feed')}
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
            >
              <Coffee className="w-6 h-6 text-orange-500" />
              <span>Покормить</span>
            </Button>
            <Button
              onClick={() => handleAction('support')}
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
            >
              <Heart className="w-6 h-6 text-pink-500" />
              <span>Поддержать</span>
            </Button>
            <Button
              onClick={() => handleAction('sleep')}
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
            >
              <Moon className="w-6 h-6 text-purple-500" />
              <span>Уложить спать</span>
            </Button>
            <Button
              onClick={() => handleAction('gift')}
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
            >
              <Star className="w-6 h-6 text-yellow-500" />
              <span>Подарить</span>
            </Button>
          </div>
        </div>

        {/* Wishes Button */}
        <Button
          onClick={() => onNavigate('wishlist')}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          <Heart className="w-4 h-4 mr-2" />
          Вишлист желаний
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-t">
        <div className="flex items-center justify-around p-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 gap-1"
            onClick={() => onNavigate('main')}
          >
            <Heart className="w-7 h-7 text-pink-500 fill-pink-500" />
            <span className="text-pink-500">Главная</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 gap-1"
            onClick={() => onNavigate('chat')}
          >
            <MessageCircle className="w-7 h-7" />
            <span>Чат</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 gap-1"
            onClick={() => onNavigate('wishlist')}
          >
            <Star className="w-7 h-7" />
            <span>Желания</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 gap-1"
            onClick={() => onNavigate('calendar')}
          >
            <Calendar className="w-7 h-7" />
            <span>Даты</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
