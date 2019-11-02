import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { DEVICE_DIMENSIONS } from './../constant'
import { MaterialIndicator } from 'react-native-indicators';


@observer
export default class OrderDetails extends React.Component<any, any> {

    @observable orderItems = []
    @observable orderDetails = { "orderItems": [], "orderno": "", "subtotal": "", "discount": "", "tax": "", "total": "" }
    componentDidMount = async () => {
        try {
            const fetchOrderAPI = 'https://api.myjson.com/bins/12i3z8'
            const response = await fetch(fetchOrderAPI)
            this.orderDetails = await response.json()
            this.orderItems = await this.orderDetails.orderItems
        }
        catch {
            alert('Plese check your internet connection and try again!!')
        }
    }
    renderItems = (item, index) => {
        return (
            <View key={index}>
                <View style={styles.orderItem}>
                    <View style={styles.leftView}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.duration}>{item.duration} months  |   &#8377; {item.rate} * {item.quantity}</Text>
                    </View>
                    <View style={styles.rightView}>
                        <Text style={styles.price}>&#8377; {item.rate * item.quantity}</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
            </View>
        );
    }
    render() {
        if (this.orderItems.length > 0)
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.receiptTop}>
                            <View style={styles.receiptTopLeft}>
                                <Text style={{ fontSize: 30 }}>Receipt</Text>
                                <Text style={{ fontSize: 20, marginTop: 20 }}>{this.orderDetails.orderno}</Text>
                            </View>
                            <View style={styles.receiptTopRight}>
                                <Text style={{ fontSize: 18, paddingTop: 8 }}> Date : 06/01/2019</Text>
                                <Text style={{ fontSize: 18, marginTop: 24 }}>Paid</Text>
                            </View>
                        </View>
                        <View style={styles.orderDetailsContainer}>
                            <Text style={{ color: '#696969' }}>Order Details</Text>
                            <View style={styles.orderDetails}>
                                {this.orderItems.map((val, index) => this.renderItems(val, index))}
                            </View>
                        </View>
                        <View style={styles.calculations}>
                            <View style={styles.leftViewCalculations}>
                                <Text style={styles.leftViewCalculationsText}>Subtotal</Text>
                                <Text style={styles.leftViewCalculationsText}>Discount</Text>
                                <Text style={styles.leftViewCalculationsText}>Tax</Text>
                                <Text style={styles.leftViewCalculationsText}>Total</Text>
                            </View>
                            <View style={styles.rightViewCalculations}>
                                <Text style={styles.rightViewCalculationsText}>&#8377; {this.orderDetails.subtotal}</Text>
                                <Text style={styles.rightViewCalculationsText}>-&#8377; {this.orderDetails.discount}</Text>
                                <Text style={styles.rightViewCalculationsText}>&#8377; {this.orderDetails.tax}</Text>
                                <Text style={styles.rightViewCalculationsText}>&#8377; {this.orderDetails.total}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            );
        else
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 320 }}>
                    <MaterialIndicator
                        color='orange'
                        animationDuration={800}
                        count={20}
                        size={20}
                    />
                </View>
            )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    receiptTop: {
        height: 180,
        paddingTop: 10,
        backgroundColor: '#359BE7',
        flexDirection: 'row',
    },
    receiptTopLeft: {
        flex: 0.5,
        paddingTop: 35,
        paddingLeft: 15
    },
    receiptTopRight: {
        flex: 0.5,
        alignItems: 'flex-end',
        paddingTop: 35,
        paddingRight: 15
    },
    orderDetailsContainer: {
        padding: 12
    },
    horizontalLine: {
        height: 1,
        backgroundColor: 'grey'
    },
    orderItem: {
        flexDirection: 'row',
        paddingRight: 8,
        paddingVertical: 8
    },
    leftView: {
        flex: 0.75
    },
    rightView: {
        flex: 0.25,
        alignItems: 'flex-end',

    },
    productTitle: {
        fontSize: 16,
        paddingVertical: 4
    },
    duration: {
        fontSize: 12,
        paddingVertical: 4,
        color: '#696969'

    },
    price: {
        paddingVertical: 2,
        fontSize: 20
    },
    calculations: {
        flexDirection: 'row',
        paddingHorizontal: 19,

    },
    leftViewCalculations: {
        flex: 0.6,
    },
    rightViewCalculations: {
        flex: 0.4,
        alignItems: 'flex-end',
    },
    rightViewCalculationsText: {
        paddingVertical: 4,
        fontSize: 18
    },
    leftViewCalculationsText: {
        paddingLeft: 120,
        paddingVertical: 4,
        fontSize: 18

    }


});

