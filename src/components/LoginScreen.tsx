import { useState } from 'react';
import { Heart } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg">
              <Heart className="w-12 h-12 text-white fill-white" />
            </div>
          </div>
          <div>
            <h1 className="text-pink-600">4U</h1>
            <p className="text-purple-600">Приложение для пар</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                type="text"
                placeholder="Введите ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/80"
              />
            </div>
            
            {isRegister && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/80"
                  />
                </div>
              </>
            )}
          </div>

          <GradientButton type="submit">
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </GradientButton>
        </form>

        {/* Toggle */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-purple-600 hover:text-purple-700 transition-colors duration-200 hover:underline"
          >
            {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </button>
        </div>
      </div>
    </div>
  );
}
