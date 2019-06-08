import React, {Component} from 'react';
import { StyleSheet, View,TextInput,AsyncStorage,ImageBackground,Platform,TouchableOpacity,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import {DEVICE_DIMENSIONS} from './../constant'
import {Api} from './../api/api'

let pwdError=false

interface props{
    navigation : any;
}
@observer
export default class Signup extends Component {
    navigation: any;
    constructor(props :any){
      super(props);
      this.navigation = (this as any).props.navigation;
    }
  @observable myApi = new Api()
  @observable showPassword = false
  @observable name=''
  @observable email=''
  @observable phone=''
  @observable password=''
  @observable nameError=false
  @observable emailError=false
  @observable phoneError=false
  @observable passwordError=false
  @observable showEmailErrorMessage = false;
  @observable showNameErrorMessage = false;
  @observable showPasswordErrorMessage = false;
  @observable showPhoneErrorMessage = false;
  @observable errorMessagePassword = 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number & one special character'
  @observable regex = {
      'name'     : new RegExp(/^[a-zA-Z ]{3,25}$/),
      'email'    : new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      'password' : new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      'mobile'   : new RegExp(/^[6-9]\d{9}$/)
  }

  componentDidMount = async () => {
    try{
        const value = await AsyncStorage.getItem('loggedIn');
        //alert(value)
        if (value != null) {
          (this as any).props.navigation.navigate('HomeScreen')        
        }
      }
      catch (error) {
        // Error retrieving data
        alert("error fetching...")
      }
  }
  
  validate = () => {
        (this.regex.name.test(this.name)) ? this.nameError = false : this.nameError = true;
        (this.regex.email.test(this.email)) ? this.emailError = false : this.emailError = true;
        (this.regex.mobile.test(this.phone)) ? this.phoneError = false : this.phoneError=true;
        (this.regex.password.test(this.password)) ? ((this.passwordError = false) &&  (pwdError = false)) :  ((this.passwordError = true) && (pwdError = true))
  }

  signInClicked = async () =>{
    //this.validate()  
    if(!this.nameError && !this.passwordError && !this.phoneError && !this.emailError){
        try{
            const payload = {'usernamae':this.email,'passsword':this.password,'firstName':this.name}
            if(await this.myApi.userSignup(payload)){
                (this as any).props.navigation.navigate('HomeScreen')
            }
            else{
                console.log('unable to create')
            }
            
//            await AsyncStorage.setItem('loggedIn', 'Manas');
        } 
        catch (error) {
            // Error saving data
        }
        // (this as any).props.navigation.navigate('HomeScreen')
    }

  }

  hideErrorMessages = () =>{
    this.showEmailErrorMessage = false;
    this.showNameErrorMessage = false;
    this.showPasswordErrorMessage = false;
    this.showPhoneErrorMessage = false;  
  }

  render() {
    return (
        <ImageBackground source={{uri:'https://www.pictorem.com/collection/900_Rizwana-Khan_Green%20to%20yellow%20Gradient%20Background.jpg'}} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder={'Name'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlinecolorAndroid='transparent'
                        onChangeText = { (value) => this.name=value}
                        onFocus={()=>this.hideErrorMessages()}

                    />
                    {this.nameError && <View style={styles.alertIcon}><TouchableOpacity onPress={ () =>{this.hideErrorMessages(); this.showNameErrorMessage=true}}><Icon name={'ios-alert'} size={28} color={'#CC3300'}/></TouchableOpacity></View>}
                    {this.showNameErrorMessage &&   <Text style={styles.errorText}>Enter valid name</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'ios-call'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder={'Mobile'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlinecolorAndroid='transparent'
                        onChangeText = { (value) => this.phone=value}
                        onFocus={()=>this.hideErrorMessages()}

                    />
                    {this.phoneError && <TouchableOpacity style={styles.alertIcon} onPress={ () =>{this.hideErrorMessages(); this.showPhoneErrorMessage=true}}><Icon name={'ios-alert'} size={28} color={'#CC3300'}/></TouchableOpacity>}
                    {this.showPhoneErrorMessage &&   <Text style={styles.errorText}>Enter valid mobile no</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'ios-mail'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder={'Email'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlinecolorAndroid='transparent'
                        onChangeText = { (value) => this.email=value}
                        onFocus={()=>this.hideErrorMessages()}

                    />
                    {this.emailError && <TouchableOpacity style={styles.alertIcon} onPress={ () =>{this.hideErrorMessages(); this.showEmailErrorMessage=true}}><Icon name={'ios-alert'} size={28} color={'#CC3300'}/></TouchableOpacity>}
                    {this.showEmailErrorMessage &&   <Text style={styles.errorText}>Enter valid email</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={!this.showPassword}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlinecolorAndroid='transparent'
                        onChangeText = { (value) => this.password=value}
                        onFocus={()=>this.hideErrorMessages()}

                    />
                    {!this.passwordError ?
                        <TouchableOpacity style={styles.eyeIcon} onPressIn={() => {this.showPassword=true}} onPressOut={ () => {this.showPassword=false}}>
                            <Icon name={'ios-eye'} size={28} color={'rgba(255,255,255,0.7)'}/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.eyeIconPasswordError} onPressIn={() => {this.showPassword=true}} onPressOut={ () => {this.showPassword=false}}>
                            <Icon name={'ios-eye'} size={28} color={'rgba(255,255,255,0.7)'}/>
                        </TouchableOpacity>
                    }
                    {this.passwordError && <TouchableOpacity style={styles.alertIcon} onPress={ () =>{this.hideErrorMessages(); this.showPasswordErrorMessage=true}}><Icon name={'ios-alert'} size={28} color={'#CC3300'}/></TouchableOpacity>}
                    {this.showPasswordErrorMessage &&   <Text style={styles.errorText}>{this.errorMessagePassword}</Text>}
                </View>
                <TouchableOpacity onPress={()=>(this as any).props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.signinText}>Already have an account?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} onPress={()=>this.signInClicked()}>
                        <Text style={styles.btnText}>Create account</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {    
        flex: 1,
        justifyContent:'center',
        alignItems :'center'    
    },
    status : {
        height: Platform.OS === 'ios' ? 0 : 24,
    },
    input : {
        width : DEVICE_DIMENSIONS.width-55,
        height : 45,
        borderRadius : 25,
        fontSize:16,
        paddingLeft : 45,
        backgroundColor : 'rgba(0,0,0,0.35)' ,
        color : 'rgba(255,255,255,0.7)',
        marginHorizontal : 25,
    },
    inputContainer : {
        margin:10
    },
    inputIcon : {
        position : 'absolute',
        top:8,
        left:37
    },
    eyeIcon : {
        position : 'absolute',
        top : 8,
        right : 37
    },
    btnLogin : {
        marginTop:10,
        width : DEVICE_DIMENSIONS.width-55,
        height : 45,
        borderRadius : 25,
        backgroundColor : '#432577',
        justifyContent:'center',
    },
    signinText : {
        color:'white',
        fontSize:14
    },
    btnText : {
        color : 'rgba(255,255,255,0.7)',
        textAlign:'center',
        fontSize:19,

    },
    alertIcon:{
        position:'absolute',
        top:8,
        right:37,
        color:'red'
    },
    eyeIconPasswordError : {
        position:'absolute',
        top:8,
        right:65,
    },
    errorText : {
        position : 'absolute',
        width:220,
        right : 37,
        bottom : 36,
        backgroundColor: 'rgba(52, 52, 52, 1)',        color:'white',
        padding:4,
        borderTopColor:'red',
        borderTopWidth:1,
        zIndex:2
    }
});
