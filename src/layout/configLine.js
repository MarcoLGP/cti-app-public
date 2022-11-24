import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, StyleSheet, Text } from 'react-native'

export default function LineConfig(props) {

    return (
        <View onTouchStart={() => props.onPress()} style={styles.container}>
            <View style={{ borderRadius: 20, backgroundColor: '#EFEFEF', height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
                {props.material ? <MaterialIcon name={props.icon} size={props.size} color={'#342B49'} /> : <Ionicons name={props.icon} size={props.size} color={'#342B49'} />}
            </View>
            <Text style={[styles.font, { color: props.exit ? 'red' : 'black' }]}>{props.texto}</Text>
            <Ionicons style={{ marginLeft: 'auto', alignSelf: 'center' }} name='chevron-forward' size={25} color={'#342B49'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: '8%',
        width: '90%'
    },
    font: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
        marginLeft: '7%',
        alignSelf: 'center'
    },
})