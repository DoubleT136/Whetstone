import React, { useState, useEffect, useReducer } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  useWindowDimensions,
  Modal
} from 'react-native';

import RealmDB from './RealmDB.js'
import {DetailView} from './DetailView.js'
import {twodimages} from './twodimages.js'

export const ObjectList = ({reviewMode, reviewList, modalVisible, setModalVisible}) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  // IMPORTANT: setValue triggers a rerender so the list can be updated. There's probably a better way to do this.
  useEffect(() => {
    RealmDB.addListener('change', forceUpdate);
    return (() => {RealmDB.removeListener('change', forceUpdate)})
  }, []);
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onDismiss={() => {
        }}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Pressable
                style={[styles.modalButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: "white"}}>X</Text>
              </Pressable>
              <View style={styles.modalHeaderContent}>
                <Text style={{flex: 2, flexShrink: 1, textAlign: "center", color: "#F2A606", fontWeight: 'bold', fontSize: 20}}>For Review</Text>
              </View>
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <View
                style={{
                  backgroundColor: "white",
                }}>
                {
                  RealmDB.objects("Object").map((obj) => {
                    if (!reviewMode || (reviewMode && reviewList.includes(obj._id)))
                      return <ObjectListItem key={obj._id} objid={obj._id} />;
                  })
                }
                <Text style={{marginTop: '5%', textAlign: 'center'}}>{reviewMode && reviewList.length == 0 && 'You haven\'t marked anything for review yet!'}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const ObjectListItem = ({objid}) => {
  object = RealmDB.objectForPrimaryKey("Object", objid);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{flexDirection: 'row', height: useWindowDimensions().height / 10, paddingTop: "2%", paddingBottom: "2%", borderBottomColor: "black", borderBottomWidth: 1}}>
      {object != undefined && <DetailView object={object} modalVisible={modalVisible} setModalVisible={setModalVisible} />}
      {object == undefined ? null :
        <Image source={twodimages[object.sprite]} style={{flex: 1, height: '100%', resizeMode: 'contain'}} />
      }
      {object != undefined && <Text style={{flex: 2, alignSelf: "center", marginLeft: "5%", fontSize: 16}}>{object.name}</Text>}
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
  modalButton: {
    backgroundColor: "#777777",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '90%',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80%"
  },
  modalHeader: {
    flexDirection: "row",
    height: "10%",
    marginTop: "0.5%"
  },
  modalHeaderContent: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
});
