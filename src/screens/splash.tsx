import React from 'react';
import { Image, Text, View,AsyncStorage } from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import {DEVICE_DIMENSIONS} from './../constant'
import { StackActions, NavigationActions } from 'react-navigation';

@observer
export default class Splash extends React.Component {
  @observable userLoaded : any = false;
  @observable openedFirstTime : any;
  @observable loggedIn : any;
  
  componentDidMount = async() =>{
    try {
      this.openedFirstTime = await AsyncStorage.getItem('openedFirstTime');
      this.loggedIn = await AsyncStorage.getItem('loggedIn');
      setTimeout(() => {
        this.navigateNow()
      }, 3000);      
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

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

  navigateNow = () => {
    let screen ="";
    console.log(this.loggedIn+"logggedin")
    if(this.openedFirstTime==null){
      screen = 'WalkthroughScreen'
    } 
    else if(this.loggedIn!=null && this.loggedIn =='true'){
        screen = 'HomeScreen'
    }
    else {
      screen = 'LoginScreen'
    }
    this.resetStack(screen);
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