/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ObjectList } from './modules/ObjectList.js';
import { NewObject } from './modules/NewObject.js';
import RealmDB from './modules/RealmDB.js';
import uuid from 'react-native-uuid';

const Stack = createNativeStackNavigator();
const Homescreen = ({navigation}) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ObjectList')}
      >
        <Text style={styles.textStyle}>List Objects</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => setAddModalVisible(true)}
      >
        <NewObject modalVisible={addModalVisible} setModalVisible={setAddModalVisible} />
        <Text style={styles.textStyle}>Add Object</Text>
      </Pressable>
    </View>
  );
}

const App = () => {
  // RealmDB.write(() => {
  //   RealmDB.deleteAll();
  // });
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="ObjectList" component={ObjectList} options={{ title: 'For Review' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#777777",
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    textAlign: "center"
  },

});

export default App;
