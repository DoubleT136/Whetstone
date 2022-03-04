/**
 * @format
 * @flow strict-local
 */

import React from 'react';
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
  Image,
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
import RealmDB from './RealmDB.js'

// done this way because require only accepts a literal string
const images = {
  'Pikachu': require('../src/Pikachu.png'),
  'Victini': require('../src/Victini.png')
};

export const ObjectList = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: Colors.white,
          }}>
          {
            RealmDB.objects("Object").map((obj) => {
              return <ObjectListItem key={obj._id} object={obj} />;
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ObjectListItem = (object) => {
  object = object.object;
  img = '../src/' + object.sprite + '.png';
  return (
    <View>
      <Text>{object.name}</Text>
      <Text>{object.desc}</Text>
      <Image source={images[object.sprite]} style={{width: 50, height: 50}} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
