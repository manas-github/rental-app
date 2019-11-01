import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,FlatList,Dimensions,ScrollView,SafeAreaView,Platform} from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import ProductDetails from './../components/productDetails/productDetails'
import Icon from 'react-native-vector-icons/Ionicons';
import CartIcon from './../components/home/cartIcon'
import { Api } from '../api/api';
@observer
export default class Product extends React.Component {

    static navigationOptions = ({ navigation }, cartCount) => {
        return {
          headerTitle: '',
          headerRight: (
                  <CartIcon navigation={navigation} cartCount={navigation.state.params.cartCount}/>
          )
        };
    }
    @observable api = new Api()
    @observable cartCount=0;
    @observable willFocusSubscription

  componentDidMount = async () =>{
    try {
      const res = await this.api.getCartItemCount();
      console.log(res)
      if (res && res.data) {
          this.cartCount = res.data
          let cartCount = this.cartCount;
          (this as any).props.navigation.setParams({cartCount});
          console.log(this.cartCount)
      }
    } catch (error) {
        this.cartCount=-1;
    }
    this.willFocusSubscription = (this as any).props.navigation.addListener(
      'willFocus',
      async ()  => {
        try {
          const res = await this.api.getCartItemCount();
          console.log(res)
          if (res && res.data) {
              this.cartCount = res.data
              let cartCount = this.cartCount;
              (this as any).props.navigation.setParams({cartCount});
              console.log(this.cartCount)
          }
        } catch (error) {
            this.cartCount=-1;
        }
      }
    );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  
  render() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.status}/>
                    <ProductDetails cartCount={this.cartCount} navigation={(this as any).props.navigation}/>
            </SafeAreaView>
        </View>    
        );
  }
}
const styles = StyleSheet.create({
    container: {
    
        flex: 1,
        
      },
      status : {
        height: Platform.OS === 'ios' ? 0 : 0,
      }


});
