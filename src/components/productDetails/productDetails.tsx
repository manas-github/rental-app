import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import ProductImageSlider from './productImageSlider'
import { DEVICE_DIMENSIONS, Toast } from './../../constant'
import { BarIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Ionicons';
import { Api } from '../../api/api';

interface props {
    navigation: any;
}

@observer
export default class ProductDetails extends React.Component<props, any> {
    navigation: any;
    constructor(props: any) {
        super(props);
        this.navigation = (this as any).props.navigation;
    }

    @observable productId = (this as any).props.navigation.getParam('productId');
    @observable tenureSelected: any;
    @observable quantitySelected = 0;
    @observable priceSelected: any
    @observable modalVisible = false;
    @observable showToast = false;
    @observable api = new Api()
    @observable product: any = {}
    @observable isLoaded: boolean = false
    @observable imageList: any = []

    componentDidMount = async () => {
        try {
            const res = await this.api.getProduct(this.productId);
            if (res && res.data) {
                this.product = res.data
                this.isLoaded = true
                this.selectTenure(Object.keys(this.product.price)[0])
                this.imageList.push(res.data.imageUrl)
            }
        } catch (error) {
        }
    }

    addToCartPressed = async () => {
        try {
            const res = await this.api.addProductToCart(this.productId, this.tenureSelected)
            if (res && res.data) {
                const cartCount = res.data;
                (this as any).props.navigation.setParams({ cartCount });
                this.showToast = true
                setTimeout(() => {
                    this.showToast = false;
                }, 2500);
            }
        } catch (error) {
        }
    }

    selectTenure = (duration) => {
        this.tenureSelected = duration
        this.priceSelected = this.product.price[duration]
    }

    renderTenure = (duration, index) => {
        if (duration == this.tenureSelected)
            return (
                <View style={{ opacity: 0.2 }} key={index}>
                    <TouchableOpacity disabled={true} style={styles.tenureBlock} key={index} onPress={() => this.selectTenure(duration)}>
                        <Text style={styles.tenureText}>{duration}</Text>
                    </TouchableOpacity>
                </View>
            )
        else
            return (
                <View style={{ opacity: 1 }} key={index}>
                    <TouchableOpacity style={styles.tenureBlock} key={index} onPress={() => this.selectTenure(duration)}>
                        <Text style={styles.tenureText}>{duration}</Text>
                    </TouchableOpacity>
                </View>
            )
    }

    render() {
        if (!this.isLoaded)
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: DEVICE_DIMENSIONS.height / 2 - 10 }}>
                    <BarIndicator
                        color='orange'
                        animationDuration={800}
                        count={20}
                        size={20}
                    />
                </View>
            );
        else
            return (
                <View style={{ flex: 1, opacity: this.modalVisible ? 0.1 : 1.0 }}>
                    <ScrollView>
                        <View style={styles.imageSliderContainer}>
                            <ProductImageSlider images={this.imageList} />
                        </View>
                        <Text style={styles.title}>{this.product.title.toUpperCase()}</Text>
                        <Text style={styles.description}>{this.product.description}</Text>
                        <Text style={styles.tenureTitle}>Select tenure (in months) </Text>
                        <View style={styles.tenure}>
                            {Object.keys(this.product.price).map((duration, index) => this.renderTenure(duration, index))}
                        </View>
                        <View style={styles.rentAndDeposit}>
                            <Text style={styles.rent}>Rent : &#8377; {this.priceSelected}</Text>
                            <Text style={styles.deposit}>Deposit : &#8377; {this.priceSelected}</Text>
                        </View>
                        <ContentDivider />
                        <View style={styles.ourPromise}>
                            <Text style={styles.ourPromiseTitle}>Our Promise</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.15, alignItems: 'center' }}>
                                    <Icon
                                        name="ios-checkmark"
                                        size={40}
                                        color='green'
                                    />
                                </View>
                                <View style={{ flex: 0.85 }}>
                                    <Text style={{ fontWeight: '500' }}>Similar to new</Text>
                                    <Text style={{ fontWeight: '100', paddingTop: 2, paddingBottom: 16 }}>All our products are cleaned and inspected properly before delivery.</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.15, alignItems: 'center' }}>
                                    <Icon
                                        name="ios-checkmark"
                                        size={40}
                                        color='green'
                                    />
                                </View>
                                <View style={{ flex: 0.85 }}>
                                    <Text style={{ fontWeight: '500' }}>100% Refund </Text>
                                    <Text style={{ fontWeight: '100', paddingTop: 2, paddingBottom: 16 }}>We promise to refund 100% security amount in case you don't like it</Text>
                                </View>
                            </View>
                        </View>
                        <ContentDivider />
                        <View style={styles.ourPromise}>
                            <Text style={styles.ourPromiseTitle}>Important Terms</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.15, alignItems: 'center' }}>
                                    <Icon
                                        name="ios-lock"
                                        size={40}
                                        color='grey'
                                    />
                                </View>
                                <View style={{ flex: 0.85 }}>
                                    <Text style={{ fontWeight: '500' }}>Refundable depost</Text>
                                    <Text style={{ fontWeight: '100', paddingTop: 2, paddingBottom: 16 }}>We charge one month rental as refundable security deposit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.15, alignItems: 'center' }}>
                                    <Icon
                                        name="ios-calendar"
                                        size={40}
                                        color='grey'
                                    />
                                </View>
                                <View style={{ flex: 0.85 }}>
                                    <Text style={{ fontWeight: '500' }}>Rental tenure</Text>
                                    <Text style={{ fontWeight: '100', paddingTop: 2, paddingBottom: 16 }}>We bill the product for a minimum renting tenure of 3 months</Text>
                                </View>
                            </View>
                        </View>
                        <ContentDivider />
                        {/* <View style={styles.guarantee}>
                            <Text>Our promise</Text>
                            <Text>Free shipping</Text>
                            <Text>Free setup</Text>
                            <Text>Free relocation</Text>
                            <Text>Our promise</Text>
                            <Text>Free shipping</Text>
                            <Text>Free setup</Text>
                            <Text>Free relocation</Text>
                        </View> */}
                        <View>
                            <Text>Share</Text>
                        </View>
                    </ScrollView>
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'white', height: 50 }}>
                        <TouchableOpacity onPress={() => { this.addToCartPressed() }}>
                            <Text style={styles.addToCart}>ADD TO CART</Text>
                        </TouchableOpacity>
                        {this.showToast && <Toast message="Added to cart" />}
                    </View>
                </View>
            );
    }
}

