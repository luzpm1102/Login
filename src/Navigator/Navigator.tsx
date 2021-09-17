import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {UserPage} from '../View/UserPage';
import {LoginScreen} from '../View/LoginScreen';
import {RegisterScreen} from '../View/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import {LoadingScreen} from '../View/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {


  const {status} = useContext(AuthContext);
  if (status === 'checking') return <LoadingScreen />;
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {console.log(status)}
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="UserPage" component={UserPage} />
      )}
    </Stack.Navigator>
  );
};
