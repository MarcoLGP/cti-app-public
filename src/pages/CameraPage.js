import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { useDispatch, useSelector } from 'react-redux'
import cameraInfo from '../utils/cameraTratamento'

export default function CameraPage(props) {

    const dispatch = useDispatch()
    const [titulo, setTitulo] = React.useState('')
    const { contextMenu, onlyOne, user } = useSelector(state => state.clientId)

    React.useEffect(() => {
        if (contextMenu == 'ficha' || contextMenu == 'vendaNota') setTitulo('Aponte a câmera para o QR Code')
        else setTitulo('Aponte a câmera para o Barcode')
    }
    ,[contextMenu])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.fontMenus}>{titulo}</Text>
            </View>
            <RNCamera
                onBarCodeRead={({ data }) => cameraInfo(contextMenu, data, onlyOne, dispatch, props.navigate, props.setHideMenu, props.setOpenCamera, props.setOpenModalEstoque, user)}
                style={styles.cam}
            />
            <View style={styles.bottom}>
                <Text onPress={() => {
                    props.navigate('title13')
                    props.setHideMenu(false)
                    props.setOpenCamera(false)
                }} style={styles.fontMenus}>Voltar</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#342B49'
    },
    fontMenus: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Montserrat'
    },
    cam: {
        height: '78%'
    },
    bottom: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#342B49',
    }
})