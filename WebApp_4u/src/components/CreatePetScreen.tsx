import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PixelPet } from './PixelPet';

interface CreatePetScreenProps {
  onPetCreated: (name: string, petType: string, color: string, secondaryColor: string) => void;
}

const PET_TYPES = [
  { id: 'dino', name: 'Динозаврик', emoji: '🦕' },
  { id: 'star', name: 'Морская звезда', emoji: '⭐' },
  { id: 'bunny', name: 'Зайчик', emoji: '🐰' },
  { id: 'cat', name: 'Котик', emoji: '🐱' },
];

const PET_COLORS = [
  { id: 'pink', name: 'Розовый', primary: '#FF6B9D', secondary: '#FFB3D9' },
  { id: 'purple', name: 'Фиолетовый', primary: '#9D6BFF', secondary: '#D4B3FF' },
  { id: 'blue', name: 'Голубой', primary: '#6BB8FF', secondary: '#B3DDFF' },
  { id: 'green', name: 'Зеленый', primary: '#6BFF9D', secondary: '#B3FFD4' },
  { id: 'orange', name: 'Оранжевый', primary: '#FFB86B', secondary: '#FFE0B3' },
  { id: 'yellow', name: 'Желтый', primary: '#FFE66B', secondary: '#FFF5B3' },
];

export function CreatePetScreen({ onPetCreated }: CreatePetScreenProps) {
  const [petName, setPetName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedType, setSelectedType] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (petName.trim()) {
      onPetCreated(
        petName.trim(),
        PET_TYPES[selectedType].id,
        PET_COLORS[selectedColor].primary,
        PET_COLORS[selectedColor].secondary
      );
    }
  };

  const nextColor = () => {
    setSelectedColor((prev) => (prev + 1) % PET_COLORS.length);
  };

  const prevColor = () => {
    setSelectedColor((prev) => (prev - 1 + PET_COLORS.length) % PET_COLORS.length);
  };

  const nextType = () => {
    setSelectedType((prev) => (prev + 1) % PET_TYPES.length);
  };

  const prevType = () => {
    setSelectedType((prev) => (prev - 1 + PET_TYPES.length) % PET_TYPES.length);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-purple-600">Создайте своего питомца</h2>
          <p className="text-gray-600">Это ваш виртуальный аватар</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Type Selection */}
          <div className="bg-white/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-center text-gray-700">Выберите питомца</h3>
            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={prevType}
                className="shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <div className="flex-1 flex justify-center">
                <PixelPet
                  color={PET_COLORS[selectedColor].primary}
                  secondaryColor={PET_COLORS[selectedColor].secondary}
                  mood="happy"
                  size={120}
                  petType={PET_TYPES[selectedType].id as any}
                />
              </div>
              
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={nextType}
                className="shrink-0"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
            
            <p className="text-center text-gray-600">
              {PET_TYPES[selectedType].emoji} {PET_TYPES[selectedType].name}
            </p>
          </div>

          {/* Color Selection */}
          <div className="bg-white/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-center text-gray-700">Выберите цвет</h3>
            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={prevColor}
                className="shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <div 
                className="w-16 h-16 rounded-full shadow-lg"
                style={{ backgroundColor: PET_COLORS[selectedColor].primary }}
              />
              
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={nextColor}
                className="shrink-0"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
            
            <p className="text-center text-gray-600">
              {PET_COLORS[selectedColor].name}
            </p>
          </div>

          {/* Pet Name */}
          <div className="space-y-2">
            <Label htmlFor="pet-name">Имя питомца</Label>
            <Input
              id="pet-name"
              type="text"
              placeholder="Как зовут вашего питомца?"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="bg-white/80"
            />
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label>Пол питомца</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  gender === 'female'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 bg-white/50'
                }`}
              >
                <span className="text-pink-500">♀ Девочка</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  gender === 'male'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white/50'
                }`}
              >
                <span className="text-blue-500">♂ Мальчик</span>
              </button>
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            disabled={!petName.trim()}
          >
            Создать питомца
          </Button>
        </form>
      </div>
    </div>
  );
}
