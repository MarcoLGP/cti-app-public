import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'

export default function ModalHandleLogin(props) {

    return (
        <Modal
            animationType="slide"
            onShow={() => props.setLoading(false)}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Problemas ao efetuar login: </Text>
                    <Text style={styles.modalText}>{props.helper}</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.setModalVisible(!props.modalVisible)}
                    >
                        <Text style={styles.textStyle}>Ok</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#342B49",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})