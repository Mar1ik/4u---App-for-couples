import { useState } from 'react';
import { ArrowLeft, Plus, ExternalLink, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

type Screen = 'main' | 'chat' | 'wishlist' | 'calendar' | 'profile';

interface WishlistScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface WishItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  url?: string;
  marketplace?: 'ozon' | 'wildberries' | 'other';
}

export function WishlistScreen({ onNavigate }: WishlistScreenProps) {
  const [myWishes, setMyWishes] = useState<WishItem[]>([
    {
      id: '1',
      title: 'Кофе из любимой кофейни',
      description: 'Латте с карамелью',
      price: '350₽',
      marketplace: 'other',
    },
    {
      id: '2',
      title: 'Новая книга',
      description: 'Последняя часть любимой серии',
      price: '890₽',
      url: 'https://ozon.ru',
      marketplace: 'ozon',
    },
  ]);

  const [partnerWishes] = useState<WishItem[]>([
    {
      id: '3',
      title: 'Беспроводные наушники',
      description: 'AirPods Pro',
      price: '24990₽',
      url: 'https://wildberries.ru',
      marketplace: 'wildberries',
    },
    {
      id: '4',
      title: 'Массаж',
      description: 'Расслабляющий массаж 60 мин',
      price: '3500₽',
      marketplace: 'other',
    },
  ]);

  const [newWish, setNewWish] = useState({
    title: '',
    description: '',
    price: '',
    url: '',
    marketplace: 'other' as 'ozon' | 'wildberries' | 'other',
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const detectMarketplace = (url: string): 'ozon' | 'wildberries' | 'other' => {
    if (!url) return 'other';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('ozon.ru') || lowerUrl.includes('ozon.com')) {
      return 'ozon';
    }
    if (lowerUrl.includes('wildberries.ru') || lowerUrl.includes('wb.ru')) {
      return 'wildberries';
    }
    return 'other';
  };

  const handleAddWish = () => {
    if (newWish.title.trim()) {
      const detectedMarketplace = newWish.url ? detectMarketplace(newWish.url) : newWish.marketplace;
      const wish: WishItem = {
        id: Date.now().toString(),
        ...newWish,
        marketplace: detectedMarketplace,
      };
      setMyWishes([...myWishes, wish]);
      setNewWish({ title: '', description: '', price: '', url: '', marketplace: 'other' });
      setDialogOpen(false);
      toast.success('Желание добавлено! ✨');
    }
  };

  const handleDeleteWish = (id: string) => {
    setMyWishes(myWishes.filter(w => w.id !== id));
    toast.success('Желание удалено');
  };

  const handleBuyGift = (wish: WishItem) => {
    if (wish.url) {
      window.open(wish.url, '_blank');
      toast.success('Открыта ссылка на покупку! 🎁');
    } else {
      toast.success('Отличная идея для подарка! 💝');
    }
  };

  const getMarketplaceLogo = (marketplace: string) => {
    switch (marketplace) {
      case 'ozon':
        return '🔵 Ozon';
      case 'wildberries':
        return '🟣 WB';
      default:
        return '🛍️';
    }
  };

  const renderWishlist = (wishes: WishItem[], isMine: boolean) => (
    <div className="space-y-3">
      {wishes.map((wish) => (
        <div key={wish.id} className="bg-white rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-gray-800">{wish.title}</h3>
              <p className="text-gray-500">{wish.description}</p>
              {wish.price && (
                <p className="text-pink-600 mt-1">{wish.price}</p>
              )}
              {wish.marketplace && (
                <div className="mt-2">
                  <span className="text-purple-600">{getMarketplaceLogo(wish.marketplace)}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {!isMine && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleBuyGift(wish)}
                  className="shrink-0"
                >
                  <ShoppingBag className="w-4 h-4 text-pink-500" />
                </Button>
              )}
              {wish.url && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => window.open(wish.url, '_blank')}
                  className="shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
              {isMine && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDeleteWish(wish.id)}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
      {wishes.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Пока нет желаний</p>
        </div>
      )}
    </div>
  );

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
          <h1 className="flex-1 text-purple-600">Вишлист</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <GradientButton size="icon">
                <Plus className="w-5 h-5" />
              </GradientButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить желание</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название</Label>
                  <Input
                    id="title"
                    value={newWish.title}
                    onChange={(e) => setNewWish({ ...newWish, title: e.target.value })}
                    placeholder="Что вы хотите?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Input
                    id="description"
                    value={newWish.description}
                    onChange={(e) => setNewWish({ ...newWish, description: e.target.value })}
                    placeholder="Детали..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Цена (опционально)</Label>
                  <Input
                    id="price"
                    value={newWish.price}
                    onChange={(e) => setNewWish({ ...newWish, price: e.target.value })}
                    placeholder="1000₽"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">Ссылка (опционально)</Label>
                  <Input
                    id="url"
                    type="url"
                    value={newWish.url}
                    onChange={(e) => {
                      const url = e.target.value;
                      const detected = detectMarketplace(url);
                      setNewWish({ ...newWish, url, marketplace: detected });
                    }}
                    placeholder="https://ozon.ru/... или https://wildberries.ru/..."
                  />
                  {newWish.url && (
                    <p className="text-xs text-gray-500">
                      Определен: {getMarketplaceLogo(detectMarketplace(newWish.url))}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Маркетплейс</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={newWish.marketplace === 'ozon' ? 'default' : 'outline'}
                      onClick={() => setNewWish({ ...newWish, marketplace: 'ozon' })}
                      className="flex-1"
                    >
                      Ozon
                    </Button>
                    <Button
                      type="button"
                      variant={newWish.marketplace === 'wildberries' ? 'default' : 'outline'}
                      onClick={() => setNewWish({ ...newWish, marketplace: 'wildberries' })}
                      className="flex-1"
                    >
                      WB
                    </Button>
                    <Button
                      type="button"
                      variant={newWish.marketplace === 'other' ? 'default' : 'outline'}
                      onClick={() => setNewWish({ ...newWish, marketplace: 'other' })}
                      className="flex-1"
                    >
                      Другое
                    </Button>
                  </div>
                </div>
                <GradientButton onClick={handleAddWish}>
                  Добавить
                </GradientButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="my" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="my">Мои желания</TabsTrigger>
            <TabsTrigger value="partner">Партнер</TabsTrigger>
          </TabsList>
          <TabsContent value="my">
            {renderWishlist(myWishes, true)}
          </TabsContent>
          <TabsContent value="partner">
            {renderWishlist(partnerWishes, false)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
