import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const initialUsers = [
  { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [user, setUser] = useState(null);

  const register = ({ name, email, password }) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = { id: Date.now(), name, email, password };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const login = ({ email, password }) => {
    const existingUser = users.find(u => u.email === email && u.password === password);
    if (!existingUser) {
      return { success: false, message: 'Invalid email or password' };
    }
    setUser(existingUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
