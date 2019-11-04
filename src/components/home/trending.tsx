import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { DEVICE_DIMENSIONS } from './../../constant'
import { MaterialIndicator } from 'react-native-indicators';
import { Api } from '../../api/api';

@observer
export default class Trending extends React.Component<any, any> {

    @observable data = []
    @observable isLoaded = false;
    @observable api = new Api()

    componentDidMount = async () => {
        try {
            const res = await this.api.getTrendingProducts(2);
            if (res && res.data) {
                this.data = res.data;
                this.isLoaded = true
            }
        } catch (error) {
        }
    }

    navigateToProductDetailScreen = (id) => {
        (this as any).props.navigation.navigate('ProductDetailsScreen', { productId: id })
    }

    renderItems = (item: any, index: number) => {
        return (
            <TouchableOpacity
                key={index} style={styles.grid}
                onPress={() => this.navigateToProductDetailScreen(item.id)}
            >
                <Image
                    source={{ uri: item.imageUrl }}
                    style={{ height: 260, width: DEVICE_DIMENSIONS.width * 0.6, borderRadius: 0 }}
                />
                <View style={styles.titleAndPrice}>
                    <Text style={styles.title}>
                        {item.title.toUpperCase().substring(0,15)}
                    </Text>
                    <Text style={styles.price}>
                        Starting from &#8377;{item.price[3]}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>TRENDING NOW...</Text>
                {
                    (this.isLoaded) ?
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={styles.trendingContainer}>
                                {this.data.map((val, index) => this.renderItems(val, index))}
                            </View>
                        </ScrollView>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 320 }}>
                            <MaterialIndicator
                                color='orange'
                                animationDuration={800}
                                count={20}
                                size={20}
                            />
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 18,
        padding: 10,
        marginLeft: 10,
        color: 'grey',
        fontWeight: '600'
    },
    trendingContainer: {
        flexDirection: 'row',
        marginLeft: 20
    },
    grid: {
        height: 320,
        marginRight: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        overflow: 'hidden'
    },
    titleAndPrice: {
        backgroundColor: '#D3D3D3',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        textAlign: 'center'
    },
    price: {
        fontStyle: 'italic',
        textAlign: 'center'
    }
});

