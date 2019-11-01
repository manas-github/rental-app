import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,FlatList,Dimensions,ScrollView,SafeAreaView,Platform} from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/Ionicons';
import { Api } from '../../api/api';
import { apisAreAvailable } from 'expo';

interface props{
    navigation : any;
}
  
@observer
export default class CartIcon extends React.Component<props,any> {
    navigation: any;
    constructor(props :any){
      super(props);
      this.navigation = (this as any).props.navigation;
    }
    @observable cartCount = (this as any).props.cartCount;

    componentDidUpdate(prevProps) {
        if(prevProps.value !== (this as any).props.cartCount) {
                this.cartCount = (this as any).props.cartCount
        }
    }
  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={()=> (this as any).props.navigation.navigate('CartScreen')}>
                <Icon 
                    name="ios-cart"
                    size={40}
                    color='grey'
                />
                {this.cartCount>0 && <View style={styles.cartNumber}><Text style={styles.cartTotalText}>{this.cartCount}</Text></View>}
            </TouchableOpacity> 
        </View>  
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    iconContainer : {
        paddingRight:6
    },
    cartNumber:{
        position : 'absolute',
        right:0,
        backgroundColor:'black',
        color:'white',
        fontWeight:'600',
        height:20,
        width:20,
        borderRadius:20,
        borderColor:'black',
        borderWidth:0.5
    } ,
    cartTotalText : {
        color:'white',
        alignSelf:'center'
    }    


});
