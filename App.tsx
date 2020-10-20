import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';


const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#312E38" />
      <Text style={styles.title}>Aplicativo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#312E38'
 },
 title: {
   fontSize: 35,
   fontWeight: 'bold',
   color: '#eee',
 }
});

export default App;
