import React from 'react'
import { View, StyleSheet, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import { ActivityIndicator, Avatar, TextInput } from 'react-native-paper'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InfoLayout from '../layout/info_layout'
import { setBarcode, setProductDoc } from '../redux/infoSlice'
import { updateEstoque } from '../firebase/firebase'
import ModalNotFoundEncontrar from '../components/modals/modalNotFoundEncontrar'

export default function InfoEstoque(props) {

    const { productDoc, notFoundEncontrar } = useSelector(state => state.clientId)
    const [Produto, setProduto] = React.useState()
    const [Valor, setValor] = React.useState()
    const [Custo, setCusto] = React.useState()
    const [Unidades, setUnidades] = React.useState()
    const [change, setChange] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        setProduto(productDoc ? productDoc.Produto : '')
        setValor(productDoc ? productDoc.Valor : '')
        setCusto(productDoc ? productDoc.Custo : '')
        setUnidades(productDoc ? productDoc.Unidades : '')
    }, [productDoc])

    function exit() {
        props.navigate('title13')
        dispatch(setBarcode(null))
        dispatch(setProductDoc(null))
        props.setOpenCamera(false)
    }

    function validate() {
        if (change) {
            if (!Produto || !Valor || !Custo || !Unidades) setErr(true)
            else if (!Number(Valor.replace(',', '.')) || !Number(Custo.replace(',', '.')) || !Number(Unidades.replace(',', '.'))) setErr(true)
            else if (Produto !== productDoc.Produto || Valor !== productDoc.Valor || Custo !== productDoc.Custo || Unidades !== productDoc.Unidades) {
                updateEstoque(productDoc.idProduto, { Produto, Valor, Custo, Unidades, Codigo: productDoc.Codigo })
                exit()
            } else exit()
        } else exit()
    }

    return (
        <InfoLayout title={productDoc ? 'Produto' : 'Localizando'}>
            <ModalNotFoundEncontrar open={notFoundEncontrar} navigate={props.navigate} />
            <KeyboardAvoidingView>
                <ScrollView>
                    {productDoc ?
                        <React.Fragment>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                {productDoc.Img ? <Avatar.Image style={styles.avatar} source={{ uri: productDoc.Img }} size={120} /> : <Avatar.Text style={styles.avatar} label={productDoc.Produto[0][0]} size={120} />}
                                <Ionicon style={styles.settIcon} onPress={() => setChange(!change)} name='cog-outline' size={23} />
                            </View>
                            <TextInput style={[styles.input, { width: 290 }]} disabled={!change} activeOutlineColor='#342B49' mode='outlined' error={err} value={Produto} onChangeText={text => setProduto(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='#342B49' name='package-variant-closed' />} placeholder='Produto' />
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TextInput style={[styles.input, { width: 120 }]} disabled={!change} activeOutlineColor='#342B49' mode='outlined' error={err} value={Valor} onChangeText={text => setValor(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='green' name='cash' />} placeholder='Valor' />
                                <TextInput style={[styles.input, { width: 120, marginLeft: 10 }]} disabled={!change} activeOutlineColor='#342B49' mode='outlined' error={err} value={Custo} onChangeText={text => setCusto(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='red' name='cash' />} placeholder='Custo' />
                            </View>
                            <TextInput disabled={!change} style={[styles.input, { width: 202 }]} mode='outlined' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='#342B49' name='barcode' />} value={productDoc.Codigo} />
                            <TextInput style={[styles.input, { width: 130 }]} disabled={!change} activeOutlineColor='#342B49' mode='outlined' error={err} value={Unidades} onChangeText={text => setUnidades(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='#342B49' name='google-circles-communities' />} placeholder='Unidades' />
                            <View style={{ marginTop: '5%', alignSelf: 'center', flexDirection: 'row' }}>
                                <MaterialIcons color={'green'} size={27} onPress={() => validate()} name='check' />
                                {change ? <MaterialIcons color={'red'} size={27} onPress={() => exit()} style={{marginLeft: 180}} name='close' /> : null }
                            </View>
                        </React.Fragment>
                        :
                        <ActivityIndicator size={20} style={{ marginTop: 200 }} />
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </InfoLayout>
    )

}

const styles = StyleSheet.create({
    icon: {
        marginLeft: '5%',
        marginTop: '7%'
    },
    fontTop: {
        color: '#fff',
        fontSize: 27,
        fontFamily: 'Montserrat'
    },
    settIcon: {
        position: 'absolute',
        marginLeft: '50%',
        marginTop: '3%'
    },
    avatar: {
        marginTop: '4%'
    },
    top: {
        height: '17%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    linhaConfirm: {
        flexDirection: 'row',
        marginTop: '12%',
        alignSelf: 'center'
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        marginTop: '3%',
        alignSelf: 'center'
    },
    img: {
        height: 100,
        marginTop: '20%',
        width: 100
    },
})