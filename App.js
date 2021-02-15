import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SolicitationList from './components/SolicitationList';
import SolicitationNew from './components/SolicitationNew';
import WorkerSolicitation from './components/WorkerSolicitation';
import Monitor from './components/Monitor';
import HomeScreen from './components/Home';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home"
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
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Monitor" component={Monitor} />

        <Stack.Screen name="Minhas Solicitações" component={SolicitationList} />
        <Stack.Screen name="Nova Solicitação" component={SolicitationNew}/>
        <Stack.Screen name="Trabalhador" component={WorkerSolicitation}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
