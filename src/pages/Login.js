import React from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import { TextInput, ActivityIndicator } from 'react-native-paper'
import { resetPass, tryLogin } from '../firebase/firebase'
import ModalPassReset from '../components/modals/modalPassReset'
import ModalHandleLogin from '../components/modals/modalHandleLogin'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/infoSlice'

export default function Login(props) {

    const [email, setEmail] = React.useState()
    const [pass, setPass] = React.useState()
    const [err, setErr] = React.useState(false)
    const [clickEye, setClickEye] = React.useState(false)
    const [modalVisiblePassReset, setModalVisiblePassReset] = React.useState(false)
    const [modalVisibleHandleLogin, setModalVisibleHandleLogin] = React.useState(false)
    const dispatch = useDispatch()
    const [helper, setHelper] = React.useState('')

    function validate() {
        if (!email || !pass) {
            setErr(true)
            setHelper('Campo(s) de email e/ou senha vazios !')
            setModalVisibleHandleLogin(true)
        }
        else if (!email.includes('@')) {
            setErr(true)
            setHelper('E-mail inválido.')
            setModalVisibleHandleLogin(true)
        }
        else {
            props.setLoading(true)
            tryLogin(email.trim(), pass, setErr, props.navigate, setHelper, setModalVisibleHandleLogin, props.setHideMenu, setPass, dispatch, setUser, props.setLoading, props.setIsLogin)
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.boxContent}>
                    <ModalPassReset modalVisible={modalVisiblePassReset} setModalVisible={setModalVisiblePassReset} email={email} />
                    <ModalHandleLogin modalVisible={modalVisibleHandleLogin} setLoading={props.setLoading} setModalVisible={setModalVisibleHandleLogin} helper={helper} />
                    <View style={styles.title}>
                        <Text style={[styles.fontTitle, { fontSize: 25 }]}>Bem vindo!</Text>
                        <Text style={[styles.fontTitle, { fontSize: 15 }]}>Preencha os dados abaixo</Text>
                    </View>
                    <TextInput style={styles.input} keyboardType='email-address' activeOutlineColor='#342B49' mode='outlined' error={err} value={email} onChangeText={text => setEmail(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='#342B49' name='at' />} placeholder='E-mail' />
                    <TextInput style={styles.input2} activeOutlineColor='#342B49' mode='outlined' error={err} value={pass} onChangeText={text => setPass(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} name={'lock'} color='#342B49' />} secureTextEntry={!clickEye} right={clickEye ? <TextInput.Icon onPress={() => setClickEye(!clickEye)} name="eye" style={{ paddingTop: '15%' }} color='#342B49' /> : <TextInput.Icon name="eye-off" onPress={() => setClickEye(!clickEye)} style={{ paddingTop: '15%' }} color='#342B49' />} placeholder='Senha' />
                    <Text onPress={() => {
                        setModalVisiblePassReset(!modalVisiblePassReset)
                        resetPass(email)
                    }} style={styles.passResetFont}>Esqueceu a senha?</Text>
                    <View style={styles.button}>
                        <Text onPress={() => validate()} style={styles.loginText}>Login</Text>
                    </View>
                    {props.loading ? <ActivityIndicator style={{ marginTop: '10%' }} /> : null}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    boxContent: {
        width: 310,
        alignSelf: "center",
        marginTop: "15%"
    },
    fontTitle: {
        fontFamily: 'Montserrat',
        color: '#342B49'
    },
    title: {
        marginTop: '30%',
        marginLeft: "2%"
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: '#fff',
        marginTop: '8%',
    },
    input2: {
        width: "100%",
        height: 50,
        backgroundColor: '#fff',
        marginTop: '5%',
    },
    passResetFont: {
        alignSelf: 'center',
        marginTop: '3%',
        fontWeight: '600',
        fontFamily: 'Montserrat',
        color: '#342B49'
    },
    button: {
        height: 50,
        width: "100%",
        backgroundColor: '#342B49',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '10%',
        borderRadius: 20
    },
    loginText: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Montserrat'
    }
})