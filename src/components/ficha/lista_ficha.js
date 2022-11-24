import React from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import ModalInfoFicha from '../modals/modalInfoFicha'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper'
import { useSelector } from 'react-redux'

export default function ListaFicha() {

    const [search, setSearch] = React.useState()
    const [click, setClick] = React.useState()
    const [modalVisible, setModalVisible] = React.useState(false)
    const [dados, setDados] = React.useState()
    const inputRef = React.useRef()

    const { ficha } = useSelector(state => state.clientId)

    function handleOpenModal( Nome, Problema, Equipamento, Email, Telefone, Senha, Data, Bairro, Cidade, Rua, Numero ) {
        setDados({ Nome, Problema, Equipamento, Email, Telefone, Senha, Data, Bairro, Cidade, Rua, Numero })
        setModalVisible(true)
    }

    function onBlur() {
        if (!search) setClick(false)
    }

    function Lista({ Nome, Problema, Equipamento, Email, Telefone, Senha, Data, Bairro, Cidade, Rua, Numero }) {

        return (
            <TouchableOpacity onPress={() => handleOpenModal(Nome, Problema, Equipamento, Email, Telefone, Senha, Data, Bairro, Cidade, Rua, Numero)} style={{ marginRight: 20 }} >
                <View style={styles.lista}>
                    <Avatar.Text size={62} label={Nome ? Nome[0][0].toUpperCase() : ''} />
                    <View style={{ alignSelf: 'center', marginLeft: '3%' }} >
                        <Text style={styles.listaNome} numberOfLines={1} >{Nome}</Text>
                        <Text style={{ color: 'green' }}>Aberta</Text>
                    </View>
                    <View style={styles.valorData} >
                        <Text style={styles.data}>{Data}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row' }} >
                <ModalInfoFicha modalVisible={modalVisible} setModalVisible={setModalVisible} dados={dados} />
                <MaterialIcon name='order-alphabetical-ascending' size={23} style={{ marginTop: '7%', marginLeft: '10%' }} />
                {click ? <TextInput autoFocus onChangeText={(text) => setSearch(text)} value={search} onBlur={() => onBlur()} ref={inputRef} style={{ maxWidth: 220, fontSize: 20, marginTop: '2.8%', color: 'black', marginLeft: click ? '5%' : '9%' }} /> : <Text style={styles.title}>Fichas em Aberto</Text>}
                <Ionicon size={23} onPress={(e) => {
                    click ? inputRef.current.focus() : null
                    setClick(true)
                }} style={{ alignSelf: 'center', marginLeft: 'auto', marginTop: click ? '3%' : '7%' }} name='search' />
                <View style={{ width: 27 }} />
            </View>
            <FlatList
                style={[styles.listaContainer, {marginTop: click ? null : '3%' }]}
                ListFooterComponent={<View style={{ height: 20 }} />}
                data={ficha.filter(item => search && click ? item.Nome.toLowerCase().includes(search.toLowerCase()) : item)}
                renderItem={({ item }) => Lista(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fontPreco: {
        marginLeft: 'auto',
        color: 'green',
        fontFamily: 'Lato-Bold',
        fontWeight: '600'
    },
    listaContainer: { 
        maxWidth: 350, 
        maxHeight: '72%',
        minHeight: '72%'
    },
    title: {
        fontSize: 19,
        width: "68%",
        textAlign: "center",
        marginTop: '6%',
        color: 'black'
    },
    lista: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 15
    },
    listaNome: {
        alignSelf: 'center',
        maxWidth: '77%', 
        minWidth: '77%',
        marginRight: 'auto',
        overflow: 'hidden',
        fontFamily: 'Lato-Bold',
        fontWeight: '600',
        fontSize: 17,
        color: 'black',
    },
    valorData: {
        alignSelf: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginBottom: '1%'
    },
    data: { 
        alignSelf: 'center', 
        fontSize: 12, 
        marginLeft: 'auto', 
        width: '100%' 
    }
})