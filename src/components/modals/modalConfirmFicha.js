import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import { setModalVisible } from '../../redux/infoSlice'

export default function ModalConfirmFicha(props) {

    const { message, modalVisible } = useSelector(state => state.clientId)
    const dispatch = useDispatch()

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                dispatch(setModalVisible(false))
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            props.navigate('title5')
                            props.setHideMenu(true)
                            dispatch(setModalVisible(false))
                        }}
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