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

import {
  ViroARScene,
  ViroText,
  ViroNode,
  ViroImage,
  ViroConstants,
  ViroARSceneNavigator,
  ViroARPlaneSelector,
  ViroButton,
  Viro3DObject,
} from '@viro-community/react-viro';

import { ObjectList } from './modules/ObjectList.js';
import { NewObject } from './modules/NewObject.js';
import { TestingView } from './modules/TestingView.js';

import RealmDB from './modules/RealmDB.js';
import uuid from 'react-native-uuid';

const Homescreen = ({setState}) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [objectToTest, setObjectToTest] = useState(undefined);
  const [reviewList, setReviewList] = useState([]);
  const [listModalVisible, setListModalVisible] = useState(false);
  return (
    <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'space-around'}}>
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

      <Pressable
        style={styles.button}
        onPress={() => setState('ar')}
      >
        <Text style={styles.textStyle}>AR View</Text>
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

const HelloWorldSceneAR = ({setState}) => {
  const [text, setText] = useState('Initializing AR...');

  const images = {
    Pikachu: require('./src/Pikachu.png'),
    Victini: require('./src/Victini.png'),
    Bulbasaur: require('./src/Bulbasaur.png'),
  };

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroNode position={[0, 0, -1]}>
        <ViroImage
          source={images['Pikachu']}
          scale={[0.5, 0.5, 0.5]}
          backgroundColor={'#FFFFFF80'}
        />
      </ViroNode>

      <ViroNode position={[2, 0, -1]}>
        <ViroImage
          source={images['Victini']}
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 0, 45]}
          backgroundColor={'#FFFFFF80'}
        />
      </ViroNode>

      <ViroNode position={[2, 0, 0]}>
        <ViroImage
          source={images['Bulbasaur']}
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 90, 0]}
          backgroundColor={'#FFFFFF80'}
        />
      </ViroNode>
    </ViroARScene>
  );
};

const AR = ({setState}) => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={{flex: 1}}
    />
  );
};

const App = () => {
  // RealmDB.write(() => {
  //   RealmDB.deleteAll();
  // });
  const [state, setState] = useState('tutorial');
  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable
          style={styles.buttonReset}
          onPress={() => setState('app')}
        >
          <Text style={styles.textStyleReset}>Home</Text>
        </Pressable>
      {state == 'tutorial' && <Tutorial setState={setState}/>}
      {state == 'app' && <Homescreen setState={setState}/>}
      {state == 'ar' && <AR setState={setState}/>}
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
  buttonReset: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  textStyleReset: {
    color: "#FFD700",
    textAlign: "center"
  }
});

export default App;
