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
  Modal,
  Image
} from 'react-native';

import { ObjectList } from './modules/ObjectList.js';
import { NewObject } from './modules/NewObject.js';
import { TestingView } from './modules/TestingView.js';

import RealmDB from './modules/RealmDB.js';
import uuid from 'react-native-uuid';

const Homescreen = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [objectToTest, setObjectToTest] = useState(undefined);
  const [reviewList, setReviewList] = useState([]);
  const [listModalVisible, setListModalVisible] = useState(false);
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

const Tutorial = ({setState}) => {
  return (
    <>
      <Image source={require('./src/Logo.png')} style={{flex: 1, width: '100%', resizeMode: 'contain', marginTop: '10%'}} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: "center", color: "#F2A606", fontWeight: 'bold', fontSize: 30}}>What is a mind palace?</Text>
      </View>
      <View style={{flex: 2, alignItems: 'center', marginLeft: '10%', marginRight: '10%'}}>
        <Text style={{fontSize: 20}}>Mind palace is a strategy of memory enhancement which uses visualizations of familiar spatial environments in order to enhance the recall of information.</Text>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          style={styles.button}
          onPress={() => setState('app')}
        >
          <Text style={styles.textStyle}>Try it now!</Text>
        </Pressable>
      </View>
    </>
  );
}

const App = () => {
  // RealmDB.write(() => {
  //   RealmDB.deleteAll();
  // });
  const [state, setState] = useState('tutorial');
  return (
    <SafeAreaView style={{flex: 1}}>
      {state == 'tutorial' && <Tutorial setState={setState}/>}
      {state == 'app' && <Homescreen />}
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
