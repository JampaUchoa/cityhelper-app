import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SolicitationList from './components/SolicitationList';
import SolicitationNew from './components/SolicitationNew';
import WorkerSolicitation from './components/WorkerSolicitation';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Minhas Solicitações"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1874f5',
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
        <Stack.Screen name="Nova Solicitação" component={SolicitationNew}/>
        <Stack.Screen name="Trabalhador" component={WorkerSolicitation}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
