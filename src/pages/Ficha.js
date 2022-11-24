import React from 'react'
import ListaFicha from '../components/ficha/lista_ficha'
import Layout from '../layout/page_layout'

export default function Ficha(props) {

    return (
        <Layout open={props.open} navigate={props.navigate} setHideMenu={props.setHideMenu}>
            <ListaFicha />
        </Layout>
    )

}