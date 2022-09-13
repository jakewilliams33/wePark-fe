import React from 'react';
import { MainContainer } from './Navigation/MainContainer';
import { SpotProvider, UserProvider } from './Navigation/AppContext';

function App() {
  return (
    <UserProvider>
      <SpotProvider>
        <MainContainer />
      </SpotProvider>
    </UserProvider>
  );
}

export default App;
