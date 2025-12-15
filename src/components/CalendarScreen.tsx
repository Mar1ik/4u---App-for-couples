import { useState } from 'react';
import { ArrowLeft, Plus, Calendar as CalendarIcon, Heart, Cake, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

type Screen = 'main' | 'chat' | 'wishlist' | 'calendar' | 'profile';

interface CalendarScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface ImportantDate {
  id: string;
  title: string;
  date: Date;
  type: 'anniversary' | 'birthday' | 'meeting' | 'other';
  reminder: boolean;
}

export function CalendarScreen({ onNavigate }: CalendarScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dates, setDates] = useState<ImportantDate[]>([
    {
      id: '1',
      title: 'Наша годовщина',
      date: new Date(2024, 1, 14),
      type: 'anniversary',
      reminder: true,
    },
    {
      id: '2',
      title: 'День рождения партнера',
      date: new Date(2024, 5, 20),
      type: 'birthday',
      reminder: true,
    },
    {
      id: '3',
      title: 'Романтический ужин',
      date: new Date(2024, 10, 30),
      type: 'meeting',
      reminder: true,
    },
  ]);

  const [newDate, setNewDate] = useState({
    title: '',
    date: new Date(),
    type: 'other' as 'anniversary' | 'birthday' | 'meeting' | 'other',
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddDate = () => {
    if (newDate.title.trim()) {
      const date: ImportantDate = {
        id: Date.now().toString(),
        ...newDate,
        reminder: true,
      };
      setDates([...dates, date]);
      setNewDate({ title: '', date: new Date(), type: 'other' });
      setDialogOpen(false);
      toast.success('Дата добавлена! 📅');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'anniversary':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'birthday':
        return <Cake className="w-4 h-4 text-purple-500" />;
      case 'meeting':
        return <CalendarIcon className="w-4 h-4 text-blue-500" />;
      default:
        return <Gift className="w-4 h-4 text-green-500" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'anniversary':
        return 'Годовщина';
      case 'birthday':
        return 'День рождения';
      case 'meeting':
        return 'Встреча';
      default:
        return 'Другое';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Прошло';
    if (diff === 0) return 'Сегодня!';
    if (diff === 1) return 'Завтра';
    return `Через ${diff} дн.`;
  };

  const sortedDates = [...dates].sort((a, b) => a.date.getTime() - b.date.getTime());

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
          <h1 className="flex-1 text-purple-600">Важные даты</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <GradientButton size="icon">
                <Plus className="w-5 h-5" />
              </GradientButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить дату</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Название</Label>
                  <Input
                    id="event-title"
                    value={newDate.title}
                    onChange={(e) => setNewDate({ ...newDate, title: e.target.value })}
                    placeholder="Что за событие?"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Тип события</Label>
                  <Select
                    value={newDate.type}
                    onValueChange={(value: any) => setNewDate({ ...newDate, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anniversary">Годовщина</SelectItem>
                      <SelectItem value="birthday">День рождения</SelectItem>
                      <SelectItem value="meeting">Встреча</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Дата</Label>
                  <Calendar
                    mode="single"
                    selected={newDate.date}
                    onSelect={(date) => date && setNewDate({ ...newDate, date })}
                    className="rounded-md border bg-white"
                  />
                </div>
                <GradientButton onClick={handleAddDate}>
                  Добавить
                </GradientButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Calendar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
          />
        </div>

        {/* Upcoming Dates */}
        <div className="space-y-3">
          <h2 className="text-gray-700">Предстоящие события</h2>
          {sortedDates.map((date) => (
            <div
              key={date.id}
              className="bg-white rounded-xl p-4 shadow-sm space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {getTypeIcon(date.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-800">{date.title}</h3>
                    <p className="text-gray-500">{getTypeText(date.type)}</p>
                    <p className="text-gray-600 mt-1">{formatDate(date.date)}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-pink-600">{getDaysUntil(date.date)}</span>
                </div>
              </div>
              {date.reminder && (
                <div className="flex items-center gap-2 text-purple-600">
                  <CalendarIcon className="w-3 h-3" />
                  <span className="text-purple-600">Напоминание включено</span>
                </div>
              )}
            </div>
          ))}
          {sortedDates.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Нет важных дат</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
