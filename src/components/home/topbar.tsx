import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/Ionicons';
import CartIcon from './cartIcon'
import { Api } from '../../api/api';
interface props{
    navigation : any;
}

@observer
class Topbar extends React.Component<any, any> {
    navigation: any;
    constructor(props :any){
      super(props);
      this.navigation = (this as any).props.navigation;
    }

    @observable cartCount = 0;

    componentDidMount = async () =>{
      let api = new Api()
      try {
        const res = await api.getCartItemCount();
        console.log(res)
        if (res && res.data) {
            this.cartCount = res.data
            console.log(this.cartCount)
        }
      } catch (error) {
          this.cartCount=-1;
      }
    }
    

    navigateToCart = () => {
        (this as any).props.navigation.navigate('CartScreen');
    }
    openModal = () => {
        //console.log((this as any).props);
        (this as any).props.openModal(); // Same as this.props.onPress && this.props.onPress();
        //console.log((this as any).props);

    }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.menu}
            onPress={()=>this.openModal()}
        >
            <Icon 
                name="ios-menu"
                size={40}
                //style={{flex:1,alignSelf:'center'}}
            />
        </TouchableOpacity>
        
        <Image
          style={styles.logo}
          //style={{flex:4,width: 150, height: 32}}
          source={require('./../../assets/images/demologo.png')}
        />

       <View
            style={styles.cart}
        >
        {/* <TouchableOpacity onPress={ () => this.navigateToCart()}>
            
        </TouchableOpacity> */}
            <CartIcon cartCount={this.cartCount} navigation={(this as any).props.navigation}/>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor:'white',
    width:'100%',
    justifyContent:'space-between',
    height:52,
    paddingHorizontal:5


  },
  logo : {
      width:150,
      height:32,
      alignSelf:'center'
  },
  cart : {
      
      alignSelf:'center'

  },
  menu : {
      alignSelf:'center',
      

  }
});

export default  Topbar;
