import React from 'react'
import { FlatList, View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import InfoLayout from '../layout/info_layout'
import ModalInfoVenda from '../components/modals/modalInfoVenda'
import { setNotaVendaDoc } from '../redux/infoSlice'
import ModalConfirmDelete from '../components/modals/modalConfirmDelete'

export default function VendaNotaInfo(props) {

    const [dados, setDados] = React.useState()
    const { notFoundDoc, notaVendaDoc } = useSelector(state => state.clientId)
    const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false)
    const [modalInfoOpen, setModalInfoOpen] = React.useState(false)
    const dispatch = useDispatch()

    function handleOpenModal({ Produto, Servico, Valor, Img }) {
        setDados({ Produto, Servico, Valor, Img })
        setModalInfoOpen(true)
    }

    function handleClose() {
        props.navigate('title13')
        dispatch(setNotaVendaDoc(null))
        props.setOpenCamera(false)
    }

    function ListaVenda({ Produto, Servico, Valor, Img }) {

        return (
            <TouchableOpacity onPress={() => handleOpenModal({ Produto, Servico, Valor, Img })}>
                <View style={styles.lista}>
                    {Img ? <Avatar.Image source={{ uri: Img }} size={70} /> : <Avatar.Text label={Produto ? Produto[0][0] : Servico[0][0]} size={70} />}
                    <Text numberOfLines={2} style={styles.fontProduto}>{Produto ? Produto : Servico}</Text>
                    <Text numberOfLines={1} style={styles.fontValor}>{`R$ ${Valor}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <InfoLayout title={notaVendaDoc ? notaVendaDoc.tipo == 'Nota' ? 'Nota Fiscal' : 'Venda' : 'Analizando...'} noAlign>
            {modalInfoOpen ? <ModalInfoVenda info modalVisible={modalInfoOpen} dados={dados} setModalVisible={setModalInfoOpen} /> : null}
            {openConfirmDelete || notFoundDoc ? <ModalConfirmDelete modalVisible={openConfirmDelete} setModalVisible={setOpenConfirmDelete} /> : null}
            <Image resizeMode='center' source={require('../assets/shop-icon.png')} style={styles.image} />
            {notaVendaDoc ?
                <React.Fragment>
                    <FlatList
                        data={notaVendaDoc.Nota ? notaVendaDoc.Nota : notaVendaDoc.Venda}
                        style={styles.listaContainer}
                        renderItem={({ item }) => ListaVenda(item)} /><View style={{ flexDirection: 'row' }}>
                        <View style={styles.lineConfirm}>
                            <MaterialIcon name='check' size={30} color='green' onPress={() => handleClose()} />
                            <MaterialIcon onPress={() => setOpenConfirmDelete(true)} name='close' size={30} color='red' style={{ marginLeft: '25%' }} />
                        </View>
                        <View style={styles.total}>
                            <Text style={styles.fontTotal}>{`R$ ${notaVendaDoc.total}`}</Text>
                        </View>
                    </View>
                </React.Fragment> :
                <ActivityIndicator style={{ marginTop: '30%' }} color='#342B49' size={30} />}
        </InfoLayout>
    )
}

const styles = StyleSheet.create({
    lista: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '3%'
    },
    listaContainer: {
        marginTop: '2%',
        marginLeft: '5%',
        maxHeight: '53%',
        marginRight: '5%'
    },
    fontProduto: {
        marginLeft: '3%',
        maxWidth: '43%'
    },
    fontValor: {
        marginLeft: 'auto',
        color: 'green',
        maxWidth: '25%'
    },
    image: {
        height: 100,
        width: 100,
        marginTop: '3%',
        alignSelf: 'center'
    },
    lineConfirm: {
        flexDirection: 'row',
        marginLeft: '4%',
        marginTop: '1%'
    },
    total: {
        marginLeft: 'auto',
        marginTop: '1%',
        marginRight: '2%',
        minWidth: '35%'
    },
    fontTotal: {
        color: 'green',
        alignSelf: 'center',
        fontSize: 20,
    }
})