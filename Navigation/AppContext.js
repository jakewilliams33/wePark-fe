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
  const [contextSpot_id, setContextSpot_id] = useState();

  return (
    <SpotContext.Provider value={{ contextSpot_id, setContextSpot_id }}>
      {children}
    </SpotContext.Provider>
  );
};

export { UserContext, UserProvider, SpotContext, SpotProvider };
