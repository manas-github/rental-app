import React from 'react';
import { StyleSheet,TextInput, View,ScrollView,TouchableOpacity,SafeAreaView,Platform,Text} from 'react-native';
import { observer } from "mobx-react"
import CartFooter from './../components/cart/footer'
import {DEVICE_DIMENSIONS} from './../constant'
import { observable } from 'mobx';
import { Api } from '../api/api';

@observer
export default class Checkout extends React.Component {
   
    @observable deliveryAddress= {name: "",mobile:"",address:"",pincode:"",city:""}
    @observable api = new Api()
    @observable confirmPressed = async () => {
        try {
            const res = await this.api.updateDeliveryAddress(this.deliveryAddress);
            if (res && res.data) {
                (this as any).props.navigation.navigate('PaymentScreen',{'totalDiscount':0,'amountPayable':(this as any).props.navigation.state.params.totalAmount})
            } 
        } catch (error) {

        }
    }
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
                                value={this.deliveryAddress.name}
                                onChangeText={(value) => this.deliveryAddress.name = value}
                            />
                            <Text style={styles.inputTitle}>Mobile Number</Text>
                            <TextInput
                                style={styles.input}
                                maxLength={10}
                                value={this.deliveryAddress.mobile}
                                onChangeText={(value) => this.deliveryAddress.mobile = value}
                            />
                            <Text style={[styles.inputTitle,{marginTop:24}]}>Full Address</Text>
                            <TextInput
                               multiline={true}
                               style={[styles.input,{height:120}]}
                               value={this.deliveryAddress.address}
                               onChangeText={(value) => this.deliveryAddress.address = value}
                            />
                            <Text style={styles.inputTitle}>Pincode</Text>
                            <TextInput
                                style={styles.input}
                                maxLength={6}
                                value={this.deliveryAddress.pincode}
                                onChangeText={(value) => this.deliveryAddress.pincode = value}
                            />
                            <Text style={styles.inputTitle}>City</Text>
                            <TextInput
                                style={styles.input}
                                value={this.deliveryAddress.city}
                                onChangeText={(value) => this.deliveryAddress.city = value}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>

                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'white', height: 60 }}>
                    <View style={{ flexDirection: 'row', flex: 1, borderWidth: 2, borderColor: '#E8E8E8', padding: 5 }}>
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <TouchableOpacity>
                                <Text style={{ margin: 5, height: 40, fontSize: 18, paddingTop: 6, backgroundColor: 'white', textAlign: 'center' }}>Price : &#8377; {(this as any).props.navigation.state.params.totalAmount}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'white', borderLeftColor: '#E8E8E8', borderLeftWidth: 2 }}>
                            <TouchableOpacity onPress={this.confirmPressed}>
                                <Text style={{ margin: 5, marginLeft: 10, height: 40, fontSize: 18, paddingTop: 6, backgroundColor: 'orange', textAlign: 'center' }}>CONFIRM</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
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
