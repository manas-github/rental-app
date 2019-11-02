import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { DEVICE_DIMENSIONS } from './../../constant'


export default class ProductImageSlider extends Component<{}> {
    render() {
        const images = (this as any).props.images

        return (
            <View style={styles.container}>

                <ImageSlider images={images} style={{ height: DEVICE_DIMENSIONS.height * 0.3 }}
                    autoPlayWithInterval={10000}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#F5FCFF',
        height: DEVICE_DIMENSIONS.height * 0.40
    }
});

