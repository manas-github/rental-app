import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { DEVICE_DIMENSIONS } from './../../constant'

interface props {
    navigation: any;
}

@observer
class Collections extends React.Component<props, any> {
    navigation: any;
    constructor(props: any) {
        super(props);
        this.navigation = (this as any).props.navigation;
    }
    @observable items = [
        './../../assets/images/furniture.png',
        './../../assets/images/appliance.png',
        './../../assets/images/package.png'
    ];

    navigateToProductList = (type) => {

        (this as any).props.navigation.navigate('ProductListScreen', { productType: type });
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.navigateToProductList('furnitures')}>
                    <Image source={require('./../../assets/images/furniture.png')} resizeMode="contain" style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.navigateToProductList('appliances')}>
                    <Image source={require('./../../assets/images/appliance.png')} resizeMode="contain" style={styles.image} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => this.navigateToProductList('packages')}>
                    <Image source={require('./../../assets/images/package.png')} resizeMode="contain" style={styles.image} />
                </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        width: DEVICE_DIMENSIONS.width / 3,
        marginHorizontal : DEVICE_DIMENSIONS.width/12

    },
});

export default Collections;
