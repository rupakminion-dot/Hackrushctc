import { useState } from "react";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import MainInterface from "./components/MainInterface";
import { Toaster } from "./components/ui/sonner";

type Screen = "home" | "auth" | "main";

export interface User {
  email: string;
  name?: string;
  credits?: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    console.log("User logged in:", loggedInUser);
    setUser(loggedInUser);
    setCurrentScreen("main");
  };

  return (
    <>
      {currentScreen === "home" && (
        <HomePage
          onNavigateToAuth={() => setCurrentScreen("auth")}
          onNavigateToSkill={() => setCurrentScreen("auth")}
        />
      )}

      {currentScreen === "auth" && (
        <AuthPage
          onBack={() => setCurrentScreen("home")}
          onLogin={handleLogin}
        />
      )}

      {currentScreen === "main" && user && (
        <MainInterface user={user} />
      )}

      <Toaster />
    </>
  );
}
