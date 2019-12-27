import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { BarIndicator} from 'react-native-indicators';
import { DEVICE_DIMENSIONS } from './../../constant'
import { Api } from '../../api/api';

interface props {
    navigation: any;
}

@observer
export default class Listing extends React.Component<props, any> {

    navigation: any;
    constructor(props: any) {
        super(props);
        this.navigation = (this as any).props.navigation;
    }

    @observable productType = (this as any).props.navigation.getParam('productType');
    @observable isLoaded: boolean = false
    @observable keyProp: number = 1
    @observable api = new Api()
    @observable data = []
    componentDidMount = async () => {
        if (this.productType !== 'searched') {
            try {
                const res = await this.api.getProductList(this.productType);
                if (res && res.data) {
                    this.data = res.data;
                    this.isLoaded = true
                }
            } catch (error) {
            }
        }
        else {
            try {
                let searchKey = (this as any).props.navigation.getParam('searchKey');
                const res = await this.api.getProductBySearch(searchKey);
                if (res && res.data) {
                    this.data = res.data;
                    this.isLoaded = true
                }
            } catch (error) {
            }
        }
    }

    navigateToProductDetailScreen = (id) => {
        this.navigation.navigate('ProductDetailsScreen', { productId: id })
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity key={item.key} style={styles.grid} onPress={() => this.navigateToProductDetailScreen(item.id)}>
            <Image source={{ uri: item.imageUrl }} style={{ height: 158, borderRadius: 0 }} />
            <View style={styles.titleAndPrice}>
                <Text style={styles.title}>{item.title.toUpperCase().substring(0, 22)}</Text>
                <Text style={styles.price}>Starting from &#8377;{item.price[3]}</Text>
            </View>
        </TouchableOpacity>
    );
    _keyExtractor = (item, index) => this.keyProp && this.keyProp++;

    render() {
        const data = this.data
        if (this.isLoaded && data.length > 0)
            return (
                <View>
                    <FlatList
                        style={styles.flatlist}
                        data={data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        numColumns={2}
                    />
                </View>
            );
        else if (this.isLoaded)
            return (
                <Text style={{textAlign:"center"}}>No such product found</Text>
            )
        else
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
    }
}

const styles = StyleSheet.create({
    flatlist: {
    },
    titleAndPrice: {
        backgroundColor: '#DCDCDC',
        paddingVertical: 5
    },
    title: {
        fontSize: 13
    },
    price: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    description: {
        fontStyle: 'italic'
    },
    grid: {
        width: DEVICE_DIMENSIONS.width * 0.5,
        padding: 4
    }
});
