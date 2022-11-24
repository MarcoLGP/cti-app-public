import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'
import RowInfo from '../../layout/rowInfo'
import { Avatar } from 'react-native-paper'

const ModalInfoFicha = (props) => {

  const [address, setAddress] = React.useState()
  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={styles.centeredView}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      {props.dados ?
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row' }}>
              <Avatar.Text size={150} label={props.dados.Nome[0][0].toUpperCase()} />
              <Ionicon onPress={() => setAddress(!address)} style={{ position: 'absolute', marginLeft: '60%', display: props.dados.Cidade || props.dados.Bairro || props.dados.Rua || props.dados.Numero ? 'flex' : 'none' }} name="business" size={20} />
            </View>
            {!address ?
              <React.Fragment>
                <RowInfo icon='person' text={props.dados.Nome} style={{ marginTop: '5%' }} />
                <RowInfo icon='briefcase-outline' text={props.dados.Equipamento} />
                <RowInfo icon='at' text={props.dados.Email} material />
                <RowInfo icon='call-outline' text={props.dados.Telefone} />
                <RowInfo icon='construct-outline' text={props.dados.Problema} />
                <RowInfo icon='key-outline' text={props.dados.Senha} trash />
              </React.Fragment>
              :
              <React.Fragment>
                <RowInfo icon='city-variant' text={props.dados.Cidade} material style={{ marginTop: '5%' }} />
                <RowInfo icon='home-group' text={props.dados.Bairro} material />
                <RowInfo icon='road' text={props.dados.Rua} material />
                <RowInfo icon='numeric' text={props.dados.Numero} material trash />
              </React.Fragment>
            }
            <View style={styles.button} onTouchStart={() => props.setModalVisible(false)} >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ok</Text>
            </View>
          </View>
        </View>
        : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
    borderRadius: 40,
    marginTop: '4%',
    backgroundColor: '#342B49',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35
  },
});

export default ModalInfoFicha;