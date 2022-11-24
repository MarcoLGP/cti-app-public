import React from 'react'
import { FlatList, View, StyleSheet, Text, Image } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import InfoLayout from '../layout/info_layout'
import { setInVenda, setOnlyOne } from '../redux/infoSlice'
import ModalInfoVenda from '../components/modals/modalInfoVenda'
import { addDocument, deleteDocument } from '../firebase/firebase'
import ModalNotFound from '../components/modals/modalNotFound'

export default function VendaPage(props) {

    const { venda, notFound, user } = useSelector(state => state.clientId)
    const [dados, setDados] = React.useState()
    const [total, setTotal] = React.useState()
    const [modalInfoOpen, setModalInfoOpen] = React.useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        let somaTotal = 0

        venda.forEach(venda => somaTotal += Number(venda.Valor))

        setTotal(somaTotal)

    }, [venda])

    function handleDone() {
        addDocument(`DoneVenda-${user.uid}`, {Done: true}, true)
        handleClose()
    }

    function handleOpenModal({ Produto, Valor, Img, idVenda }) {
        setDados({ Produto, Valor, Img, id: idVenda })
        setModalInfoOpen(true)
    }

    function handleClose(remove) {
        props.navigate('title13')
        props.setOpenCamera(true)
        dispatch(setInVenda(false))
        if (remove) venda.forEach(doc => deleteDocument(doc.idVenda, `VendaAtiva-${user.uid}`))
        dispatch(setOnlyOne(false))
    }

    function ListaVenda({ Produto, Valor, Img, idVenda }) {

        return (
            <View>
                <View style={styles.lista}>
                    {Img ? <Avatar.Image onTouchStart={() => handleOpenModal({ Produto, Valor, Img, idVenda })} source={{ uri: Img }} size={70} /> : <Avatar.Text onTouchStart={() => handleOpenModal({ Produto, Valor, Img, idVenda })} label={Produto ? Produto[0][0] : null} size={70} />}
                    <Text numberOfLines={2} style={styles.fontProduto}>{Produto}</Text>
                    <Text numberOfLines={1} style={styles.fontValor}>{`R$ ${Valor}`}</Text>
                </View>
            </View>
        )
    }

    return (
        <InfoLayout title='Venda' noAlign>
            {modalInfoOpen ? <ModalInfoVenda context={'VendaAtiva'} modalVisible={modalInfoOpen} dados={dados} setModalVisible={setModalInfoOpen} /> : null}
            {notFound ? <ModalNotFound open={notFound} setHideMenu={props.setHideMenu} setOpenCamera={props.setOpenCamera} navigate={props.navigate} /> : null}
            <Image resizeMode='center' source={require('../assets/shop-icon.png')} style={styles.image} />
            <FlatList
                data={venda}
                style={styles.listaContainer}
                renderItem={({ item }) => ListaVenda(item)}
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.lineConfirm}>
                    <MaterialIcon name='check' size={30} color='green' onPress={() => handleDone()} />
                    <MaterialIcon onPress={() => handleClose(true)} name='close' size={30} color='red' style={{ marginLeft: '25%' }} />
                </View>
                <View style={styles.total}>
                    <Text style={styles.fontTotal}>{`R$ ${total}`}</Text>
                </View>
            </View>
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
        marginTop: '3%'
    },
    total: {
        marginLeft: 'auto',
        marginTop: '3%',
        marginRight: '2%',
        minWidth: '35%'
    },
    fontTotal: {
        color: 'green',
        alignSelf: 'center',
        fontSize: 20,
    }
})