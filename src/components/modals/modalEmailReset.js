import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'
import { updateUserEmail } from "../../firebase/firebase";

export default function ModalEmailReset(props) {

  const [email, setEmail] = React.useState()
  const [email2, setEmail2] = React.useState()
  const [helper, setHelper] = React.useState('')

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}><Text style={{ fontWeight: 'bold', color: '#342B49' }}>{props.userName}</Text>, insira e confirme o seu novo e-mail abaixo.</Text>
          <TextInput style={styles.input} label='Novo e-mail' activeOutlineColor='#342B49' mode='outlined' value={email} onChangeText={text => setEmail(text)} left={<TextInput.Icon name='email-plus' color='#342B49' />} outlineColor='#fff' theme={{ roundness: 20 }} />
          <HelperText visible={helper} style={{ color: 'red' }}>
            {helper}
          </HelperText>
          <TextInput style={styles.input} label='Confirmar novo e-mail' activeOutlineColor='#342B49' mode='outlined' value={email2} onChangeText={text => setEmail2(text)} left={<TextInput.Icon name='email-check' color='#342B49' />} outlineColor='#fff' theme={{ roundness: 20 }} />
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                if (!email) setHelper('Digite um e-mail para alterarmos')
                else if (!email.includes('@')) setHelper('E-mail invalido')
                else if (email !== email2) setHelper('Emails nao correspondentes')
                else {
                  updateUserEmail(email)
                  props.setModalVisible(false)
                  setHelper('')
                  setEmail('')
                }
              }}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose, { marginLeft: 10 }]}
              onPress={() => {
                props.setModalVisible(!props.modalVisible)
                setHelper('')
                setEmail('')
                setEmail2('')
              }}
            >
              <Text style={styles.textStyle}>Sair</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: '#fff',
    marginTop: '5%',
    alignSelf: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#342B49",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})