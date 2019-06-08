import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,FlatList,Dimensions,ScrollView,SafeAreaView,Platform} from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import ProductDetails from './../components/productDetails/productDetails'
import Icon from 'react-native-vector-icons/Ionicons';
import CartIcon from './../components/home/cartIcon'
@observer
export default class Product extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: '',
          headerRight: (
                  <CartIcon navigation={navigation}/>

          )
        };
    }
  render() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.status}/>
                    <ProductDetails navigation={(this as any).props.navigation}/>
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
