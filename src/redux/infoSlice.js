import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'clientId',
  initialState: {
    id: null,
    user: null,
    ficha: [],
    nota: [],
    contextMenu: '',
    notFoundDoc: false,
    notaVendaDoc: null,
    keyboardListener: false,
    notFoundEncontrar: false,
    notFound: false,
    registerDoc: null,
    registerBarcode: null,
    onlyOne: false,
    inVenda: false,
    productDoc: null,
    barcode: null,
    notFoundEstoque: false,
    venda: []
  },
  reducers: {
    setClientId(state, { payload }) {
      state.id = payload
    },
    setNotFoundEncontrar(state, {payload}) {
      state.notFoundEncontrar = payload
    },
    setKeyboardListener(state, {payload}) {
      state.keyboardListener = payload
    },
    setNotFoundDoc(state, {payload}) {
      state.notFoundDoc = payload
    },
    setNotaVendaDoc(state, {payload}) {
      state.notaVendaDoc = payload
    },
    setFicha(state, {payload}) {
      state.ficha.unshift(payload)
    },
    setRemoveFicha(state, {payload}) {
      const newFicha = state.ficha.filter(fichas => fichas.idFicha !== payload)
      state.ficha = newFicha
    },
    setNotFoundEstoque(state, { payload }) {
      state.notFoundEstoque = payload
    },
    setInVenda(state, { payload }) {
      state.inVenda = payload
    },
    setUser(state, { payload }) {
      state.user = payload
    },
    refreshName(state, { payload }) {
      state.user.displayName = payload
    },
    setContextMenu(state, {payload}) {
      state.contextMenu = payload
    },
    refreshPhoto(state, { payload }) {
      state.user.photoURL = payload
    },
    setNotFound(state, { payload }) {
      state.notFound = payload
    },
    setOnlyOne(state, { payload }) {
      state.onlyOne = payload
    },
    setRegisterDoc(state, { payload }) {
      state.registerDoc = payload
    },
    setProductDoc(state, { payload }) {
      state.productDoc = payload
    },
    setBarcode(state, { payload }) {
      state.barcode = payload
    },
    setNotaFiscal(state, {payload}) {
      state.nota.unshift(payload)
    },
    setRemoveNota(state, {payload}){
      const newFicha = state.nota.filter(doc => doc.idNota !== payload)
      state.nota = newFicha
    },
    setRegisterBarcode(state, { payload }) {
      state.registerBarcode = payload
    },
    setVenda(state, { payload }) {
      state.venda.unshift(payload)
    },
    setRemoverVenda(state, { payload }) {
      const newVenda = state.venda.filter(docs => docs.idVenda !== payload)
      state.venda = newVenda
    }
  },
})

export const { setClientId, setNotFoundEncontrar, setKeyboardListener, setNotaVendaDoc, setNotFoundDoc, setContextMenu, setNotaFiscal, setFicha, setRemoveNota, setRemoveFicha, setRemoverVenda, setUser, setInVenda, setRegisterBarcode, setRegisterDoc, refreshName, refreshPhoto, setMessage, setNotFound, setNotFoundEstoque, setModalVisible, setOnlyOne, setNavigate, setProductDoc, setBarcode, setVenda } = counterSlice.actions
export default counterSlice.reducer