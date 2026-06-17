/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from 'react';
import { useAuthState } from '@/hooks/useAuthState';

export type User = {
  id: string;
  name: string;
  email: string;
  favoriteStates?: string[];
  trips?: unknown[];
};

export type Trip = Record<string, unknown>;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  signUp: (name: string, email: string, password: string) => Promise<User | null>;
  socialLogin: (provider: 'google' | 'github') => Promise<User | null>;
  updateProfile: (userData: Partial<User>) => Promise<User | null>;
  toggleFavoriteState: (stateId: string) => Promise<string[]>;
  addTrip: (trip: Trip) => Promise<Trip[]>;
  deleteTrip: (tripId: number) => Promise<Trip[]>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthState();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
