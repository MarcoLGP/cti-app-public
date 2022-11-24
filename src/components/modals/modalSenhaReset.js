import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'

export default function ModalSenhaReset(props) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}><Text style={{ fontWeight: 'bold', color: '#342B49' }}>{props.userName}</Text>, enviamos um e-mail com instruções para resetar a sua senha.</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                props.setModalVisible(false)
                            }}
                        >
                            <Text style={styles.textStyle}>Ok</Text>
                        </Pressable>
                    </View>
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
        backgroundColor: "#F6F6F6",
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
    input: {
        width: 250,
        height: 50,
        backgroundColor: '#fff',
        marginTop: '5%',
        alignSelf: 'center'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
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