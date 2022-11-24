import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import RowInfo from "../../layout/rowInfo";

const ModalInfoEstoque = (props) => {

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
            {props.dados.img ? <Avatar.Image size={150} source={{ uri: props.dados.img }} /> : <Avatar.Text size={150} label={props.dados.nome[0][0]} />}
            <RowInfo icon='cube-outline' text={props.dados.nome} style={{ marginTop: '5%' }} />
            <RowInfo icon='google-circles-communities' text={props.dados.unidades} material />
            <View style={{ flexDirection: 'row', width: '45%', minWidth: '45%', maxWidth: '45%' }}>
              {props.dados.custo ? <RowInfo icon='logo-usd' text={`R$ ${props.dados.custo}`} styleText={{ color: 'red', width: '100%' }} styleIcon={{ color: 'red', marginLeft: '67%' }} /> : null}
              <RowInfo icon='logo-usd' text={`R$ ${props.dados.valor}`} styleText={{ color: 'green', width: '100%' }} styleIcon={{ color: 'green', marginLeft: '11.5%' }} />
            </View>
            <View style={styles.button} onTouchStart={() => props.setModalVisible(false)}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ok</Text>
            </View>
          </View>
        </View>
        : null
      }

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
    marginTop: '5%',
    backgroundColor: '#342B49',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35
  },
});

export default ModalInfoEstoque;