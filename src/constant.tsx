import React from 'react';
import {Text,View,StyleSheet,Dimensions} from 'react-native'
export const DEVICE_DIMENSIONS = {
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height
}

export class Toast extends React.Component <any,any> {
    render (){
        return(
            <View style={styles.toast}>
                <View>
                    <Text style={styles.toastText}>
                        {(this as any).props.message}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    toast : {
        position : 'absolute',
        bottom : 60,
        backgroundColor: 'black',
        paddingHorizontal:18,
        borderColor:'black',
        borderRadius : 17.5,
        overflow:'hidden',
        alignSelf:'center',
        paddingVertical:8,
        opacity:0.75
    },
    toastText : {
        color:'white',
        fontSize : 16,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'

    }


});