class ContentDivider extends React.Component<any, any>{

    render() {
        return (
            <View style={{ height: 10, backgroundColor: '#DCDCDC' }} />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    imageSliderContainer: {
        height: DEVICE_DIMENSIONS.height * 0.4
    },
    tenureBlock: {
        width: 35,
        height: 35,
        borderWidth: 1,
        margin: 6,
        justifyContent: 'center',
    },
    modal: {

        marginTop: DEVICE_DIMENSIONS.height * 0.35,
        height: DEVICE_DIMENSIONS.height * 0.3,
        width: DEVICE_DIMENSIONS.width * 0.9,
        marginLeft: DEVICE_DIMENSIONS.width * 0.05,
        backgroundColor: 'rgb(234, 163, 61)'
    },
    tenure: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',

    },
    tenureText: {
        alignSelf: 'center',
        padding: 4,
        fontSize: 18

    },
    tenureTitle: {
        padding: 4,
        fontSize: 18,
        marginLeft: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        fontStyle: 'italic'
    },
    title: {
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    description: {
        padding: 7,
        fontStyle: 'italic',
        color: '#2F4F4F'
    },
    rentAndDeposit: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,

    },
    rent: {
        fontSize: 20
    },
    deposit: {
        fontSize: 20
    },
    doublestar: {
        paddingLeft: 10
    },
    addToCart: {
        margin: 0,
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: 'rgb(234, 163, 61)',
        overflow: 'hidden',
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: "center",
        height: 50,
        color:'white'


    },
    ourPromiseTitle: {
        fontSize: 18,
        paddingBottom: 12,
    },
    ourPromise: {
        padding: 14
    }



});
