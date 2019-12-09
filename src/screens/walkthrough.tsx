import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Home from './home'
import Signup from './signup'

export default class Walkthrough extends React.Component {
    constructor(props) {
        super(props);
        (this as any).state = {
            showRealApp: false,
        };
    }
    _onDone = async () => {
        try {
            await AsyncStorage.setItem('openedFirstTime', 'true');
        } catch (error) {

        }
        (this as any).setState({ showRealApp: true });
    };
    _onSkip = async () => {
        try {
            await AsyncStorage.setItem('openedFirstTime', 'true');
        } catch (error) {

        }
        (this as any).setState({ showRealApp: true });
    };
    render() {
        if ((this as any).state.showRealApp) {
            return (
                <Signup navigation={(this as any).props.navigation} />
            );
        } else {
            return (
                    <View style={styles.container}>
                        <AppIntroSlider
                            slides={slides}
                            onDone={this._onDone}
                            showSkipButton={true}
                            onSkip={this._onSkip}
                        />
                    </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginTop: 16,
    },
    container : {
        flex:1,
        paddingTop:32
    }
});

const slides = [
    {
        key: 's1',
        text: 'Whether you want to rent furniture or appliance, you won’t have to pay extra for maintenance.',
        title: 'No Maintenance',
        titleStyle: styles.title,
        textStyle: styles.text,
        image: {
            uri:
                'https://www.freeiconspng.com/uploads/maintenance-icon-21.png'
        },
        imageStyle: styles.image,
        backgroundColor: '#20d2bb',
    },
    {
        key: 's2',
        title: 'Zero Loan Responsibilities',
        titleStyle: styles.title,
        text: 'Renting can solve your decor worries and still not put you under the stress of clearing loan installments',
        image: {
            uri:
                'https://www.freeiconspng.com/uploads/bank-icon-11.png'
        },
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 's3',
        title: 'No Budget Limitations',
        titleStyle: styles.title,
        text: 'Wouldn’t it be amazing to keep the budget limitations aside and just rent that favorite sofa of yours?',
        image: {
            uri: 'https://www.freeiconspng.com/uploads/money-png-7.png',
        },
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    },
    {
        key: 's4',
        title: 'Impeccable Support',
        titleStyle: styles.title,
        text: 'Our experienced customer executiveswill ensure the earliest resolution of your issues',
        image: {
            uri: 'https://www.freeiconspng.com/uploads/customer-service-icon-png-9.png',
        },
        imageStyle: styles.image,
        backgroundColor: '#3395ff',
    }
];