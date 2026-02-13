import { useState } from 'react';
import  HomePage  from './components/HomePage';
import  AuthPage  from './components/AuthPage';
import { MainInterface } from './components/MainInterface';
import { Toaster } from './components/ui/sonner';

type Screen = 'home' | 'auth' | 'main';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  const handleNavigateToAuth = () => {
    setCurrentScreen('auth');
  };

  const handleNavigateToSkill = (skillName: string) => {
    setSelectedSkill(skillName);
    setCurrentScreen('auth'); // For now, navigate to auth. In production, this would go to a skill detail page
  };

  const handleLogin = (email: string) => {
    console.log('User logged in:', email);
    setCurrentScreen('main');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <HomePage
          onNavigateToAuth={handleNavigateToAuth}
          onNavigateToSkill={handleNavigateToSkill}
        />
      )}
      
      {currentScreen === 'auth' && (
        <AuthPage
          onBack={handleBackToHome}
          onLogin={handleLogin}
        />
      )}
      
      {currentScreen === 'main' && (
        <MainInterface />
      )}

      <Toaster />
    </>
  );
}
