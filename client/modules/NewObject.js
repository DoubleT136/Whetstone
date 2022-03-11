import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, TextInput, FlatList, SafeAreaView } from "react-native";
import {twodimages} from './twodimages.js';
import RealmDB from './RealmDB.js';
import uuid from 'react-native-uuid';

const NewObjectDetail = ({modalVisible, setModalVisible, sprite}) => {
  const [text, onChangeText] = useState('');
  const [name, onChangeName] = useState('');
  const [nameError, onNameError] = useState(false);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onDismiss={() => {
        onChangeText('');
        onChangeName('');
        onNameError(false);
      }}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={
        {flex: 1,
        justifyContent: "center",
        alignItems: "center"}}>
        <View style={{
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
          height: "60%",
        }}>
        <View style={styles.modalHeader}>
          <Pressable
            style={[styles.button]}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={{color: "white"}}>X</Text>
          </Pressable>
          <View style={styles.modalHeaderContent}>
            <Image source={twodimages[sprite]} style={{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}} />
          </View>
          <Pressable
            style={[styles.button, {backgroundColor: "#F2A606"}]}
            onPress={() => {
              if (name == '') {
                onNameError(true);
                return;
              }
              RealmDB.write(() => {
                RealmDB.create("Object", {
                  _id: uuid.v4(),
                  name: name,
                  sprite: String(sprite),
                  desc: text,
                  palace: "Science"
                });
              });
              setModalVisible(false);
            }}>
            <Text style={{color: "white"}}>Save</Text>
          </Pressable>
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{padding: 20}}>
          <Text style={{marginBottom: 5}}>Title</Text>
          <TextInput
            value={name}
            multiline={false}
            editable={true}
            onChangeText={(text) => {
              onNameError(false);
              onChangeName(text);
            }}
            placeholder="Name"
            style={{borderColor: "black", borderWidth: 1, padding: 10}}
          />
          {nameError && <Text style={{color: 'red'}}>Title cannot be empty</Text>}
          <Text style={{marginTop: 5, marginBottom: 5}}>Description</Text>
          <TextInput
            value={text}
            multiline={true}
            editable={true}
            onChangeText={onChangeText}
            placeholder="Description"
            style={{borderColor: "black", borderWidth: 1, padding: 10}}
          />
        </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export const NewObject = ({modalVisible, setModalVisible}) => {
  [newModalVisible, setNewModalVisible] = useState(false);
  [sprite, setSprite] = useState('');

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={() => {setSprite('')}}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={
          {flex: 1,
          justifyContent: "flex-end",
          alignItems: "center"}}>
          <View style={{
            width: '100%',
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            height: "25%",
          }}>
            <Pressable
              style={{backgroundColor: "rgba(0,0,0,0.4)", height: "20%", justifyContent: "center", alignItems: "center"}}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>X</Text>
            </Pressable>
            <SafeAreaView style={{height: "100%", justifyContent: 'center'}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={Object.keys(twodimages)}
                numColumns={3}
                renderItem={ (key) => (
                  <Pressable
                    style={{flex: 1, backgroundColor: "#777777", margin: 10, padding: 5}}
                    onPress={() => {
                      setModalVisible(false);
                      setSprite(key.item);
                      setNewModalVisible(true);
                    }}
                    >
                    <Image source={twodimages[key.item]} /* Use item to set the image source */
                      key={key.item} /* Important to set a key for list items,
                                     but it's wrong to use indexes as keys, see below */
                      style={{
                        width: '100%', height: 100, resizeMode: 'contain'
                      }}
                    />
                  </Pressable>
                )}
              />
            </SafeAreaView>
          </View>
        </View>
      </Modal>
      <NewObjectDetail modalVisible={newModalVisible} setModalVisible={setNewModalVisible} sprite={sprite} />
    </>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#777777",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
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
