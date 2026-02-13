import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BookMarked, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { User } from "../App";

const API = "http://127.0.0.1:5000/api";

interface AuthPageProps {
  onBack: () => void;
  onLogin: (user: User) => void;
}

export default function AuthPage({ onBack, onLogin }: AuthPageProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateMobile = (mobile: string) =>
    /^[0-9]{10}$/.test(mobile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      toast.error("Valid email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (!isSignIn) {
      if (!mobile || !validateMobile(mobile)) {
        toast.error("Valid 10-digit mobile required");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = isSignIn ? "/login" : "/register";

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          mobile,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Authentication failed");
        setLoading(false);
        return;
      }

      // Expect backend to return: { user: { email, name, credits } }
      const user: User = data.user;

      toast.success(
        isSignIn
          ? "Welcome back to SkilledIn!"
          : "Account created successfully!"
      );

      onLogin(user);
    } catch (err) {
      toast.error("Server connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-amber-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-amber-200"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Library
        </Button>

        <div className="bg-amber-50 rounded-lg shadow-2xl p-8 border-4 border-amber-900/30">
          <div className="text-center mb-6">
            <BookMarked className="mx-auto mb-3 text-amber-700" size={40} />
            <h1 className="text-2xl font-serif text-amber-900">
              {isSignIn ? "Welcome Back" : "Join SkilledIn"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {!isSignIn && (
              <div>
                <Label>Mobile</Label>
                <Input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            )}

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isSignIn && (
              <div>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-amber-700 text-white"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isSignIn
                ? "Sign In"
                : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-amber-700">
              {isSignIn
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="font-semibold underline"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
