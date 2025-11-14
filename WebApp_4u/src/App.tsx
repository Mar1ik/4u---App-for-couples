import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { CreatePetScreen } from './components/CreatePetScreen';
import { MainScreen } from './components/MainScreen';
import { ChatScreen } from './components/ChatScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ConnectPartnerScreen } from './components/ConnectPartnerScreen';
import { Toaster } from './components/ui/sonner';

type Screen = 
  | 'login' 
  | 'connect-partner' 
  | 'create-pet' 
  | 'main' 
  | 'chat' 
  | 'wishlist' 
  | 'calendar' 
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('dino');
  const [petColor, setPetColor] = useState('#FF6B9D');
  const [petSecondaryColor, setPetSecondaryColor] = useState('#FFB3D9');

  const handleLogin = (name: string) => {
    setUserName(name);
    setCurrentScreen('connect-partner');
  };

  const handlePartnerConnected = () => {
    setCurrentScreen('create-pet');
  };

  const handlePetCreated = (name: string, type: string, color: string, secondaryColor: string) => {
    setPetName(name);
    setPetType(type);
    setPetColor(color);
    setPetSecondaryColor(secondaryColor);
    setCurrentScreen('main');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'connect-partner':
        return <ConnectPartnerScreen userName={userName} onConnected={handlePartnerConnected} />;
      case 'create-pet':
        return <CreatePetScreen onPetCreated={handlePetCreated} />;
      case 'main':
        return <MainScreen onNavigate={setCurrentScreen} petName={petName} petType={petType} petColor={petColor} petSecondaryColor={petSecondaryColor} />;
      case 'chat':
        return <ChatScreen onNavigate={setCurrentScreen} />;
      case 'wishlist':
        return <WishlistScreen onNavigate={setCurrentScreen} />;
      case 'calendar':
        return <CalendarScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} petName={petName} petType={petType} petColor={petColor} petSecondaryColor={petSecondaryColor} />;
      default:
        return <MainScreen onNavigate={setCurrentScreen} petName={petName} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
        <div className="max-w-md mx-auto h-screen">
          {renderScreen()}
        </div>
      </div>
      <Toaster />
    </>
  );
}
