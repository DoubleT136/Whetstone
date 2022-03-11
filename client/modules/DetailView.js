import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, TextInput } from "react-native";
import {twodimages} from './twodimages.js'
import RealmDB from './RealmDB.js'

export const DetailView = ({object, modalVisible, setModalVisible}) => {
  // if(object == undefined) {return null;}
  const [isInEdit, setInEdit] = useState(false);
  const [text, onChangeText] = useState(object.desc);
  const [name, onChangeName] = useState(object.name);
  const [nameError, onNameError] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onDismiss={() => {
        setInEdit(false);
        onNameError(false);
      }}
      onRequestClose={() => {
        setInEdit(false);
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
            <Pressable
              style={[styles.button, {backgroundColor: isInEdit ? "#F2A606" : "#777777"}]}
              onPress={() => {
                if (!isInEdit) {
                  onChangeText(object.desc);
                  onChangeName(object.name);
                } else {
                  if (name == '') {
                    onNameError(true);
                    return;
                  }
                  RealmDB.write(() => {
                    object.name = name;
                    object.desc = text;
                  });
                }
                setInEdit(!isInEdit);
              }}>
              <Text style={{color: "white"}}>{isInEdit ? "Save" : "Edit"}</Text>
            </Pressable>
          </View>
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{padding: 20}}>
            {!isInEdit ? null : <Text style={{marginBottom: 5}}>New Title</Text>}
            {!isInEdit ? null :
              <TextInput
                value={isInEdit ? name : object.name}
                multiline={false}
                editable={isInEdit ? true : false}
                onChangeText={(text) => {
                  onNameError(false);
                  onChangeName(text);
                }}
                style={{borderColor: "black", borderWidth: isInEdit ? 1 : 0, padding: 10}}
              />
            }
            {nameError && <Text style={{color: 'red'}}>Title cannot be empty</Text>}
            {!isInEdit ? null : <Text style={{marginTop: 5, marginBottom: 5}}>New Description</Text>}
            <TextInput
              value={isInEdit ? text : object.desc}
              multiline={true}
              editable={isInEdit ? true : false}
              onChangeText={onChangeText}
              style={{borderColor: "black", borderWidth: isInEdit ? 1 : 0, padding: 10}}
            />
          </ScrollView>
          {isInEdit &&
            <Pressable
              style={{backgroundColor: "#F2A606", height: "10%", justifyContent: "center", alignItems: "center"}}
              onPress={() => {
                setModalVisible(!modalVisible);
                RealmDB.write(() => {
                  RealmDB.delete(object);
                });
              }}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Delete Object</Text>
            </Pressable>
          }
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
