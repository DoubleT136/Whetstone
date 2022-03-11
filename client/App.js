/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ObjectList } from './modules/ObjectList.js';
import { AR } from './modules/AR.js';
import RealmDB from './modules/RealmDB.js';
import Realm from "realm";
import uuid from 'react-native-uuid';

const SpriteList = [
  {name: "Pikachu", image:"/src/pikachu.png"},
  {name: "Victini", image:"/src/victini.png"}
]

const Stack = createNativeStackNavigator();
const Homescreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Button
        title="List Objects"
        onPress={() => navigation.navigate('ObjectList')}
      />
      <Button
        title="AR View"
        onPress={() => navigation.navigate('AR')}
      />
    </SafeAreaView>
  );
}

const App = () => {
  RealmDB.write(() => {
    RealmDB.deleteAll();
    RealmDB.create("Object", {
      _id: uuid.v4(),
      name: "Electricity",
      sprite: "Pikachu",
      desc: "R = V / I",
      palace: "Science"
    });
    RealmDB.create("Object", {
      _id: uuid.v4(),
      name: "Fire",
      sprite: "Victini",
      desc: "fuel + oxygen —> carbon dioxide + water",
      palace: "Science"
    });
  });
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="ObjectList" component={ObjectList} />
        <Stack.Screen name="AR" component={AR} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
