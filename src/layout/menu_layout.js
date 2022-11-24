import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function MenuLayout(props) {

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <Text style={styles.title}>Menu</Text>
            </View>
            <View style={{ height: '72%', backgroundColor: '#F6F6F6' }} />
            {props.children}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    menu: {
        height: '22%',
        backgroundColor: '#342B49',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        marginBottom: '5%',
        marginLeft: 10
    },
    title: {
        color: '#fff',
        marginBottom: '3%',
        fontSize: 30,
    },
    content: {
        height: '75%',
        backgroundColor: '#F6F6F6',
    },
    subTitle: {
        fontSize: 18,
        marginLeft: '30%',
        marginTop: '8%',
        position: 'absolute',
        width: '100%'
    },
})