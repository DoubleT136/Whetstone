import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import RealmDB from './RealmDB.js'
import {DetailView} from './DetailView.js'
import {twodimages} from './twodimages.js'

export const ObjectList = ({navigation}) => {
  [value, setValue] = useState(0);
  function forceUpdate() {
    setValue(value => value + 1);
  }
  // IMPORTANT: setValue triggers a rerender so the list can be updated. There's probably a better way to do this.
  useEffect(() => {
    RealmDB.addListener('change', forceUpdate);
    return (() => {RealmDB.removeListener('change', forceUpdate)})
  }, []);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: "white",
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

const ObjectListItem = ({object}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{flexDirection: 'row', height: useWindowDimensions().height / 10, paddingTop: "2%", paddingBottom: "2%", borderBottomColor: "black", borderBottomWidth: 1}}>
      <DetailView object={object} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      {object == undefined ? null :
        <Image source={twodimages[object.sprite]} style={{flex: 1, height: '100%', resizeMode: 'contain'}} />
      }
      <Text style={{flex: 2, alignSelf: "center", marginLeft: "5%", fontSize: 16}}>{object.name}</Text>
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>View</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#777777",
    marginLeft: "auto",
    marginRight: "5%",
    height: "50%",
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    textAlign: "center"
  },

});
