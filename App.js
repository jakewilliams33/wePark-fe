import React from "react";
import { MainContainer } from "./Navigation/MainContainer";
import { UserProvider } from "./Navigation/AppContext";
import { RootSiblingParent } from "react-native-root-siblings";

function App() {
  return (
    <RootSiblingParent>
      <UserProvider>
        <MainContainer />
      </UserProvider>
    </RootSiblingParent>
  );
}

export default App;
