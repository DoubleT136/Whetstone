import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroNode,
  ViroImage,
  ViroConstants,
  ViroARSceneNavigator,
  ViroARPlaneSelector,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  const images = {
    Pikachu: require('../src/Pikachu.png'),
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
      {/* <ViroARPlaneSelector /> */}
      <ViroNode position={[0, 0, -1]}>
        <ViroImage
          source={images['Pikachu']}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          backgroundColor={'#FFFFFF80'}
        />
      </ViroNode>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
});
