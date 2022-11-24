import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'
import { useDispatch } from "react-redux";
import { setBarcode, setNotFoundEncontrar } from "../../redux/infoSlice";

export default function ModalNotFoundEncontrar(props) {

    const dispatch = useDispatch()

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.open}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Nenhum produto cadastrado com este código.</Text>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                dispatch(setNotFoundEncontrar(false))
                                dispatch(setBarcode(null))
                                props.navigate('title13')
                            }}
                        >
                            <Text style={styles.textStyle}>OK</Text>
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
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        paddingTop: 25,
        paddingBottom: 20,
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