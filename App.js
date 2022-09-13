import React from 'react';
import { MainContainer } from './Navigation/MainContainer';
import {
  HistoryProvider,
  SpotProvider,
  UserProvider,
} from './Navigation/AppContext';
import { RootSiblingParent } from 'react-native-root-siblings';

function App() {
  return (
    <RootSiblingParent>
      <UserProvider>
        <HistoryProvider>
          <SpotProvider>
            <MainContainer />
          </SpotProvider>
        </HistoryProvider>
      </UserProvider>
    </RootSiblingParent>
  );
}

export default App;
