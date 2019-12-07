import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import {} from "../constant";
import { Api } from '../api/api';

@observer
export default class Payment extends React.Component<any, any> {

    @observable api = new Api()
    @observable viewPaymentSummary : Boolean = false;
    @observable discount = 0
    @observable amountPayable = 0;
    @observable total = 0

    componentDidMount = async () => {
        this.discount = (this as any).props.navigation.state.params.totalDiscount
        this.amountPayable = (this as any).props.navigation.state.params.amountPayable
        this.total = this.discount + this.amountPayable;

    }
 
    toggleViewPaymentSummary = () => {
        this.viewPaymentSummary = !this.viewPaymentSummary
    }

    processCodPayment = async () => {
        let payload = {
    
                "amountPaid": 0,
                "discount": this.discount,
                "totalAmount": this.total,
                "amountDue" : this.amountPayable,
                "paymentMode" : "COD"
        }
        try {
            const res = await this.api.createOrder(payload);
            if (res && res.data) {
                (this as any).props.navigation.navigate('OrderConfirmationScreen',{"orderId":res.data,"status":"success"})
            } 
        } catch (error) {

        }
    }

    render() {
        return (
            <View class="container">
                <TouchableOpacity onPress={this.toggleViewPaymentSummary}>
                    <Text style={styles.viewPaymentSummary}>Click here to see payment summary</Text>    
                </TouchableOpacity>
                {this.viewPaymentSummary && 
                    <View style={styles.paymentSummary}>
                        <View style={styles.paymentSummaryLine}>
                            <Text style={styles.leftViewPaymentSummary}>Total Amount :</Text>
                            <Text style={styles.rightViewPaymentSummary}>{this.total}</Text>
                        </View>
                        <View style={styles.paymentSummaryLine}>
                            <Text style={styles.leftViewPaymentSummary}>Discount applied :</Text>
                            <Text style={styles.rightViewPaymentSummary}>{this.discount}</Text>
                        </View>
                        <View style={styles.paymentSummaryLine}>
                            <Text style={styles.leftViewPaymentSummary}>Amount payable :</Text>
                            <Text style={styles.rightViewPaymentSummary}>{this.amountPayable}</Text>
                        </View>
                    </View>
                }
                <TouchableOpacity onPress={this.processCodPayment}>
                    <View style={styles.paymentModeLabel}>
                        <Text style={styles.paymentModeText}>Cash/Card on delivery</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.paymentModeLabel}>
                        <Text style={styles.paymentModeText}>Paypal</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.paymentModeLabel}>
                        <Text style={styles.paymentModeText}>Paytm</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    paymentModeLabel : {
        height:60,
        backgroundColor: '#ffa366',
        marginHorizontal : 10,
        marginVertical : 12,
        justifyContent: 'center',
    },
    paymentModeText : {
        fontSize:20,
        alignSelf : 'center'
    },
    paymentSummary : {
        justifyContent: 'center',
        marginHorizontal:10,
        height : 120,
        
    },
    paymentSummaryLine : {
        flexDirection: 'row',
        paddingHorizontal: 19,
        paddingVertical: 10
    },
    leftViewPaymentSummary: {
        flex: 0.8,
        fontSize:14
    },
    rightViewPaymentSummary: {
        flex: 0.2,
        alignItems: 'flex-end',
        fontSize:14
    },
    viewPaymentSummary : {
        marginHorizontal : 10,
        fontSize:16,
        marginVertical : 20
    }


});

