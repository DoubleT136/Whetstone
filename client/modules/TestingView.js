import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, TextInput } from "react-native";
import {twodimages} from './twodimages.js'
import RealmDB from './RealmDB.js'

export const TestingView = ({object, modalVisible, setModalVisible, addToReviewList}) => {
  if(object == undefined) {return null;}
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onDismiss={() => {
        setShowAnswer(false);
      }}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color: "white"}}>X</Text>
            </Pressable>
            <View style={styles.modalHeaderContent}>
              <Text style={{flex: 2, flexShrink: 1, textAlign: "center", color: "#F2A606", fontWeight: 'bold', fontSize: 20}}>{object.name}</Text>
              <Image source={twodimages[object.sprite]} style={{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}} />
            </View>
          </View>
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{padding: 20}}>
            <TextInput
              value={showAnswer ? object.desc : '?'}
              multiline={true}
              editable={false}
              style={{borderColor: "black", borderWidth: 0, padding: 10, textAlign: showAnswer ? 'left' : 'center'}}
            />
          </ScrollView>
          <Pressable
            style={{backgroundColor: "#F2A606", height: "10%", justifyContent: "center", alignItems: "center"}}
            onPress={() => {
              if (!showAnswer)
              {
                setShowAnswer(true);
              } else {
                addToReviewList();
                setModalVisible(!modalVisible);
              }
            }}>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>{showAnswer ? 'Mark for Review' : 'Reveal'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
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
    width: '80%',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "60%"
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
  modalContent: {
  },
});
