import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"

interface props {
    navigation: any;
    screen: any;
    amount: any;
}
@observer
export default class Footer extends React.Component<props, any> {
    constructor(props: any) {
        super(props);
    }


    render() {
        return (
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'white', height: 60 }}>
                <View style={{ flexDirection: 'row', flex: 1, borderWidth: 2, borderColor: '#E8E8E8', padding: 5 }}>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <TouchableOpacity>
                            <Text style={{ margin: 5, height: 40, fontSize: 18, paddingTop: 6, backgroundColor: 'white', textAlign: 'center' }}>Price : &#8377; {(this as any).props.amount}</Text>
                        </TouchableOpacity>
                    </View>
                    {(this as any).props.screen === 'cart' ?
                        <View style={{ flex: 1, backgroundColor: 'white', borderLeftColor: '#E8E8E8', borderLeftWidth: 2 }}>
                            <TouchableOpacity onPress={() => (this as any).props.navigation.navigate('CheckoutScreen')}>
                                <Text style={{ margin: 5, marginLeft: 10, height: 40, fontSize: 18, paddingTop: 6, backgroundColor: 'orange', textAlign: 'center' }}>CONTINUE</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={{ flex: 1, backgroundColor: 'white', borderLeftColor: '#E8E8E8', borderLeftWidth: 2 }}>
                            <TouchableOpacity onPress={() => (this as any).props.navigation.navigate('PaymentScreen')}>
                                <Text style={{ margin: 5, marginLeft: 10, height: 40, fontSize: 18, paddingTop: 6, backgroundColor: 'orange', textAlign: 'center' }}>CONFIRM</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 800
    },

});




