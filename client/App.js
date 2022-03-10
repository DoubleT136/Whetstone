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
  Modal
} from 'react-native';

import { ObjectList } from './modules/ObjectList.js';
import { NewObject } from './modules/NewObject.js';
import { TestingView } from './modules/TestingView.js';

import RealmDB from './modules/RealmDB.js';
import uuid from 'react-native-uuid';

const Homescreen = () => {
  [addModalVisible, setAddModalVisible] = useState(false);
  [testModalVisible, setTestModalVisible] = useState(false);
  [reviewModalVisible, setReviewModalVisible] = useState(false);
  [objectToTest, setObjectToTest] = useState(undefined);
  [reviewList, setReviewList] = useState([]);
  [listModalVisible, setListModalVisible] = useState(false);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Pressable
        style={styles.button}
        onPress={() => setListModalVisible(true)}
      >
        <ObjectList reviewMode={false} reviewList={[]} modalVisible={listModalVisible} setModalVisible={setListModalVisible}/>
        <Text style={styles.textStyle}>List Objects</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => setAddModalVisible(true)}
      >
        <NewObject modalVisible={addModalVisible} setModalVisible={setAddModalVisible} />
        <Text style={styles.textStyle}>Add Object</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          setObjectToTest(RealmDB.objects("Object")[0])
          setTestModalVisible(true);
        }}
      >
        <TestingView object={objectToTest} modalVisible={testModalVisible} setModalVisible={setTestModalVisible} addToReviewList={() => {
          if (!reviewList.includes(objectToTest._id))
          {
            setReviewList(reviewList.concat([objectToTest._id]));
          }}} />
        <Text style={styles.textStyle}>Example to test</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          setReviewModalVisible(true);
        }}
      >
        <ObjectList reviewMode={true} reviewList={reviewList} modalVisible={reviewModalVisible} setModalVisible={setReviewModalVisible}/>
        <Text style={styles.textStyle}>Objects Marked For Review</Text>
      </Pressable>


      <Pressable
        style={styles.button}
        onPress={() => {
          setReviewList([]);
        }}
      >
        <Text style={styles.textStyle}>End Test</Text>
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
      <Homescreen />
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
