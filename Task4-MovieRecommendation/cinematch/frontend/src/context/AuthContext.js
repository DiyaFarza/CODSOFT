import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    return token ? { token, name } : null;
  });

  const loginUser = (token, name) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    setUser({ token, name });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);