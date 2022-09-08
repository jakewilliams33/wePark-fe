import * as React from "react";

const UserContext = React.createContext("");

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
