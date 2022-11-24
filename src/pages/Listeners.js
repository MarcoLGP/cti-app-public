import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { setFicha, setNotaFiscal, setRemoveFicha, setRemoveNota, setRemoverVenda, setVenda } from '../redux/infoSlice'

export default function Listeners(props) {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.clientId)

    React.useEffect(() => {

        props.setLoading(false)
        const fichaRef = collection(db, 'Ficha')
        const notaAtivaRef = collection(db, `NotaAtiva-${user.uid}`)
        const vendaAtivaRef = collection(db, `VendaAtiva-${user.uid}`)

        onSnapshot(fichaRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setFicha({ idFicha: change.doc.id, ...change.doc.data() }))
            else if (change.type == 'removed') dispatch(setRemoveFicha(change.doc.id))
        }))

        onSnapshot(notaAtivaRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setNotaFiscal({ idNota: change.doc.id, ...change.doc.data() }))
            else if (change.type == 'removed') dispatch(setRemoveNota(change.doc.id))
        }))

        onSnapshot(vendaAtivaRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setVenda({ idVenda: change.doc.id, ...change.doc.data() }))
            else if (change.type == 'removed') dispatch(setRemoverVenda(change.doc.id))
        }))

    }, [])


    return (
        <React.Fragment />
    )

}