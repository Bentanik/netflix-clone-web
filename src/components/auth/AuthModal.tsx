import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModalWrapper from '@/components/auth/AuthModalWrapper';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');

  const switchToRegister = () => setMode('register');
  const switchToLogin = () => setMode('login');

  return (
    <AuthModalWrapper isOpen={isOpen} onClose={onClose}>
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          <LoginForm
            key="login"
            onClose={onClose}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterForm
            key="register"
            onSwitchToLogin={switchToLogin}
          />
        )}
      </AnimatePresence>
    </AuthModalWrapper>
  );
}
