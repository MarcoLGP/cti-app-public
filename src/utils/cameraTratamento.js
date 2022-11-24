import { findDocument, findProduct, registerProduct } from '../firebase/firebase'
import { setInVenda, setRegisterBarcode, setNotFound, setOnlyOne, setNotFoundEstoque, setProductDoc, setBarcode, setClientId, setNotaVendaDoc, setNotFoundDoc, setKeyboardListener, setNotFoundEncontrar } from '../redux/infoSlice'

export default function cameraInfo(contextMenu, data, onlyOne, dispatch, navigate, setHideMenu, setOpenCamera, setOpenModalEstoque, user) {

    if (contextMenu == 'venda') {
        navigate('title12')
        if (!onlyOne) findProduct(data, dispatch, `VendaAtiva-${user.uid}`, setNotFound)
        setHideMenu(false)
        dispatch(setInVenda(true))
        setOpenCamera(true)
        dispatch(setOnlyOne(true))
    } else if (contextMenu == 'nota') {
        navigate('title1')
        setOpenCamera(true)
        setHideMenu(false)
        dispatch(setOnlyOne(true))
        dispatch(setInVenda(true))
        if (!onlyOne) findProduct(data, dispatch, `NotaAtiva-${user.uid}`, setNotFoundEstoque)
    } else if (contextMenu == 'vendaNota') {
        navigate('title9')
        setOpenCamera(true)
        setHideMenu(false)
        findDocument(dispatch, setNotaVendaDoc, data, 'Registros', setNotFoundDoc)
    } else if (contextMenu == 'encontrarEstoque') {
        navigate('title10')
        setOpenCamera(true)
        dispatch(setBarcode(data))
        setHideMenu(false)
        findProduct(data, dispatch, false, setNotFoundEncontrar, setProductDoc)
    } else if (contextMenu == 'ficha') {
        findDocument(dispatch, setClientId, data, 'Ficha', setNotFoundDoc)
        navigate('title6')
        setOpenCamera(true)
        setHideMenu(false)
    } else if (contextMenu == 'registrarEstoque') {
        setOpenCamera(true)
        registerProduct(data, dispatch, navigate, setProductDoc, setRegisterBarcode, setOpenModalEstoque, setHideMenu)
    }

}