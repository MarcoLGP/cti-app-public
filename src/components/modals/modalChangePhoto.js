import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar } from 'react-native-paper'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { uploadPhoto, updatePhoto } from "../../firebase/firebase";
import { useDispatch, useSelector } from 'react-redux'
import { refreshPhoto } from '../../redux/infoSlice'

export default function ModalChangePhoto(props) {

    const [preview, setPreview] = React.useState()
    const [imagePath, setImagePath] = React.useState('')
    const dispatch = useDispatch()
    const [previewMime, setPreviewMime] = React.useState()
    const [previewPhoto, setPreviewPhoto] = React.useState(false)
    const { user } = useSelector(state => state.clientId)

    React.useEffect(() => {
        setPreview(user ? user.photoURL : null)
    }, [user])

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
                {user ?
                <View style={styles.modalView}> 
                    <View style={{ flexDirection: 'row' }}>
                        {preview ?
                            <Avatar.Image size={150} source={{ uri: previewPhoto ? `data:${previewMime};base64,${preview}` : user.photoURL }} />
                            :
                            <Avatar.Text style={{ height: 150, width: 150, borderRadius: 80 }} label={props.userName ? props.userName[0][0] : null} labelStyle={{ fontSize: 60 }} />}
                        {preview ? <Ionicon style={{ marginTop: '50%', marginLeft: '55%', position: 'absolute' }} color='#342B49' onPress={() => setPreview(false)} size={23} name='trash-outline' />
                            :
                            <Ionicon color='#342B49' name="add-circle-outline" onPress={() => {
                                ImagePicker.openPicker({
                                    height: 150,
                                    width: 150,
                                    includeBase64: true
                                }).then(image => {
                                    setPreviewPhoto(true)
                                    setPreviewMime(image.mime)
                                    setPreview(image.data)
                                    setImagePath(image.path)
                                })
                            }} style={{ marginTop: '50%', position: 'absolute', marginLeft: '55%' }} size={25} />}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '18%' }} >
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                preview ? uploadPhoto(imagePath, dispatch, refreshPhoto) : updatePhoto('', dispatch, refreshPhoto)
                                props.setModalVisible(false)
                            }}
                        >
                            <Text style={styles.textStyle}>Alterar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { marginLeft: 10 }]}
                            onPress={() => {
                                props.setModalVisible(!props.modalVisible)
                                props.setRefresh(!props.refresh)
                                setPreviewPhoto(false)
                            }}>
                            <Text style={styles.textStyle}>Sair</Text>
                        </Pressable>
                    </View>
                </View>
                : null}
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