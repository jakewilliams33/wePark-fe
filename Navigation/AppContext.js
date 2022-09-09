import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// const useUserContext = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//    throw new Error('useCartContext must be used within a CartContextProvider');
//   }
//   return context;
//  };

export { UserContext, UserProvider };
