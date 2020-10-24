import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {

  const { sigOut } = useAuth();

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Dashboard</Text>
      <Button title="Sair" onPress={sigOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});

export default Dashboard;
