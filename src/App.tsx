import React from 'react';
import Onboarding from './screens/onboarding';
import Wallet from './screens/Wallet';
import LoginScreen from './screens/Auth/login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signout from './screens/Auth/logout/Signout'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Homescreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#696969' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
      }}>

      <Tab.Screen name="Coins" component={Onboarding}
        options={{ title: 'Coins' }} />
      <Tab.Screen name="wallet" component={Wallet}
        options={{ title: 'Wallet' }
        }
      />
      <Tab.Screen name="Signout" component={Signout}
        options={{ title: 'Setting' }
        }
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="home" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
