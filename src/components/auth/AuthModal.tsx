import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModalWrapper from './AuthModalWrapper';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import type { LoginFormData, RegisterFormData } from '@/schemas/authSchema';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');

  const onLoginSubmit = async (data: LoginFormData) => {
    console.log('Login:', data);
    onClose();
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    console.log('Register:', data);
    // TODO: Implement Redux register action here
    onClose();
  };

  const switchToRegister = () => setMode('register');
  const switchToLogin = () => setMode('login');

  return (
    <AuthModalWrapper isOpen={isOpen} onClose={onClose}>
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          <LoginForm
            key="login"
            onSubmit={onLoginSubmit}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterForm
            key="register"
            onSubmit={onRegisterSubmit}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </AnimatePresence>
    </AuthModalWrapper>
  );
}
