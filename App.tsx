import 'react-native-gesture-handler';
import React from 'react';
import {UserPage} from './src/View/UserPage';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/Navigator/Navigator';
import {AuthProvider} from './src/context/AuthContext';
const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
