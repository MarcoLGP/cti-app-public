import React from 'react'
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper'
import { getDbData } from '../firebase/firebase'

export default function ListaLayout(props) {

    const [search, setSearch] = React.useState()
    const [click, setClick] = React.useState()
    const inputRef = React.useRef()
    const [collection, setCollection] = React.useState([])

    React.useEffect(() => {
        getDbData(`${props.collection}`, setCollection)
    }, [])


    function onBlur() {
        setSearch('Fichas Ativas')
        setClick(false)
    }


    function Lista({ name, date, subtitle, img }) {


        return (
            <View style={{ marginRight: 20 }} >
                <View style={styles.lista} >
                    {img ? <Avatar.Image size={70} source={{ uri: img }} /> : <Avatar.Text size={70} label={'RC'} />}
                    <View style={{ alignSelf: 'center' }} >
                        <Text style={styles.listaNome} >{name}</Text>
                        <Text style={{ marginLeft: 10, color: 'green' }} >{subtitle}</Text>
                    </View>
                    <View style={styles.valorData} >
                        <Text style={styles.fontPreco} >R$ 10</Text>
                        <Text>{date ? date : '01/01/2022'}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row' }} >
                <MaterialIcon name='order-alphabetical-ascending' size={23} style={{ marginTop: '7%', marginLeft: '9%' }} />
                <TextInput onChangeText={(text) => setSearch(text)} onBlur={() => onBlur()} ref={inputRef} style={{ fontSize: 20, marginTop: 15, color: 'black', marginLeft: click ? '5%' : '18%' }} >{search ? search : click ? null : `${props.title}`}</TextInput>
                <Ionicon size={23} onPress={(e) => {
                    inputRef.current.focus()
                    setClick(true)
                    setSearch('')
                }} style={{ alignSelf: 'center', marginLeft: 'auto', marginTop: '3.5%' }} name='search' />
            </View>
            <FlatList
                data={collection.filter(item => search && click ? item.Nome.toLowerCase().includes(search.toLowerCase()) : item)}
                style={{ marginTop: 20 }}
                renderItem={({ item }) => <Lista name={item.props.name} date={item.props.date} subtitle={item.props.subtitle} img={item.props.img} />}
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
    lista: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 15
    },
    listaNome: {
        alignSelf: 'center',
        fontFamily: 'Lato-Bold',
        fontWeight: '600',
        fontSize: 20,
        color: 'black',
        marginLeft: 10,
    },
    valorData: {
        flexDirection: 'column',
        marginTop: 10,
        alignSelf: 'center',
        marginLeft: 'auto'
    },
})