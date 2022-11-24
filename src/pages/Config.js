import React from 'react'
import LineConfig from '../layout/configLine'
import { logout, updatePass } from '../firebase/firebase'
import ModalNameReset from '../components/modals/modalNameReset'
import ModalEmailReset from '../components/modals/modalEmailReset'
import ModalSenhaReset from '../components/modals/modalSenhaReset'
import ModalChangePhoto from '../components/modals/modalChangePhoto'
import { useSelector } from 'react-redux'
import ConfigLayout from '../layout/config_layout'

export default function Config(props) {

    const [modalNameReset, setModalNameReset] = React.useState(false)
    const [modalEmailReset, setModalEmailReset] = React.useState(false)
    const [modalSenhaReset, setModalSenhaReset] = React.useState(false)
    const [modalChangePhoto, setModalChangePhoto] = React.useState(false)
    const [refresh, setRefresh] = React.useState(false)

    const { user } = useSelector(state => state.clientId)

    return (
        <ConfigLayout title='Ajustes' subTitle='Atualizar informações' >
            <ModalNameReset userName={user ? user.displayName : null} modalVisible={modalNameReset} setModalVisible={setModalNameReset} />
            <ModalEmailReset modalVisible={modalEmailReset} setModalVisible={setModalEmailReset} userName={user ? user.displayName : null} />
            <ModalSenhaReset modalVisible={modalSenhaReset} setModalVisible={setModalSenhaReset} userName={user ? user.displayName : null} />
            <ModalChangePhoto refresh={refresh} setRefresh={setRefresh} modalVisible={modalChangePhoto} setModalVisible={setModalChangePhoto} userName={user ? user.displayName : null} />
            <LineConfig icon='person' size={23} texto='Nome' onPress={() => setModalNameReset(true)} />
            <LineConfig icon='mail' size={23} texto='E-mail' onPress={() => setModalEmailReset(true)} />
            <LineConfig icon='key' size={23} texto='Senha' onPress={() => {
                setModalSenhaReset(true)
                updatePass()
            }} />
            <LineConfig icon='image' size={23} texto='Foto' onPress={() => setModalChangePhoto(true)} />
            <LineConfig icon='exit' size={23} texto='Sair' exit onPress={() => {
                props.navigate('title7')
                props.setHideMenu(true)
                logout()
            }} />
        </ConfigLayout>
    )
}