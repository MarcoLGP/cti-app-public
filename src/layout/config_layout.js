import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { Avatar } from 'react-native-paper'
import { useSelector } from 'react-redux'

export default function ConfigLayout (props) {

    const { user } = useSelector(state => state.clientId)

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        menu: {
            height: '28%',
            backgroundColor: '#342B49',
            flexDirection: 'row'
        },
        title: {
            color: '#fff',
            fontSize: 35,
            marginLeft: props.menu ? '16%' : '14%',
            marginTop: '12%'
        },
        content: {
            height: '72%',
            alignSelf: 'center',
            borderRadius: 20,
            width: '80%',
            marginTop: '35%',
            position: 'absolute',
            backgroundColor: '#fff',
            alignItems: 'center'
        },
        subTitle: {
            fontSize: 18,
            marginLeft: '35%',
            height: 40,
            marginTop: '8%',
            position: 'absolute',
            width: '100%'
        },
        avatar: {
            marginLeft: props.menu ? '23%' : '21%',
            marginTop: '8%'
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <Text style={styles.title}>{props.title}</Text>
                {user ?
                    user.photoURL ? <Avatar.Image style={styles.avatar} source={{ uri: user.photoURL }} size={70} /> :
                        <Avatar.Text label={user.displayName[0][0]} size={70} style={[styles.avatar, { backgroundColor: '#EB2443' }]} />
                    : null}
            </View>
            <View style={{ height: '72%', backgroundColor: '#F6F6F6' }} />
            <View style={styles.content}>
                <Text style={styles.subTitle}>{props.subTitle}</Text>
                <View style={{ marginTop: '15%' }}>
                    {props.children}
                </View>
            </View>
        </View>
    )

}

