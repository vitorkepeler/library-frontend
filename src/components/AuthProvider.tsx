import axios from 'axios';
import * as React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
}>({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken_] = useState<string | null>(() => localStorage.getItem('token'));
  const setToken = (newToken: string | null) => {
    setToken_(newToken);

    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export function logout() {
  localStorage.removeItem('token');
}

export default AuthProvider;