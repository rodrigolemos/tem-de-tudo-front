import React, { createContext, useCallback, useContext, useState } from 'react';
// import { api } from '../services/api';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const user = localStorage.getItem('@tem_de_tudo:user');
    const token = localStorage.getItem('@tem_de_tudo:token');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ user, token }) => {

    localStorage.setItem('@tem_de_tudo:user', JSON.stringify(user));
    localStorage.setItem('@tem_de_tudo:token', token);

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@tem_de_tudo:user');
    localStorage.removeItem('@tem_de_tudo:token');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }

  return context;
}

export { AuthContextProvider, useAuth }