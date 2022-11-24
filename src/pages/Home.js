import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'

export default function Home(props) {

    return (
            <View style={styles.container}>
                 <ImageBackground resizeMode='cover' style={{flex: 1, justifyContent: 'center'}} source={{uri: 'https://cdn.pixabay.com/photo/2021/01/05/06/41/forest-5889923_960_720.png'}}>
                <View onTouchEnd={() => props.navigate('title8')} style={styles.botao}>
                    <Text style={styles.fontBotao}>Entrar</Text>
                </View>
                </ImageBackground>
            </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    botao: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        height: 60,
        borderRadius: 15,
        marginTop: '130%'
    },
    fontBotao: {
        color: '#342B49',
        alignSelf: 'center',
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 17
    }
})