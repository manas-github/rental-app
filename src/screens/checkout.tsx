import React from 'react';
import { StyleSheet,TextInput, View,ScrollView,Linking,SafeAreaView,Platform,Text,TouchableOpacity} from 'react-native';
import { observer } from "mobx-react"
import { observable } from 'mobx';
import CartFooter from './../components/cart/footer'
import {DEVICE_DIMENSIONS} from './../constant'


@observer
export default class Checkout extends React.Component {
   

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={styles.status}/>
                    <ScrollView>
                        <View>
                            <Text style={styles.inputTitle}>Name</Text>
                            <TextInput
                                style={styles.input}
                            />
                            <Text style={styles.inputTitle}>Email id</Text>
                            <TextInput
                                style={styles.input}
                            />
                            <Text style={styles.inputTitle}>Mobile Number</Text>
                            <TextInput
                                style={styles.input}
                                maxLength={10}
                            />
                            <Text style={[styles.inputTitle,{marginTop:24}]}>Full Address</Text>
                            <TextInput
                               multiline={true}
                               style={[styles.input,{height:120}]}
                            />
                            <Text style={styles.inputTitle}>Pincode</Text>
                            <TextInput
                                style={styles.input}
                                maxLength={6}
                            />
                            <Text style={styles.inputTitle}>City</Text>
                            <TextInput
                                style={styles.input}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <CartFooter/>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {    
        flex: 1,    
    },
    status : {
        height: Platform.OS === 'ios' ? 0 : 24,
    },
    input : {
        width : DEVICE_DIMENSIONS.width-55,
        height :32,
         padding:8,
        marginLeft:27.5,
        borderBottomWidth:0.8,
        borderBottomColor:'black',
        fontSize:14
    },
    inputTitle : {
        marginLeft:22.5,
        padding:8,
        color : '#B2ABAB',
        marginTop:8
    }

    
});
