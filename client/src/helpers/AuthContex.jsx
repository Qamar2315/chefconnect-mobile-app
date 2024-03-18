import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    // Logic for authenticating the user (e.g., calling an API)
    
    setUser(userData);
  };

  const logoutUser = () => {
    // Logic for logging out the user
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };