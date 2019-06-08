import React from 'react';
import { Image, Text, View,AsyncStorage } from 'react-native';
import { Asset, AppLoading, SplashScreen } from 'expo';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import {DEVICE_DIMENSIONS} from './../constant'

@observer
export default class Splash extends React.Component {
  @observable userLoaded : any = false;
  
  componentDidMount = async() =>{
    try{
    const value = await AsyncStorage.getItem('loggedIn');
      
    setTimeout(() => {
        if(value!==null){
            (this as any).props.navigation.navigate('HomeScreen')
        }
        else
        (this as any).props.navigation.navigate('LoginScreen')

    }, 3000);
      
    } catch (error) {
      // Error retrieving data
    }
  }
  navigateNow = () => {

  }
  render() {
    if (!this.userLoaded) {
      return (
        <Image
            style={{height:DEVICE_DIMENSIONS.height,width:DEVICE_DIMENSIONS.width}}
            source={require('./../assets/images/splash2.gif')}
        />
      );
    }
   else{
       return(
           <Text>hello</Text>
       )
   }
     
  }


}