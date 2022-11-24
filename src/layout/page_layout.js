import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

export default function Layout(props) {

    return (
        <View style={styles.container} >
                <View>
                    <View style={styles.menu}>
                       <Text style={styles.textoMenu}>Fichas de Entrada</Text>
                    </View>
                    <View style={styles.content}>
                        {props.children}
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#342B49',
        flex: 1
    },
    menu: {
        height: 140,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        minHeight: Dimensions.get('screen').height,
        minWidth: '89%',
        maxWidth: '89%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopStartRadius: 50,
        borderTopEndRadius: 55
    },
    textoMenu: {
        color: '#fff',
        fontSize: 27,
        fontFamily: 'Montserrat'
    },
})