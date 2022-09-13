import React from 'react';
import { MainContainer } from './Navigation/MainContainer';
import { SpotProvider, UserProvider } from './Navigation/AppContext';
import { RootSiblingParent } from 'react-native-root-siblings';

function App() {
  return (
    <RootSiblingParent>
      <UserProvider>
        <SpotProvider>
          <MainContainer />
        </SpotProvider>
      </UserProvider>
    </RootSiblingParent>
  );
}

export default App;
