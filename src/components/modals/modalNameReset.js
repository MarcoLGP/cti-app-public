import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'
import { useDispatch } from "react-redux";
import { updateName } from "../../firebase/firebase";
import { refreshName } from "../../redux/infoSlice";

export default function ModalNameReset(props) {

  const [nome, setNome] = React.useState()
  const [helper, setHelper] = React.useState('')
  const dispatch = useDispatch()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Não se preocupe <Text style={{ color: '#342B49', fontWeight: 'bold' }}>{props.userName}</Text>, vamos alterar o seu nome.</Text>
          <TextInput style={styles.input} placeholder={props.userName} activeOutlineColor='#342B49' mode='outlined' value={nome} onChangeText={text => setNome(text)} left={<TextInput.Icon name='account-arrow-right' color='#342B49' />} outlineColor='#fff' theme={{ roundness: 20 }} />
          <HelperText visible={helper} style={{color: 'red'}}>
            {helper}
          </HelperText>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                if (!nome) setHelper('Digite um nome para alterarmos')
                else if (!nome.includes(' ')) setHelper('Sobrenome obrigatório')
                else {
                  updateName(nome)
                  props.setModalVisible(false)
                  dispatch(refreshName(nome))
                  setHelper('')
                  setNome('')
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