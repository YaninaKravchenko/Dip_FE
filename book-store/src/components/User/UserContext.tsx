import { createContext } from 'react';
import { User } from '../../types';

const UserContext = createContext({
  currentUser: null as User | null,
  authenticateUser: (user: User | null) => {},
  logout: () => {},
});

export default UserContext;
