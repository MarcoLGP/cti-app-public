import React from 'react'
import InfoLayout from '../layout/info_layout'
import { StyleSheet, Image, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Avatar, TextInput } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { setRegisterBarcode } from '../redux/infoSlice'
import { addDocument } from '../firebase/firebase'
import adicionarImg from '../assets/adicionar-produto.png'
import ModalRegistrarDesktop from '../components/modals/modalRegistrarDesktop'
import ImageCropPicker from 'react-native-image-crop-picker'
import tratamentoNome from '../utils/tratamentoNome'

export default function InfoRegistrarEstoque(props) {

    const { registerBarcode } = useSelector(state => state.clientId)
    const [err, setErr] = React.useState(false)
    const [Img, setImg] = React.useState('')
    const [Produto, setProduto] = React.useState()
    const [Custo, setCusto] = React.useState()
    const [Valor, setValor] = React.useState()
    const [previewMime, setPreviewMime] = React.useState('')

    const dispatch = useDispatch()

    const Validate = () => {
        if (!Produto || !Valor || !Custo) {
            setErr(true)
        } else if (!Number(Valor.replace(',', '.')) || !Number(Custo.replace(',', '.'))) {
            setErr(true)
        } else {
            addDocument('Estoque', { Produto: tratamentoNome(Produto), Valor, Custo, Codigo: registerBarcode, Img })
            setProduto(null)
            props.navigate('title13')
            setValor(null)
            setCusto(null)
            dispatch(setRegisterBarcode(null))
        }
    }

    const handlePressImage = () => ImageCropPicker.openPicker({
        height: 150,
        width: 150,
        includeBase64: true
    }).then(image => {
        setPreviewMime(image.mime)
        setImg(image.data)
        setImagePath(image.path)
    })

    return (
        <InfoLayout title='Registrar Produto'>
            <ModalRegistrarDesktop modalVisible={props.openModalEstoque} setModalVisible={props.setOpenModalEstoque} navigate={props.navigate} />
            <KeyboardAvoidingView>
                <ScrollView>
                    {Img ?
                        <Avatar.Image size={150} style={{ marginTop: '5%', marginBottom: '3%', alignSelf: 'center' }} source={{ uri: `data:${previewMime};base64,${Img}` }} />
                        : <TouchableOpacity onPress={() => handlePressImage()}>
                            <Image style={styles.img} resizeMode='center' source={adicionarImg} />
                        </TouchableOpacity>}
                    {Img ? <Ionicon style={{ marginTop: '45%', marginLeft: '62%', position: 'absolute' }} color='#342B49' onPress={() => setImg('')} size={23} name='trash-outline' />
                        : null}
                    <TextInput style={[styles.input, { width: 290 }]} activeOutlineColor='#342B49' mode='outlined' error={err} value={Produto} onChangeText={text => setProduto(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='#342B49' name='package-variant-closed' />} placeholder='Produto' />
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <TextInput style={[styles.input, { width: 100 }]} activeOutlineColor='#342B49' mode='outlined' error={err} value={Valor} onChangeText={text => setValor(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='green' name='cash' />} placeholder='Valor' />
                        <TextInput style={[styles.input, { width: 100, marginLeft: '10%' }]} activeOutlineColor='#342B49' mode='outlined' error={err} value={Custo} onChangeText={text => setCusto(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='red' name='currency-usd' />} placeholder='Custo' />
                    </View>
                    <TextInput disabled style={[styles.input, { width: 202 }]} mode='outlined' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='#342B49' name='barcode' />} value={registerBarcode} />
                    <View style={[styles.linhaConfirm, { marginTop: Img ? '5%' : '10%' }]}>
                        <MaterialIcons onPress={() => Validate()} name='check' size={30} color={'green'} style={{ marginRight: '30%' }} />
                        <MaterialIcons onPress={() => {
                            props.navigate('title13')
                            dispatch(setRegisterBarcode(null))
                            props.setOpenCamera(false)
                        }} name='close' size={30} color={'red'} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </InfoLayout>
    )

}

const styles = StyleSheet.create({
    img: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginTop: '5%',
        marginBottom: '3%'
    },
    input: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        height: 45
    },
    linhaConfirm: {
        flexDirection: 'row',
        alignSelf: 'center'
    }
})