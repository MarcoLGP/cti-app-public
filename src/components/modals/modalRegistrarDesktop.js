import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { addDocument } from "../../firebase/firebase";
import { setRegisterBarcode } from "../../redux/infoSlice";

export default function ModalRegistrarDesktop(props) {

    const { registerBarcode, user } = useSelector(state => state.clientId)
    const dispatch = useDispatch()

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Registrar produto pelo computador ?</Text>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                props.navigate('title13')
                                addDocument(`CodProduto-${user.uid}`, { codigo: `${registerBarcode}` })
                                dispatch(setRegisterBarcode(''))
                                props.setModalVisible(false)
                            }}
                        >
                            <Text style={styles.textStyle}>Sim</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, {marginLeft: 20}]}
                            onPress={() => props.setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Não</Text>
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