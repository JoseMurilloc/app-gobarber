import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312E38' }
      }}
    >
      <App.Screen name="SignUp" component={Dashboard} />
    </App.Navigator>
  );
}

export default AppRoutes;
