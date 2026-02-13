import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BookMarked, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface AuthPageProps {
  onBack: () => void;
  onLogin: (email: string) => void;
}

export function AuthPage({ onBack, onLogin }: AuthPageProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateMobile = (mobile: string) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !mobile) {
      toast.error('Please enter email or mobile number');
      return;
    }

    if (email && !validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (mobile && !validateMobile(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    if (!isSignIn) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
    }

    // Successful authentication
    toast.success(isSignIn ? 'Welcome back to SkilledIn!' : 'Account created successfully!');
    onLogin(email || mobile);
  };

  const handleForgotPassword = () => {
    if (!email && !mobile) {
      toast.error('Please enter your email or mobile number first');
      return;
    }
    toast.success('Password reset link sent!');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1600499273056-52b8a9f6859f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwaW50ZXJpb3IlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwOTY0ODIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-amber-950/70 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-amber-200 hover:text-amber-50 hover:bg-amber-900/30"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Library
          </Button>

          {/* Auth Card */}
          <div className="bg-amber-50 rounded-lg shadow-2xl p-8 border-4 border-amber-900/30">
            {/* Header */}
            <div className="text-center mb-8">
              <BookMarked className="mx-auto mb-4 text-amber-700" size={48} />
              <h1 className="text-3xl font-serif text-amber-900 mb-2">
                {isSignIn ? 'Welcome Back' : 'Join SkilledIn'}
              </h1>
              <p className="text-amber-700">
                {isSignIn ? 'Sign in to access your learning library' : 'Create your reader account'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-amber-900">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-amber-300 focus:border-amber-600"
                />
              </div>

              <div>
                <Label htmlFor="mobile" className="text-amber-900">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="1234567890"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="border-amber-300 focus:border-amber-600"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-amber-900">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-amber-300 focus:border-amber-600"
                />
              </div>

              {!isSignIn && (
                <div>
                  <Label htmlFor="confirmPassword" className="text-amber-900">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-amber-300 focus:border-amber-600"
                  />
                </div>
              )}

              {isSignIn && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-amber-700 hover:text-amber-900 underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50"
                size="lg"
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            {/* Toggle between Sign In and Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-amber-700">
                {isSignIn ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => {
                    setIsSignIn(!isSignIn);
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="text-amber-900 font-semibold hover:underline"
                >
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
