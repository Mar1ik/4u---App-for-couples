import { useState } from 'react';
import { MessageCircle, Heart, Calendar, User, Coffee, Sparkles, Moon, Star } from 'lucide-react';
import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Progress } from './ui/progress';
import { Pet } from './PetTypes';
import { toast } from 'sonner@2.0.3';
import type { PetInfo } from '../App';

type Screen = 'main' | 'chat' | 'wishlist' | 'calendar' | 'profile';

interface MainScreenProps {
  onNavigate: (screen: Screen) => void;
  petInfo: PetInfo | null;
}

interface ActionLimits {
  feed: number;
  support: number;
  sleep: number;
  gift: number;
}

const getTodayKey = () => {
  return new Date().toDateString();
};

const getStoredLimits = (): ActionLimits => {
  const stored = localStorage.getItem('actionLimits');
  const todayKey = getTodayKey();
  
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === todayKey) {
      return data.limits;
    }
  }
  
  return { feed: 0, support: 0, sleep: 0, gift: 0 };
};

const saveLimits = (limits: ActionLimits) => {
  localStorage.setItem('actionLimits', JSON.stringify({
    date: getTodayKey(),
    limits
  }));
};

const ACTION_LIMITS = {
  feed: 5,
  support: 3,
  sleep: 2,
  gift: 1,
};

export function MainScreen({ onNavigate, petInfo }: MainScreenProps) {
  const [mood, setMood] = useState(85);
  const [energy, setEnergy] = useState(70);
  const [sleep, setSleep] = useState(60);
  const [actionCounts, setActionCounts] = useState<ActionLimits>(getStoredLimits());

  const handleAction = (action: string) => {
    const currentCount = actionCounts[action as keyof ActionLimits];
    const limit = ACTION_LIMITS[action as keyof typeof ACTION_LIMITS];

    if (currentCount >= limit) {
      toast.error(`Достигнут лимит на сегодня! (${limit} раз)`);
      return;
    }

    const newCounts = { ...actionCounts, [action]: currentCount + 1 };
    setActionCounts(newCounts);
    saveLimits(newCounts);

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

  const getActionDisabled = (action: string) => {
    const currentCount = actionCounts[action as keyof ActionLimits];
    const limit = ACTION_LIMITS[action as keyof typeof ACTION_LIMITS];
    return currentCount >= limit;
  };

  const getActionText = (action: string) => {
    const currentCount = actionCounts[action as keyof ActionLimits];
    const limit = ACTION_LIMITS[action as keyof typeof ACTION_LIMITS];
    const remaining = limit - currentCount;
    return remaining > 0 ? `${remaining}/${limit}` : 'Лимит';
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
          <h1 className="text-purple-600">{petInfo?.name || 'Питомец'}</h1>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onNavigate('chat')}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onNavigate('profile')}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Pet Display */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white/80 rounded-2xl p-6 text-center space-y-4">
          <div className="flex justify-center">
            {petInfo ? (
              <Pet
                type={petInfo.type}
                color={petInfo.color}
                secondaryColor={petInfo.secondaryColor}
                mood={getMood()}
                size={160}
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center text-6xl">🐾</div>
            )}
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              {mood > 70 ? '😊 Счастлив' : mood > 40 ? '😐 Нормально' : '😔 Грустит'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="bg-white/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="text-gray-700">Настроение</span>
              </div>
              <span className="text-gray-600">{mood}%</span>
            </div>
            <Progress value={mood} className="h-2" />
          </div>

          <div className="bg-white/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-700">Энергия</span>
              </div>
              <span className="text-gray-600">{energy}%</span>
            </div>
            <Progress value={energy} className="h-2" />
          </div>

          <div className="bg-white/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">Отдых</span>
              </div>
              <span className="text-gray-600">{sleep}%</span>
            </div>
            <Progress value={sleep} className="h-2" />
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/80 rounded-2xl p-4">
          <h3 className="text-gray-700 mb-4">Действия</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleAction('feed')}
              variant="outline"
              disabled={getActionDisabled('feed')}
              className="h-auto p-4 flex-col gap-2"
            >
              <Coffee className="w-6 h-6 text-orange-500" />
              <span>Покормить</span>
              <span className="text-xs text-gray-500">{getActionText('feed')}</span>
            </Button>
            <Button
              onClick={() => handleAction('support')}
              variant="outline"
              disabled={getActionDisabled('support')}
              className="h-auto p-4 flex-col gap-2"
            >
              <Heart className="w-6 h-6 text-pink-500" />
              <span>Поддержать</span>
              <span className="text-xs text-gray-500">{getActionText('support')}</span>
            </Button>
            <Button
              onClick={() => handleAction('sleep')}
              variant="outline"
              disabled={getActionDisabled('sleep')}
              className="h-auto p-4 flex-col gap-2"
            >
              <Moon className="w-6 h-6 text-purple-500" />
              <span>Уложить спать</span>
              <span className="text-xs text-gray-500">{getActionText('sleep')}</span>
            </Button>
            <Button
              onClick={() => handleAction('gift')}
              variant="outline"
              disabled={getActionDisabled('gift')}
              className="h-auto p-4 flex-col gap-2"
            >
              <Star className="w-6 h-6 text-yellow-500" />
              <span>Подарить</span>
              <span className="text-xs text-gray-500">{getActionText('gift')}</span>
            </Button>
          </div>
        </div>

        {/* Wishes Button */}
        <GradientButton onClick={() => onNavigate('wishlist')}>
          <Heart className="w-4 h-4 mr-2" />
          Вишлист желаний
        </GradientButton>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-t">
        <div className="flex items-center justify-around p-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2"
            onClick={() => onNavigate('main')}
          >
            <Heart className="w-5 h-5 text-pink-500 mb-1" />
            <span className="text-pink-500">Главная</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2"
            onClick={() => onNavigate('chat')}
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span>Чат</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2"
            onClick={() => onNavigate('wishlist')}
          >
            <Star className="w-5 h-5 mb-1" />
            <span>Желания</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2"
            onClick={() => onNavigate('calendar')}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span>Даты</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
