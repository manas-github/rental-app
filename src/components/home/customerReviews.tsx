import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { sliderWidth, itemWidth } from '../slider/sliderStyle'
import SliderEntry from '../slider/slider'
import Carousel from "react-native-snap-carousel"

@observer
class CustomerReviews extends React.Component<any, any> {


    @observable entries: any = [
        {
            title: 'Manas',
            subtitle: 'Really good product quality, expert people and good tracking.',
            illustration: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUiBOaN7WSJeusHsBKHkrGzKzcoZRZohTi3IihpzsqiWgfFuSNw&s'
        },
        {
            title: 'Not Manas',
            subtitle: 'Awesome experience... U name it its all there... Durability Trustworthy Quality ..its top notch in all of it' ,
            illustration: 'https://i.pinimg.com/originals/4e/fc/da/4efcda6185e98de15c8def9e6bf39a55.jpg'
        },
        {
            title: 'Another manas',
            subtitle: 'Bahut hard',
            illustration: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbJjr_0_zsR5L9L1-77Yk9aMWZcn6fV07pCuj7LRp8QHEXjoMo&s'
        }
    ]




    _renderItem({ item, index }) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>CUSTOMER LOVES US</Text>
                <View style={styles.review}>
                    <Carousel
                        layoutCardOffset={18}
                        data={this.entries}
                        renderItem={this._renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        containerCustomStyle={styles.slider}
                        contentContainerCustomStyle={styles.sliderContentContainer}
                        layout={'stack'}
                        loop={true}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 340,
        backgroundColor: '#fff',
        
    },
    review : {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 18,
        padding: 10,
        marginLeft: 10,
        color: 'grey',
        fontWeight: '600'
    }
});

export default CustomerReviews;
