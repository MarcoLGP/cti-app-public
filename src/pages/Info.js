import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ActivityIndicator, Avatar } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import InfoLayout from '../layout/info_layout'
import { setClientId } from '../redux/infoSlice'
import { confirmFicha } from '../firebase/firebase'
import ModalConfirmDelete from '../components/modals/modalConfirmDelete'

export default function Info(props) {

    const [handleAddress, setHandleAddress] = React.useState(false)

    const dispatch = useDispatch()
    const { id, notFoundDoc } = useSelector(state => state.clientId)

    function handleConfirm(confirm) {
        if(confirm) confirmFicha(id, id.idFicha)
        dispatch(setClientId(null))
        props.navigate('title13')
        props.setOpenCamera(false)
    }

    return (
        <InfoLayout title='Ficha'>
            { notFoundDoc ? <ModalConfirmDelete modalVisible={notFoundDoc} setHideMenu={props.setHideMenu} navigate={props.navigate} /> : null }
            {id ? <Ionicon name="business" style={[styles.endereco, { display: id.Rua || id.Cidade || id.Bairro || id.Numero ? 'flex' : 'none' }]} size={25} onPress={() => setHandleAddress(!handleAddress)} /> : null}
            {id ? <View style={styles.container}>
                {id.Img ? <Avatar.Image source={{ uri: id.Img }} size={100} /> : <Avatar.Text label={id.Nome[0][0].toUpperCase()} size={100} />}
                {handleAddress ?
                    <React.Fragment>
                        <View style={styles.linha} >
                            <MaterialIcons name='city' size={30} />
                            <Text style={{ marginLeft: '2%', alignSelf: 'center' }} numberOfLines={1} >{id.Cidade ? id.Cidade : 'Não informado'}</Text>
                        </View>
                        <View style={styles.linha} >
                            <MaterialIcons name='home-group' size={30} />
                            <Text style={{ marginLeft: '2%', alignSelf: 'center' }} numberOfLines={1} >{id.Bairro ? id.Bairro : 'Não informado'}</Text>
                        </View>
                        <View style={styles.linha} >
                            <MaterialIcons name='road' size={30} />
                            <Text style={{ marginLeft: '2%', alignSelf: 'center' }} numberOfLines={1} >{id.Rua ? id.Rua : 'Não informado'}</Text>
                        </View>
                        <View style={styles.linha} >
                            <MaterialIcons name='numeric' size={30} />
                            <Text style={{ marginLeft: '2%', alignSelf: 'center' }} numberOfLines={1} >{id.Numero ? id.Numero : 'Não informado'}</Text>
                        </View>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <View style={styles.linha} >
                            <Ionicon name='person' size={25} />
                            <Text style={{ marginLeft: '2%', alignSelf: 'center' }} numberOfLines={1}>{id.Nome}</Text>
                        </View>
                        <View style={styles.linha}>
                            <Ionicon name='briefcase-outline' size={25} />
                            <Text style={{ marginLeft: '3%', alignSelf: 'center' }} numberOfLines={1}>{id.Equipamento}</Text>
                        </View>
                        <View style={styles.linha}>
                            <Ionicon name='construct-outline' size={26} />
                            <Text style={{ marginLeft: '3%', alignSelf: 'center' }} numberOfLines={1}>{id.Problema}</Text>
                        </View>
                        <View style={styles.linha}>
                            <Ionicon name='key-outline' size={30} />
                            <Text style={{ marginLeft: '2%', alignSelf: 'center' }} numberOfLines={1}>{id.Senha ? id.Senha : 'Não informado'}</Text>
                        </View>
                        <View style={styles.linha} >
                            <MaterialIcons name='at' size={30} />
                            <Text style={{ marginLeft: '2%', alignSelf: 'center' }} numberOfLines={1}>{id.Email ? id.Email : 'Não informado'}</Text>
                        </View>
                        <View style={styles.linha}>
                            <Ionicon name='call-outline' size={30} />
                            <Text style={{ marginLeft: '2%', alignSelf: 'center' }} numberOfLines={1}>{id.Telefone ? id.Telefone : 'Não informado'}</Text>
                        </View>
                    </React.Fragment>}
                <View style={styles.linhaConfirm}>
                    <MaterialIcons onPress={() => handleConfirm(true)} name='check' size={30} color={'green'} />
                    <MaterialIcons onPress={() => handleConfirm(false)} name='keyboard-return' size={30} color={'orange'} style={{ marginLeft: '35%' }} />
                </View>
            </View> :
                <ActivityIndicator style={{ marginTop: '65%' }} animating color='#342B49' />
            }
        </InfoLayout>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '3%',
    },
    linha: {
        flexDirection: 'row',
        marginRight: 'auto',
        minWidth: '100%',
        marginLeft: '5%',
        marginTop: '4%'
    },
    linhaConfirm: {
        flexDirection: 'row',
        marginTop: '8%'
    },
    botao: {
        height: 35,
        width: 100,
        marginTop: '5%',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#342B49',
    },
    endereco: {
        position: 'absolute',
        marginLeft: '75%',
        marginTop: '3%'
    }
})