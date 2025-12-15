import { useState } from 'react';
import { UserPlus, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface ConnectPartnerScreenProps {
  userName: string;
  onConnected: () => void;
}

export function ConnectPartnerScreen({ userName, onConnected }: ConnectPartnerScreenProps) {
  const [partnerCode, setPartnerCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [codeError, setCodeError] = useState('');
  const myCode = 'ABC' + Math.random().toString(36).substr(2, 6).toUpperCase();

  const validatePartnerCode = (code: string): boolean => {
    // Код должен начинаться с ABC и содержать 6 символов после
    const codePattern = /^ABC[A-Z0-9]{6}$/;
    return codePattern.test(code);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myCode);
    setCopied(true);
    toast.success('Код скопирован!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = partnerCode.trim();
    
    if (!trimmedCode) {
      setCodeError('Введите код партнера');
      return;
    }

    if (!validatePartnerCode(trimmedCode)) {
      setCodeError('Неверный формат кода. Код должен начинаться с ABC и содержать 6 символов');
      toast.error('Неверный формат кода');
      return;
    }

    setCodeError('');
    toast.success('Партнер подключен!');
    setTimeout(() => onConnected(), 1000);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setPartnerCode(value);
    if (codeError) {
      setCodeError('');
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-purple-600">Привет, {userName}!</h2>
            <p className="text-gray-600">Подключите вашего партнера</p>
          </div>
        </div>

        {/* My Code */}
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-pink-600">Ваш код подключения</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-purple-50 rounded-lg p-4 text-center">
              <code className="text-purple-600">{myCode}</code>
            </div>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleCopyCode}
              className="shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-gray-500 text-center">
            Отправьте этот код вашему партнеру
          </p>
        </div>

        {/* Partner Code Input */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600">или</p>
          </div>
          
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partner-code">Код партнера</Label>
              <Input
                id="partner-code"
                type="text"
                placeholder="ABC123456"
                value={partnerCode}
                onChange={handleCodeChange}
                className={`bg-white/80 text-center ${codeError ? 'border-red-500' : ''}`}
                maxLength={9}
              />
              {codeError && (
                <p className="text-sm text-red-500">{codeError}</p>
              )}
            </div>
            
            <GradientButton type="submit">
              Подключиться
            </GradientButton>
          </form>
        </div>

        {/* Skip */}
        <div className="text-center">
          <button
            type="button"
            onClick={onConnected}
            className="text-gray-500 hover:text-gray-600"
          >
            Пропустить (подключить позже)
          </button>
        </div>
      </div>
    </div>
  );
}
