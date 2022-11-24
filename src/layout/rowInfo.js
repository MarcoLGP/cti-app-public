import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function RowInfo(props) {

    return (
        <View style={[styles.row, props.style]}>
            {!props.material ? <Ionicon style={[{ alignSelf: 'center' }, props.styleIcon]} size={23} name={props.icon} /> : <MaterialIcon name={props.icon} size={props.sizeIcon ? props.sizeIcon : 23} style={[{ alignSelf: 'center' }, props.styleIcon]} /> }
            <Text style={[styles.font, props.styleText]} numberOfLines={1}>{props.text ? props.text : 'Não informado'}</Text>
            {props.trash ? <Ionicon name='trash-outline' size={21} style={{marginLeft: 'auto'}} /> : null}
        </View>
    )

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        minWidth: '85%',
        maxWidth: '85%',
        marginBottom: '4%',
        marginRight: 'auto'
    },
    font: {
        alignSelf: 'center',
        marginLeft: '2%'
    }
})