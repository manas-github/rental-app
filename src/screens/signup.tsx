import React, { Component } from 'react';
import { StyleSheet, View, TextInput, AsyncStorage, ImageBackground, Platform, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { DEVICE_DIMENSIONS, Toast } from './../constant'
import { Api } from './../api/api'
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';


let pwdError = false

interface props {
    navigation: any;
}
@observer
export default class Signup extends Component {
    navigation: any;
    constructor(props: any) {
        super(props);
        this.navigation = (this as any).props.navigation;
    }
    @observable myApi = new Api()
    @observable showPassword = false
    @observable name = ''
    @observable email = ''
    @observable phone = ''
    @observable password = ''
    @observable otp ='';
    @observable nameError = false
    @observable emailError = false
    @observable phoneError = false
    @observable passwordError = false
    @observable otpError = false;
    @observable showEmailErrorMessage = false;
    @observable showNameErrorMessage = false;
    @observable showPasswordErrorMessage = false;
    @observable showPhoneErrorMessage = false;
    @observable showOtpErrorMessage=false
    @observable otpVerified = false
    @observable errorMessagePassword = 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number & one special character'
    @observable regex = {
        'name': new RegExp(/^[a-zA-Z ]{3,25}$/),
        'email': new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        'password': new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        'mobile': new RegExp(/^[6-9]\d{9}$/),
        'otp' : new RegExp(/^\d{5}$/)
    }
    @observable api = new Api()
    @observable showToast: boolean = false
    @observable toastMsg: String = ""
    @observable waiting: boolean = false

    validate = () => {
        (this.regex.name.test(this.name)) ? this.nameError = false : this.nameError = true;
        (this.regex.email.test(this.email)) ? this.emailError = false : this.emailError = true;
        (this.regex.mobile.test(this.phone)) ? this.phoneError = false : this.phoneError = true;
        (this.regex.password.test(this.password)) ? ((this.passwordError = false) && (pwdError = false)) : ((this.passwordError = true) && (pwdError = true));
        (this.regex.otp.test(this.otp)) ? this.otpError = false : this.otpError = true
    }

    verifyOtp = async () => {
        try{
            const res = await this.api.verifyOtp(this.phone,this.otp)
            if(res && res.data && res.data==true){
                this.otpVerified = true;
            } else{
                this.showToast = true;
                this.toastMsg = "Incorrect OTP entered"
                setTimeout(() => {
                    this.showToast = false;
                    this.waiting = false;
                }, 2500);
            }
        } catch (error){
            this.waiting = false;
        } finally {
        }
    }

    signInClicked = async () => {
        this.validate()
        if (!this.nameError && !this.passwordError && !this.phoneError && !this.emailError && !this.otpError) {
            this.waiting = true
            await this.verifyOtp();
            if(this.otpVerified){
                try {
                    let nameArray = this.name.split(' ')
                    let firstName = nameArray[0]
                    let lastName = this.name.substring(firstName.length)
                    const res = await this.api.signUp(firstName, lastName, this.email, this.password, this.phone);
                    if (res && res.data) {
                        if (res.data === true) {
                            this.showToast = true;
                            this.toastMsg = "Account created"
                            setTimeout(() => {
                                this.showToast = false;
                                (this as any).props.navigation.navigate('LoginScreen')
                            }, 2500);
                        }
                        else {
                            this.showToast = true;
                            this.toastMsg = "Account already exist"
                            setTimeout(() => {
                                this.showToast = false;
                            }, 2500);
                        }
                    }
                } catch (error) {
                }
                finally {
                    this.waiting = false
                }
            }
        }
    }

    sendOtp = async () => {
        console.log("called")
        if(this.regex.mobile.test(this.phone)){
            try{
                const res = await this.api.sendOtp(this.phone)
                console.log(res)
                if(res && res.data) {
                    console.log(res.data)
                    this.showToast = true;
                    this.toastMsg = "OTP sent"
                    setTimeout(() => {
                        this.showToast = false;
                    }, 2500);
                }
            } catch(error){

            }
        } else {
            this.phoneError=true;
            this.showPhoneErrorMessage=true;
        }
    }

    hideErrorMessages = () => {
        this.showEmailErrorMessage = false;
        this.showNameErrorMessage = false;
        this.showPasswordErrorMessage = false;
        this.showPhoneErrorMessage = false;
        this.showOtpErrorMessage = false;
    }

    render() {
        return (
            <ImageBackground source={{ uri: 'https://www.pictorem.com/collection/900_Rizwana-Khan_Green%20to%20yellow%20Gradient%20Background.jpg' }} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'Name'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlinecolorAndroid='transparent'
                            onChangeText={(value) => this.name = value}
                            onFocus={() => this.hideErrorMessages()}

                        />
                        {this.nameError && <View style={styles.alertIcon}><TouchableOpacity onPress={() => { this.hideErrorMessages(); this.showNameErrorMessage = true }}><Icon name={'ios-alert'} size={28} color={'#CC3300'} /></TouchableOpacity></View>}
                        {this.showNameErrorMessage && <Text style={styles.errorText}>Enter valid name</Text>}
                    </View>
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
                            onChangeText={(value) => {this.password = value; this.passwordError = false}}
                            onFocus={() =>{ this.hideErrorMessages();}}

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
                    <View style={styles.inputContainer}>
                        <Icon name={'ios-call'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'Mobile'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlinecolorAndroid='transparent'
                            onChangeText={(value) => {this.phone = value;this.phoneError = false;}}
                            onFocus={() => this.hideErrorMessages()}

                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => this.sendOtp()}>
                            <Icon name={'ios-send'} size={28} color={'rgba(255,255,255,0.7)'} />                        
                        </TouchableOpacity>
                        {this.phoneError && <TouchableOpacity style={styles.alertIcon} onPress={() => { this.hideErrorMessages(); this.showPhoneErrorMessage = true }}><Icon name={'ios-alert'} size={28} color={'#CC3300'} /></TouchableOpacity>}
                        {this.showPhoneErrorMessage && <Text style={styles.errorText}>Enter valid mobile no</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name={'ios-grid'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'OTP'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlinecolorAndroid='transparent'
                            onChangeText={(value) => this.otp = value}
                            onFocus={() => this.hideErrorMessages()}

                        />
                        {this.otpError && <TouchableOpacity style={styles.alertIcon} onPress={() => { this.hideErrorMessages(); this.showOtpErrorMessage = true }}><Icon name={'ios-alert'} size={28} color={'#CC3300'} /></TouchableOpacity>}
                        {this.showOtpErrorMessage && <Text style={styles.errorText}>Invalid Otp</Text>}
                    </View>

                    
                    <TouchableOpacity onPress={() => (this as any).props.navigation.navigate('LoginScreen')}>
                        <Text style={styles.signinText}>Already have an account?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnLogin} onPress={() => this.signInClicked()}>
                        {!this.waiting && <Text style={styles.btnText}>Create account</Text>}
                        {this.waiting && <SkypeIndicator color='white' />}
                    </TouchableOpacity>
                    {this.showToast && <Toast message={this.toastMsg} />}
                </View>
            </ImageBackground>
        );
    }
}

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
        width: DEVICE_DIMENSIONS.width - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
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
        width: DEVICE_DIMENSIONS.width - 55,
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
        backgroundColor: 'rgba(52, 52, 52, 1)', color: 'white',
        padding: 4,
        borderTopColor: 'red',
        borderTopWidth: 1,
        zIndex: 2
    }
});
