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
            subtitle: 'Hello friends todaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytodaytoday I am sharing my review about the furlenco.com, friends I am shifted in new city for 3 months because of my studies so in need a table and ...',
            illustration: 'https://i.imgur.com/SsJmZ9jl.jpg'
        },
        {
            title: 'Favourites landscapes 2',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'https://i.imgur.com/5tj6S7Ol.jpg'
        },
        {
            title: 'Favourites landscapes 3',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat',
            illustration: 'https://i.imgur.com/pmSqIFZl.jpg'
        },
        {
            title: 'Favourites landscapes 4',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'https://i.imgur.com/cA8zoGel.jpg'
        },
        {
            title: 'Favourites landscapes 5',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'https://i.imgur.com/pewusMzl.jpg'
        },
        {
            title: 'Favourites landscapes 6',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat',
            illustration: 'https://i.imgur.com/l49aYS3l.jpg'
        }
    ]




    _renderItem({ item, index }) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    render() {
        return (
            <View style={styles.container}>
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
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 280,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CustomerReviews;
