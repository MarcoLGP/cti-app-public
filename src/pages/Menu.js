import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Block from '../layout/menu_block_layout'
import MenuLayout from '../layout/menu_layout'
import { setContextMenu, setInVenda } from '../redux/infoSlice'

export default function MenuPage(props) {

    const { barcode, registerBarcode, venda, id, nota, notaVendaDoc } = useSelector(state => state.clientId)
    const dispatch = useDispatch()

    function handlePage(route) {
        props.navigate(route)
        if (route == 'title12' || route == 'title1') dispatch(setContextMenu(route == 'title12' ? 'venda' : 'nota'))
        dispatch(setInVenda(true))
    }

    function handleCam(route) {
        dispatch(setContextMenu(route))
        props.setHideMenu(true)
        props.navigate('title5')
    }

    return (
        <MenuLayout title='Menu'>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Block name='cash-register' title='Venda' onPress={() => venda.length > 0 ? handlePage('title12') : handleCam('venda')} />
                    <Block name='text-box' title='Nota Fiscal' onPress={() => nota.length > 0 ? handlePage('title1') : handleCam('nota')} />
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <Block margin name='note-search' title='Localizar' subTitle='Venda / Nota' onPress={() => notaVendaDoc ? props.navigate('title9') : handleCam('vendaNota')} />
                    <Block margin name='clipboard-text-search' title='Ficha de' subTitle='Entrada' onPress={() => id ? props.navigate('title6') : handleCam('ficha')} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Block margin name='archive-search' title='Localizar' subTitle='Estoque' onPress={() => barcode ? props.navigate('title10') : handleCam('encontrarEstoque')} />
                    <Block margin name='archive-plus' title='Registrar' subTitle='Estoque' onPress={() => registerBarcode ? props.navigate('title14') : handleCam('registrarEstoque')} />
                </View>
            </View>
        </MenuLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '32.5%',
        alignSelf: "center",
        paddingRight: '3%',
        flex: 1,
        width: '100%',
        position: 'absolute'
    }
})