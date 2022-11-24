import React from "react";
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar, TextInput } from "react-native-paper";
import { deleteDocument } from "../../firebase/firebase";

export default function ModalInfoVenda(props) {

  const [nome, setNome] = React.useState(props.dados.Produto ? props.dados.Produto : props.dados.Servico)
  const [err, setErr] = React.useState(false)
  const [edit, setEdit] = React.useState(true)
  const [valor, setValor] = React.useState(props.dados.Valor ? props.dados.Valor : 0)

  function handleRemoveVenda() {
    deleteDocument(props.dados.id, props.context)
    props.setModalVisible(false)
  }

  function validate() {
    if (!valor || !nome) setErr(true)
    else if (!Number(valor.replace(',', '.'))) setErr(true)
    else props.setModalVisible(false)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row' }}>
            {props.dados.Img ? <Avatar.Image source={{ uri: props.dados.Img }} size={110} /> : <Avatar.Text label={props.dados.Produto ? props.dados.Produto[0][0] : props.dados.Servico[0][0]} size={110} />}
            {!props.info ? <MaterialIcon size={22} onPress={() => setEdit(!edit)} name='cog' style={styles.cog} /> : null}
          </View>
          <TextInput style={[styles.input, { width: 290, marginTop: '5%' }]} error={err} disabled={edit} activeOutlineColor='#342B49' mode='outlined' value={nome} onChangeText={text => setNome(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='#342B49' name={props.dados.Produto ? 'package-variant-closed' : 'hammer-wrench'} />} placeholder={props.dados.Produto ? 'Produto' : 'Serviço'} />
          <TextInput style={[styles.input, { width: 120, marginTop: '2%' }]} activeOutlineColor='#342B49' mode='outlined' error={err} disabled={edit} value={valor} onChangeText={text => setValor(text)} outlineColor='#fff' theme={{ roundness: 20 }} left={<TextInput.Icon style={{ paddingTop: '15%' }} color='green' name='currency-brl' />} />
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={[styles.button, styles.buttonClose, { marginTop: '7%' }]}
              onPress={() => !props.info ? validate() : props.setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
            {!props.info ? <MaterialIcon size={23} onPress={() => handleRemoveVenda()} style={styles.trash} name='delete' /> : null}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  trash: {
    position: 'absolute',
    marginLeft: '60%',
    marginTop: '10%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  cog: {
    position: 'absolute',
    marginLeft: '75%'
  },
  input: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 45
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
  button: {
    borderRadius: 20,
    padding: 10,
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