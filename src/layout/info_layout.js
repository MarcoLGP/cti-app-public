import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function InfoLayout(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#342B49'
        },
        fontTop: {
            color: '#fff',
            fontSize: 27,
            fontFamily: 'Montserrat'
        },
        content: {
            height: '85%',
            backgroundColor: '#F6F6F6',
            alignItems: props.noAlign ? null : 'center',
            borderTopStartRadius: 50,
            borderTopEndRadius: 55,
            width: '90%',
            alignSelf: 'center'
        },
        top: {
            height: '17%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.fontTop}>{props.title}</Text>
            </View>
            <View style={styles.content}>
                {props.children}
            </View>
        </View>
    )

}