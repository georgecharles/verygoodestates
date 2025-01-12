import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  isLoading: boolean;
  saveProperty: (propertyId: string) => void;
  unsaveProperty: (propertyId: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  isLoading: true,
  saveProperty: () => {},
  unsaveProperty: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth state
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const saveProperty = (propertyId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        savedProperties: [...user.savedProperties, propertyId]
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const unsaveProperty = (propertyId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        savedProperties: user.savedProperties.filter(id => id !== propertyId)
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      updateUser,
      isLoading,
      saveProperty,
      unsaveProperty
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);