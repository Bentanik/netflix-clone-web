import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModalWrapper from './AuthModalWrapper';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import type { LoginFormData, RegisterFormData } from '@/schemas/authSchema';
import { useRegisterEmail } from '@/services';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');

  const { mutate: register } = useRegisterEmail();

  const onLoginSubmit = async (data: LoginFormData) => {
    console.log('Login:', data);
    onClose();
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    register(
      {
        email: data.email,
        password: data.password,
        displayName: data.displayName
      },
      {
        onError: (error) => {
          console.error('Registration error:', error);
        },
        onSuccess: (response) => {
          console.log('Registration successful:', response);
          onClose();
        },
      }
    );
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
