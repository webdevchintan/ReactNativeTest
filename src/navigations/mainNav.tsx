import React, {FC, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AppStack from './appstack';

const MainNav: FC = () => {
  const bootstrap = () => {
    auth().onAuthStateChanged(_user => {
      if (_user) {
        console.log(_user);
      }
    });
  };

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <NavigationContainer>
      {/* {user !== null ? <AppStack /> : <AuthStack />} */}
      {<AppStack />}
    </NavigationContainer>
  );
};

export default MainNav;
