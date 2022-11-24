import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Block(props) {

    return (
        <TouchableOpacity style={[styles.container, {marginTop: props.margin ? '7%' : null}]} onPress={props.onPress}>
            <MaterialIcon name={props.name} size={32} style={{ color: '#342B49' }} />
            <Text style={styles.font}>{props.title}</Text>
            {props.subTitle ? <Text style={{ color: 'gray', fontWeight: 'bold' }}>{props.subTitle}</Text> : null}
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    container: {
        height: 110,
        width: 110,
        marginLeft: '14.5%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    
    font: {
        color: 'gray',
        fontWeight: 'bold',
        marginRight: '1%'
    }

})