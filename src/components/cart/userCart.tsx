import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, Platform } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIndicator } from 'react-native-indicators';
import CartFooter from './../../components/cart/footer'
import { Toast } from './../../constant'
import { Api } from '../../api/api';

@observer
export default class UserCart extends React.Component<any, any> {

    @observable cart: any
    @observable cartItems = {}
    @observable productDetails = [{ id: '', title: '', description: '', images: {}, tenure: [], price: [] }]
    @observable maxQuantityToastVisible = false;
    @observable cartLoaded = false
    @observable totalAmount = 0
    @observable savedItems = { id: [''], tenure: [''], quantity: [''] }
    @observable api = new Api
    componentDidMount = async () => {
        this.loadCart();
    }

    navigateToHome = () => {
        (this as any).props.navigation.navigate('HomeScreen')
    }

    loadCart = async () => {
        try {
            const res = await this.api.getCart();
            if (res && res.data) {
                this.cart = res.data;
                this.cartLoaded = true
                this.updatePrice();
            }
        } catch (error) {
        }
    }

    updatePrice = () => {
        this.totalAmount = 0;
        this.cart.cartItem.forEach(item => {
            this.totalAmount += item.product.price[item.duration] * item.quantity
        });
        this.totalAmount = 2 * this.totalAmount;
    }

    deleteFromCart = async (productId, duration) => {
        try {
            const res = await this.api.removeCartItem(productId, duration);
            if (res && res.data) {
                if (res.data === true) {
                    this.cart.cartItem = this.cart.cartItem.filter(function (item) {
                        return item.product.id != productId || item.duration != duration
                    })
                    this.updatePrice();
                }
            }
        } catch (error) {
        }

    }

    save = (productId, duration) => {
        alert("feature implementation under progress..")
    }

    changeQuantity = async (type: string, quantity: any, duration: any, productId: any) => {
        if (type == 'increase') {
            if (quantity == 5) {
                // alert('Max quantity limit reached for this item')
                this.maxQuantityToastVisible = true
                setTimeout(() => {
                    this.maxQuantityToastVisible = false
                }, 2500);
            }
            else {
                try {
                    const res = await this.api.increaseCartItemQuantity(productId, duration);

                    if (res && res.data) {
                        if (res.data === true) {
                            this.cart.cartItem.forEach(item => {
                                if (item.product.id === productId && item.duration === duration) {
                                    item.quantity = quantity + 1
                                }
                            });
                            this.updatePrice();
                        }
                    }
                } catch (error) {
                }
            }
        }
        else if (type == 'decrease' && quantity != 1) {
            try {
                const res = await this.api.decreaseCartItemQuantity(productId, duration);
                if (res && res.data) {
                    if (res.data === true) {
                        this.cart.cartItem.forEach(item => {
                            if (item.product.id === productId && item.duration === duration) {
                                item.quantity = quantity - 1
                            }
                        });
                        this.updatePrice();
                    }
                }
            } catch (error) {
            }
        }
    }

    renderItems = (cartItem, index) => {
        let price = cartItem.product.price[cartItem.duration];
        let formattedTitle = this.cartLoaded && cartItem && cartItem.product.title && (cartItem.product.title.length >= 25 ? cartItem.product.title.substring(0, 25) + '...' : cartItem.product.title)
        let duration = cartItem.duration;
        let productId = cartItem.product.id
        let quantity = cartItem.quantity
        return (
            <View key={index} style={{ backgroundColor: '#d3d3d3', margin: 0 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ width: Dimensions.get('window').width * 0.65, padding: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{formattedTitle}</Text>
                        <Text style={{ fontSize: 12, paddingTop: 10 }}>Tenure : {cartItem.duration} month</Text>
                        <Text style={{ fontSize: 12 }}>Deposit : &#8377; {price}</Text>
                        <Text style={{ fontSize: 12, paddingBottom: 10 }}>Rent : &#8377; {price}/month</Text>
                        <Text style={{ fontSize: 12 }}>Delivery in 2 days, Sat | Free</Text>
                    </View>
                    <View style={{ width: Dimensions.get('window').width * 0.35 }}>
                        <Image
                            style={{ height: 80 }}
                            source={{ uri: cartItem.product.imageUrl }}
                        />
                        <View style={{ flexDirection: 'row', padding: 5 }}>
                            <Text style={{ fontSize: 16 }}>Qty :  </Text>
                            <TouchableOpacity onPress={() => this.changeQuantity('decrease', quantity, duration, productId)}>
                                <Icon
                                    name="ios-remove-circle-outline"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16 }}>  {cartItem.quantity}  </Text>
                            <TouchableOpacity onPress={() => this.changeQuantity('increase', quantity, duration, productId)}>
                                <Icon
                                    name={"ios-add-circle-outline"}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.save(productId, duration)}>
                        <Text style={styles.saveDeleteBtn}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.deleteFromCart(productId, duration)}>
                        <Text style={styles.saveDeleteBtn}>Remove</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 20, backgroundColor: 'white' }}>
                </View>
            </View>
        )
    }

    render() {
        if (!this.cartLoaded)
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
        if (this.cartLoaded && this.cart.user && (!this.cart.cartItem || this.cart.cartItem.length==0))
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.empty}
                        source={require('./../../assets/images/empty.png')}
                    />
                    <Text style={styles.emptyText}>
                        Looks like you haven't added anything to your cart
                    </Text>
                    <TouchableOpacity onPress={this.navigateToHome}>
                        <Text style={styles.continueBtn}>
                            Continue shopping
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        else if (this.cartLoaded && this.cart && this.cart.cartItem && this.cart.cartItem.length > 0)
            return (
                <View style={styles.container}>
                    <ScrollView>
                        {this.cart.cartItem.map((val, index) => this.renderItems(val, index))}
                        <View style={{ height: 40 }} />
                    </ScrollView>
                    {this.maxQuantityToastVisible && <Toast message="Max quantity reached for this product" />}
                    <CartFooter navigation={(this as any).props.navigation} amount={this.totalAmount} screen='cart' />
                </View>
            )
        else
            return (
                <View style={styles.container}>
                    <Text>If you are seeing this, please contact our support team</Text>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    status: {
        height: Platform.OS === 'ios' ? 0 : 24,
    },
    saveDeleteBtn: {
        fontSize: 18,
        padding: 6,
        borderWidth: 1,
        textAlign: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#eee9e9'
    },
    empty : {
        justifyContent:'center',
        alignItems:'center',
        alignContent:"center",
        alignSelf:"center"
    },
    emptyText : {
        textAlign:"center",
    },
    continueBtn : {
        marginHorizontal:60,
        backgroundColor:"rgb(234, 163, 61)",
        height:40,
        textAlign:"center",
        paddingTop:10,
        marginTop:20
    }

});
