import React, { useState } from "react";
import { MainContainer } from "./Navigation/MainContainer";
import { UserProvider, UserContext } from "./Navigation/AppContext";

function App() {
  return (
    <UserProvider>
      <MainContainer />
    </UserProvider>
  );
}

export default App;
