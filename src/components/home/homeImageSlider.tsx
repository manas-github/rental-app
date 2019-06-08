import React, { Component } from 'react';
import {StyleSheet,View,Dimensions} from 'react-native';
import {DEVICE_DIMENSIONS} from './../../constant'
import ImageSlider from 'react-native-image-slider';

class HomeimageSlider extends Component<{}> {
  render() {
    const images = [
        'https://picsum.photos/640/640',
        'https://picsum.photos/640/641',
        'https://picsum.photos/640/642',
        'https://picsum.photos/640/643',
        'https://picsum.photos/640/644',
        'https://picsum.photos/640/645',
        'https://picsum.photos/640/646',
        'https://picsum.photos/640/647',
        'https://picsum.photos/640/648',
        'https://picsum.photos/640/649',
        'https://picsum.photos/640/651',
        'https://picsum.photos/640/652',
        'https://picsum.photos/640/653',
        'https://picsum.photos/640/654',
    ];

    return (
      <View style={styles.container}>        
        <ImageSlider images={images}
            autoPlayWithInterval={3000}
        />       
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#F5FCFF',
    height:DEVICE_DIMENSIONS.height*0.30
  }
});

export default HomeimageSlider;