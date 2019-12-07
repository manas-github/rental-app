import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { DEVICE_DIMENSIONS } from './../constant'
import { MaterialIndicator } from 'react-native-indicators';
import { Api } from '../api/api';


@observer
export default class Subscriptions extends React.Component<any, any> {

    @observable api = new Api()
    @observable orders = []
    @observable isLoaded = false;

    componentDidMount = async () => {
        try {
            const res = await this.api.getAllOrders();
            if (res && res.data) {
                this.isLoaded = true
                this.orders = res.data
            } 
        } catch (error) {

        }
    }

    renderOrder = (order,index) => {
        return (
            <View key={index}>
                {order.orderItems.map((val, index) => this.renderItems(val, index,order))}
            </View>
        )
    }
    renderItems = (orderItem, index, order) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <TouchableOpacity onPress={() => { (this as any).props.navigation.navigate('OrderDetailsScreen',{'order':order,'orderItemId':orderItem.id})}}>
                    <View style={styles.innerContainer}>
                        <View style={styles.leftView}>
                            <View style={styles.title}>
                                <Text>{orderItem.product.title}</Text>
                                <Text>Duration : {orderItem.duration} months   |  Qty : {orderItem.quantity}</Text>
                            </View>
                            <View style={styles.deliveryStatus}>
                                <View style={styles.circle} />
                                <Text>Delivery expected on x.y.z</Text>
                            </View>
                        </View>
                        <View style={styles.rightView}>
                            <Image
                                style={{ height: 60 }}
                                source={{ uri: orderItem.product.imageUrl}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        if (this.isLoaded && this.orders.length > 0)
            return (
                <ScrollView>
                    <View style={styles.container}>
                        {this.orders.map((val, index) => this.renderOrder(val, index))}
                    </View>
                </ScrollView>
            );
        else if (this.isLoaded && this.orders.length == 0)
            return (
                <View style={styles.container}>
                    <Image
                        style={{}}
                        source={{ uri: 'https://nmgprod.s3.amazonaws.com/media/filer_public_thumbnails/filer_public/b9/24/b924f24e-dc0c-4dda-9cdf-7308681fcc38/amc-unexpected-hand-stamp-and-pencil-640.jpg__640x360_q85_crop_subsampling-2.jpg' }}
                    />
                    <Text style={styles.noProductFoundText}>If you have placed any order from us and seeing this screen, please contact us!!</Text>
                </View>
            );
        else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 320 }}>
                    <MaterialIndicator
                        color='orange'
                        animationDuration={800}
                        count={20}
                        size={20}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDC',
        paddingBottom: 6
    },
    noProductFoundText: {
        padding: 20,
        marginTop: 20
    },
    itemContainer: {
        marginLeft: 4,
        marginRight: 4,
        marginTop: 4,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#DCDCDC',
        overflow: 'hidden'
    },
    innerContainer: {
        flexDirection: 'row'
    },
    leftView: {
        backgroundColor: 'white',
        flex: 0.7,
        height: 140

    },
    rightView: {
        backgroundColor: 'white',
        flex: 0.3,
        height: 140,
        padding: 15,
        justifyContent: 'center'
    },
    title: {
        height: 90,
        paddingTop: 15,
        paddingLeft: 10,
    },
    deliveryStatus: {
        height: 30,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    circle: {
        marginTop: 3,
        marginRight: 4,
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'green'
    }

});

