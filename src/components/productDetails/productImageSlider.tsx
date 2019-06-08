import React, { Component } from 'react';
import { StyleSheet,View,Dimensions}  from 'react-native';
import ImageSlider from 'react-native-image-slider';
import {DEVICE_DIMENSIONS} from './../../constant'


export default class ProductImageSlider extends Component<{}> {
  render() {
    const images = [
        'https://d24xw9xsv7y3uu.cloudfront.net/i48zghyp_tablet_Desktop_Tablet.jpg',
        'https://d26iwjla857pn6.cloudfront.net/uploads/production/soft_furnishing/999/980w_108ff287.jpg',
        'https://d26iwjla857pn6.cloudfront.net/uploads/production/furniture_item/483/980w_7a303aac.jpg',
        'https://d26iwjla857pn6.cloudfront.net/uploads/production/package/717/980w_8a03c28b.jpg'
    ];

    return (
      <View style={styles.container}>
        
        <ImageSlider images={images} style={{height:DEVICE_DIMENSIONS.height*0.3}}
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
    height:DEVICE_DIMENSIONS.height*0.40
  }
});

