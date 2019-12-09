import React from 'react';
import { Modal, AsyncStorage, StyleSheet, Text, Linking, View, ScrollView, SafeAreaView, Platform, NetInfo, TouchableOpacity, Dimensions } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import Searchbar from "../components/home/searchbar"
import HomeImageSlider from "../components/home/homeImageSlider"
import Collections from "../components/home/collections"
import News from "../components/home/news"
import Sponsored from "../components/home/sponsored"
import VideoMessages from "../components/home/videoMessages"
import CustomerReview from "../components/home/customerReviews"
import Topbar from "../components/home/topbar"
import Icon from 'react-native-vector-icons/Ionicons';
import Trending from '../components/home/trending';
import { Api } from './../api/api'
import { StackActions, NavigationActions } from 'react-navigation';

@observer
class Home extends React.Component {
    @observable modalVisible = false
    @observable status = ''
    @observable userLoggedIn = true;
    @observable api = new Api()
    @observable userDetails: any = {}

    componentWillMount = async () => {



        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.status = isConnected
            }
        );
    }
    // at some point in your code
    resetStack = (screen) => {
        (this as any).props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: screen,
                    }),
                ],
            }))
    }

    componentDidMount = async () => {
        try {
            const res = await this.api.getUser();
            if (res && res.data) {
                this.userDetails = res.data
            }
        } catch (error) {
            if (this.status) {
            }
            else {
                this.api.removeFromAsyncStorage('Token')
                this.api.saveToAsyncStorage('loggedIn', 'false');
                (this as any).props.navigation.navigate('LoginScreen')
            }
        }
    }
    openModal = () => {
        this.modalVisible = true;
    }

    logout = async () => {
        await AsyncStorage.setItem('Token', 'invalid')
        await this.api.removeFromAsyncStorage('Token')
        await AsyncStorage.setItem('loggedIn', 'false');
        this.closeModal();
        this.resetStack('LoginScreen')
    }

    closeModal = () => {
        this.modalVisible = false;
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.status = isConnected
    }
    render() {
        return (

            <View style={[styles.container, { opacity: (this.modalVisible) ? 0.3 : 1 }]}>
                <View>
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

                        <View style={styles.status} />
                        <ScrollView stickyHeaderIndices={[0]}>

                            <Topbar navigation={(this as any).props.navigation} openModal={this.openModal} />
                            <Searchbar navigation={(this as any).props.navigation} />
                            <HomeImageSlider />
                            <Collections navigation={(this as any).props.navigation} />
                            <Trending navigation={(this as any).props.navigation} />
                            {/* <News /> */}
                            {/* <Sponsored /> */}
                            <VideoMessages />
                            <CustomerReview />
                        </ScrollView>
                        <Modal
                            style={styles.modal}
                            dismiss={this.closeModal}
                            animationType="none"
                            transparent={true}
                            visible={this.modalVisible}
                            shouldCloseOnOverlayClick={true}
                            onRequestClose={() => {
                                this.closeModal();
                            }}>
                            <View style={styles.modalContent}>
                                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                                    <TouchableOpacity onPress={() => this.closeModal()} style={{ alignSelf: 'flex-end', paddingRight: 15 }}>
                                        <Icon
                                            name="ios-arrow-round-back"
                                            size={40}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.user}>
                                        <Icon
                                            name="ios-contact"
                                            size={40}
                                        />
                                        <TouchableOpacity>
                                            {!this.userLoggedIn && <TouchableOpacity onPress={() => { this.closeModal(); (this as any).props.navigation.navigate('LoginScreen') }}><Text>Login</Text></TouchableOpacity>}
                                            {this.userLoggedIn && <TouchableOpacity onPress={() => { this.closeModal(); (this as any).props.navigation.navigate('ProfileScreen', this.userDetails) }}><Text>{this.userDetails.firstName}</Text></TouchableOpacity>}
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={styles.modalOptions} onPress={() => { this.closeModal(); (this as any).props.navigation.navigate('SubscriptionsScreen') }}>
                                        <View style={styles.ModalOptionRow}>
                                            <Icon
                                                name="ios-star-outline"
                                                size={32}
                                            />
                                            <Text style={styles.optionText}>My Subscription</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity style={styles.modalOptions} onPress={() => (this as any).props.navigation.navigate('PaymentScreen')}>
                                        <View style={styles.ModalOptionRow}>
                                            <Icon
                                                name="ios-star-outline"
                                                size={32}
                                            />
                                            <Text style={styles.optionText}>Payments</Text>
                                        </View>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={styles.modalOptions} onPress={() => (this as any).props.navigation.navigate('SubscriptionsScreen')}>
                                        <View style={styles.ModalOptionRow}>
                                            <Icon
                                                name="ios-star-outline"
                                                size={32}
                                            />
                                            <Text style={styles.optionText}>Offers</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalOptions} onPress={() => { this.closeModal(); (this as any).props.navigation.navigate('PolicyScreen') }}>
                                        <View style={styles.ModalOptionRow}>
                                            <Icon
                                                name="ios-star-outline"
                                                size={32}
                                            />
                                            <Text style={styles.optionText}>Our policy</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalOptions} onPress={() => { this.closeModal(); (this as any).props.navigation.navigate('ContactScreen') }}>
                                        <View style={styles.ModalOptionRow}>
                                            <Icon
                                                name="ios-star-outline"
                                                size={32}
                                            />
                                            <Text style={styles.optionText}>Contact us</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalOptions} onPress={() => Linking.openURL('market://details?id=olacabs')}>
                                        <View style={styles.ModalOptionRow}>
                                            <Icon
                                                name="ios-star-outline"
                                                size={32}
                                            />
                                            <Text style={styles.optionText}>Rate us</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalOptions} onPress={() => { this.logout() }}>
                                        <View style={styles.ModalOptionRow}>
                                            <Icon
                                                name="ios-star-outline"
                                                size={32}
                                            />
                                            <Text style={styles.optionText}>Logout</Text>
                                        </View>
                                    </TouchableOpacity>




                                </SafeAreaView>

                            </View>
                        </Modal>
                    </SafeAreaView>
                </View>

            </View>
        );

    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    status: {
        height: Platform.OS === 'ios' ? 0 : 24,

    },
    activityIndicatorText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    activityINdicator: {
        alignSelf: 'center',
        justifyContent: 'center',


    },

    modalContent: {
        backgroundColor: 'white',
        width: 240,
        height: Dimensions.get('window').height

    },
    user: {
        backgroundColor: 'orange',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalOptions: {
        //alignItems:'center',
        height: 45,
        justifyContent: 'center',

    },
    ModalOptionRow: {
        flex: 1,
        flexDirection: 'row'
    },

    optionText: {
        fontSize: 14,
        paddingTop: 12,
        paddingLeft: 8
    }

});
