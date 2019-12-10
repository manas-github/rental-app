import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Platform, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import { DEVICE_DIMENSIONS, Toast } from './../constant'
import { AsyncStorage } from 'react-native';
import { Api } from './../api/api'
import { StackActions, NavigationActions } from 'react-navigation';

interface props {
    navigation: any;
}
@observer
export default class Login extends Component {
    navigation: any;
    constructor(props: any) {
        super(props);
        this.navigation = (this as any).props.navigation;
    }

    @observable showPassword = false
    @observable email = ''
    @observable password = ''
    @observable emailError = false
    @observable passwordError = false
    @observable showEmailErrorMessage = false;
    @observable showPasswordErrorMessage = false;
    @observable errorMessagePassword = 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number & one special character'
    @observable regex = {
        'email': new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        'password': new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    }
    @observable waiting = false
    @observable showToast = false
    @observable toastMsg = ""
    @observable api = new Api()


    validate = () => {

        if (this.regex.email.test(this.email))
            this.emailError = false
        else
            this.emailError = true
        if (this.regex.password.test(this.password)) {
            this.passwordError = false
        }
        else {
            this.passwordError = true
        }

    }

    resetStack = () => {
        (this as any).props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'HomeScreen',
                    }),
                ],
            }))
    }

    signInClicked = async () => {
        this.validate()
        if (!this.emailError && !this.passwordError) {
            this.waiting = true

            try {
                const res = await this.api.signIn(this.email, this.password);
                if (res && res.data) {
                    if(res.data=="inactive"){
                        this.showToast = true;
                        this.toastMsg = "Your account is inactive. Please check you email for verification steps!!"
                        setTimeout(() => {
                            this.showToast = false;
                        }, 3500);
                    }
                    else if (res.data) {
                        try {
                            await AsyncStorage.setItem('Token', res.data);
                            await AsyncStorage.setItem('loggedIn', 'true')
                            this.resetStack()
                        } catch (error) {
                            this.showToast = true;
                            this.toastMsg = "Security error. Contact team!!"
                            setTimeout(() => {
                                this.showToast = false;
                            }, 2500);
                        }
                    }
                }
            } catch (error) {
                this.showToast = true;
                this.toastMsg = "Invalid credentials"
                setTimeout(() => {
                    this.showToast = false;
                }, 2500);
            } finally {
                this.waiting = false;
            }
        }
    }

    hideErrorMessages = () => {
        this.showEmailErrorMessage = false;
        this.showPasswordErrorMessage = false;
    }

    render() {
        return (
            <ImageBackground source={{ uri: 'https://www.pictorem.com/collection/900_Rizwana-Khan_Green%20to%20yellow%20Gradient%20Background.jpg' }} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Icon name={'ios-mail'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'Email'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlinecolorAndroid='transparent'
                            onChangeText={(value) => this.email = value}
                            onFocus={() => this.hideErrorMessages()}

                        />
                        {this.emailError && <TouchableOpacity style={styles.alertIcon} onPress={() => { this.hideErrorMessages(); this.showEmailErrorMessage = true }}><Icon name={'ios-alert'} size={28} color={'#CC3300'} /></TouchableOpacity>}
                        {this.showEmailErrorMessage && <Text style={styles.errorText}>Enter valid email</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'Password'}
                            secureTextEntry={!this.showPassword}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlinecolorAndroid='transparent'
                            onChangeText={(value) => this.password = value}
                            onFocus={() => this.hideErrorMessages()}

                        />
                        {!this.passwordError ?
                            <TouchableOpacity style={styles.eyeIcon} onPressIn={() => { this.showPassword = true }} onPressOut={() => { this.showPassword = false }}>
                                <Icon name={'ios-eye'} size={28} color={'rgba(255,255,255,0.7)'} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.eyeIconPasswordError} onPressIn={() => { this.showPassword = true }} onPressOut={() => { this.showPassword = false }}>
                                <Icon name={'ios-eye'} size={28} color={'rgba(255,255,255,0.7)'} />
                            </TouchableOpacity>
                        }
                        {this.passwordError && <TouchableOpacity style={styles.alertIcon} onPress={() => { this.hideErrorMessages(); this.showPasswordErrorMessage = true }}><Icon name={'ios-alert'} size={28} color={'#CC3300'} /></TouchableOpacity>}
                        {this.showPasswordErrorMessage && <Text style={styles.errorText}>{this.errorMessagePassword}</Text>}
                    </View>
                    <TouchableOpacity onPress={() => (this as any).props.navigation.navigate('SignupScreen')}>
                        <Text style={styles.signinText}>Don't have an account?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnLogin} onPress={() => this.signInClicked()}>
                        {!this.waiting && <Text style={styles.btnText}>Login</Text>}
                        {this.waiting && <SkypeIndicator color='white' />}
                    </TouchableOpacity>
                    {this.showToast && <Toast message={this.toastMsg} />}
                </View>
            </ImageBackground>
        );
    }
}

const windowWidth = DEVICE_DIMENSIONS.width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        height: Platform.OS === 'ios' ? 0 : 24,
    },
    input: {
        width: windowWidth - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
    },
    defaultButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#25CAC6',
    },
    inputContainer: {
        margin: 10
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    eyeIcon: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btnLogin: {
        marginTop: 10,
        width: windowWidth - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
    },
    signinText: {
        color: 'white',
        fontSize: 14
    },
    btnText: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        fontSize: 19,

    },
    alertIcon: {
        position: 'absolute',
        top: 8,
        right: 37,
        color: 'red'
    },
    eyeIconPasswordError: {
        position: 'absolute',
        top: 8,
        right: 65,
    },
    errorText: {
        position: 'absolute',
        width: 220,
        right: 37,
        bottom: 36,
        backgroundColor: 'rgba(52, 52, 52, 1)',
        color: 'white',
        padding: 4,
        borderTopColor: 'red',
        borderTopWidth: 1,
        zIndex: 2
    }
});
