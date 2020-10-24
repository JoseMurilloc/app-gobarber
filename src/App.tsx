import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AuthRoutes from './routes';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';


const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312E38" />
      <AppProvider>
        <View style={styles.container}>
          <AuthRoutes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#312E38'
 }
});

export default App;
