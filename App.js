import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SolicitationList from './components/SolicitationList';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Minhas Solicitações"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'purple',
          elevation: 0,
          borderBottomWidth: 0,
          shadowColor: '#aaa',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}

      >
        <Stack.Screen name="Minhas Solicitações" component={SolicitationList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
