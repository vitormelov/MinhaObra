// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Função para login de funcionário
  const login = () => {
    setIsAuthenticated(true);
    setIsAdmin(false);
  };

  // Função para login de administrador
  const loginAsAdmin = () => {
    setIsAuthenticated(true);
    setIsAdmin(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
