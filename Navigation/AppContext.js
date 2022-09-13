import React, { useState, createContext } from 'react';

const UserContext = createContext();
const SpotContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const SpotProvider = ({ children }) => {
  const [contextSpot, setContextSpot] = useState();

  return (
    <SpotContext.Provider value={{ contextSpot, setContextSpot }}>
      {children}
    </SpotContext.Provider>
  );
};

export { UserContext, UserProvider, SpotContext, SpotProvider };
