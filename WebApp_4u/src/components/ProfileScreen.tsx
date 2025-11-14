import { useState } from 'react';
import { ArrowLeft, User, Settings, Heart, Zap, Moon, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { PixelPet } from './PixelPet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

type Screen = 'main' | 'chat' | 'wishlist' | 'calendar' | 'profile';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  petName: string;
  petType: string;
  petColor: string;
  petSecondaryColor: string;
}

export function ProfileScreen({ onNavigate, petName, petType, petColor, petSecondaryColor }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);

  const stats = [
    { label: 'Настроение', value: 85, icon: Heart, color: 'text-pink-500' },
    { label: 'Энергия', value: 70, icon: Zap, color: 'text-yellow-500' },
    { label: 'Отдых', value: 60, icon: Moon, color: 'text-purple-500' },
  ];

  const weeklyData = [
    { day: 'Пн', mood: 75, energy: 80 },
    { day: 'Вт', mood: 82, energy: 70 },
    { day: 'Ср', mood: 88, energy: 65 },
    { day: 'Чт', mood: 79, energy: 75 },
    { day: 'Пт', mood: 90, energy: 85 },
    { day: 'Сб', mood: 85, energy: 70 },
    { day: 'Вс', mood: 85, energy: 70 },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onNavigate('main')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="flex-1 text-purple-600">Профиль</h1>
          <Button size="icon" variant="ghost">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="stats">Статистика</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="p-4 space-y-6">
            {/* User Info */}
            <div className="bg-white rounded-2xl p-6 text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-gray-800">Ваш профиль</h2>
                <p className="text-gray-500">Подключен с партнером</p>
              </div>
            </div>

            {/* Pet Section */}
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <h3 className="text-gray-700">Ваш питомец</h3>
              <div className="flex items-center gap-4">
                <PixelPet
                  color={petColor}
                  secondaryColor={petSecondaryColor}
                  mood="happy"
                  size={80}
                  petType={petType as any}
                />
                <div className="flex-1">
                  <h3 className="text-gray-800">{petName}</h3>
                  <p className="text-gray-500">Уровень 5</p>
                  <Progress value={65} className="h-2 mt-2" />
                </div>
              </div>
            </div>

            {/* Current Stats */}
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <h3 className="text-gray-700">Текущее состояние</h3>
              <div className="space-y-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-gray-700">{stat.label}</span>
                      </div>
                      <span className="text-gray-600">{stat.value}%</span>
                    </div>
                    <Progress value={stat.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <h3 className="text-gray-700">Настройки</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Уведомления</Label>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-reminders">Ежедневные напоминания</Label>
                  <Switch
                    id="daily-reminders"
                    checked={dailyReminders}
                    onCheckedChange={setDailyReminders}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="p-4 space-y-6">
            {/* Weekly Overview */}
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <h3 className="text-gray-700">Неделя</h3>
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-1">
                      <div
                        className="w-full bg-pink-400 rounded-t"
                        style={{ height: `${day.mood}%` }}
                      />
                    </div>
                    <span className="text-gray-600">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-400 rounded" />
                  <span className="text-gray-600">Настроение</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <h3 className="text-gray-700">Достижения</h3>
              <div className="grid grid-cols-3 gap-3">
                {['🎯', '💝', '🔥', '⭐', '💪', '🎉'].map((emoji, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 text-white text-center space-y-2">
              <h2 className="text-white">7 дней</h2>
              <p className="text-pink-100">Активная серия</p>
              <p className="text-white">Продолжайте в том же духе! 🔥</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
