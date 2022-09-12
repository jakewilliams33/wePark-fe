import React from "react";
import { MainContainer } from "./Navigation/MainContainer";
import { UserProvider } from "./Navigation/AppContext";

function App() {
  return (
    <UserProvider>
      <MainContainer />
    </UserProvider>
  );
}

export default App;
