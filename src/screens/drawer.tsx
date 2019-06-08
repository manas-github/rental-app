// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View,SafeAreaView,ScrollView,Dimensions,Image} from 'react-native';
// import {createDrawerNavigator,DrawerItems,createAppContainer} from 'react-navigation'
// import Home from './home'
// import ProductList from './productList'

// const {width} = Dimensions.get('window')


// export default class Drawer extends Component{
//   render() {
//     return (
//       <AppContainer />
//     );
//   }
// }

// const CustomDrawerComponent= (props) =>(
//   <SafeAreaView style={{flex:1}}>
//   <View style={{height:150,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
//   <Image source={require('./../assets/images/logo.png')} style={{height:90,width:90,borderRadius:60}} />
//   </View>
//   <ScrollView>
//   <DrawerItems {...props}/>
//   </ScrollView>
//   </SafeAreaView>
// )

// const AppDrawerNavigator = createDrawerNavigator(
// {
//     HomeScreen: { screen: Home },
//     //ProductScreen: { screen: ProductList },
// },
// {
//   contentComponent:CustomDrawerComponent,
//   drawerWidth: width,
//   contentOptions:{
//     activeTintColor:'orange'
//   }
// }
// )
// const AppContainer = createAppContainer(AppDrawerNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
  
// });