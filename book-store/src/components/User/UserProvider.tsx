import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import { User } from '../../types';

interface IUserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: IUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const authenticateUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ currentUser, authenticateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
