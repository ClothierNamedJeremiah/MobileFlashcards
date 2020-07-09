import React, { useEffect } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import reducer from './src/reducers';
import middleware from './src/middleware';
import { setLocalNotification } from './src/helpers/helpers'

import Home from './src/components/Home';
import NewDeck from './src/components/NewDeck';
import Deck from './src/components/Deck';
import NewCard from './src/components/NewCard';
import Quiz from './src/components/Quiz';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='Deck' component={Deck} />
      <HomeStack.Screen name='New Card' component={NewCard} />
      <HomeStack.Screen name='Quiz' component={Quiz} />
    </HomeStack.Navigator>
  )
}

const store = createStore(reducer, middleware);
const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => setLocalNotification(),[])
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName='Home'
            tabBarOptions={{activeTintColor: '#e91e63'}}>
            <Tab.Screen name='Home' component={HomeStackScreen}/>
            <Tab.Screen name="New Deck" component={NewDeck} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

export default App;