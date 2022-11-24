import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { deleteDocument } from "../../firebase/firebase";
import { setNotFoundDoc } from "../../redux/infoSlice";

export default function ModalConfirmDelete(props) {

    const { notaVendaDoc, notFoundDoc } = useSelector(state => state.clientId)
    const dispatch = useDispatch()

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{notFoundDoc ? 'Qr code inválido' : 'Excluir o documento dos registros ?'}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                if (notFoundDoc) {
                                    props.navigate('title13')
                                    dispatch(setNotFoundDoc(false))
                                } else {
                                    props.navigate('title13')
                                    deleteDocument(notaVendaDoc.idNota, 'Registros')
                                    props.setModalVisible(false)
                                }
                            }}
                        >
                            <Text style={styles.textStyle}>{notFoundDoc ? 'Ok' : 'Sim'}</Text>
                        </Pressable>
                        {!notFoundDoc ? <Pressable
                            style={[styles.button, styles.buttonClose, { marginLeft: 10 }]}
                            onPress={() => props.setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Não</Text>
                        </Pressable> : null}
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