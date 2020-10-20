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


const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312E38" />
      <View style={styles.container}>
        <AuthRoutes />
      </View>
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
