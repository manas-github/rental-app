import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal,TouchableHighlight,ScrollView} from 'react-native';
import {observable, values} from 'mobx'
import { observer } from "mobx-react"
import ProductImageSlider from './productImageSlider'
import {DEVICE_DIMENSIONS,Toast} from './../../constant'

import Icon from 'react-native-vector-icons/Ionicons';


interface props{
  navigation : any;
}

@observer
export default class ProductDetails extends React.Component<props,any> {

  navigation: any;
  constructor(props :any){
    super(props);
    this.navigation = (this as any).props.navigation;
  }

  @observable productId = (this as any).props.navigation.getParam('productId');
  @observable details = {id :'101',title : 'Upholstered Storage Double Bed',description:'A reliable yet simplistic upholstered bed with storage. It promotes comfort as well as provides extra space for storage.',images:{},tenure:['3','6','9','12','18','24'],price:[800,750,650,600,550,485]};
  @observable tenureSelected = this.details.tenure[this.details.tenure.length-1];
  @observable quantitySelected = 0;
  @observable priceSelected = this.details.price[this.details.tenure.length-1]
  @observable cartItems = {id :['105','104'] , tenure :['3','9'], quantity :[1,2]}
  @observable modalVisible = false;
  @observable showToast = false;

  addToCartPressed = () =>{
    let isFound = false;
    for(let i=0;i<this.cartItems.id.length;i++){
      if(this.details.id === this.cartItems.id[i] && this.tenureSelected==this.cartItems.tenure[i]){
        isFound = true
      }
    }
    if(!isFound){
      this.cartItems.id.push(this.details.id)
      this.cartItems.tenure.push(this.tenureSelected)
      this.cartItems.quantity.push(1)
   //   alert("Added to cart")
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 2500);
    }
    else{
      alert('Item already present in cart')
    }
  }

  selectTenure = (index) =>{
    this.tenureSelected = this.details.tenure[index]
    this.priceSelected = this.details.price[index]
  }
  
  renderTenure =(val,index) => {
    if(this.details.tenure[index] == this.tenureSelected)
      return(
        <View style={{opacity:0.2}} key={index}>
        <TouchableOpacity disabled={true} style={styles.tenureBlock} key={index} onPress={() => this.selectTenure(index)}>
            <Text style={styles.tenureText}>{val}</Text>
        </TouchableOpacity>
        </View>
      )
    else
      return(
        <View style={{opacity:1}} key={index}>
      <TouchableOpacity style={styles.tenureBlock} key={index} onPress={() => this.selectTenure(index)}>
        <Text style={styles.tenureText}>{val}</Text>
      </TouchableOpacity>
        </View>
    )    
  }

  render() {
    return (
        <View style={{flex:1,opacity:this.modalVisible?0.1:1.0}}>
        <ScrollView>
            <View style={styles.imageSliderContainer}>
              <ProductImageSlider/>
            </View>

            <Text style={styles.title}>{this.details.title.toUpperCase()}{this.productId}</Text>
            <Text style={styles.description}>{this.details.description}</Text>
            <Text style={styles.tenureTitle}>Select tenure (in months) </Text>
            <View style={styles.tenure}>
                {this.details.tenure.map((val,index)=>this.renderTenure(val,index))}
            </View>
            <View style={styles.rentAndDeposit}>
              <Text style={styles.rent}>Rent : &#8377; {this.priceSelected}</Text>
              <Text style={styles.deposit}>Deposit : &#8377; {this.priceSelected}</Text>
            </View>
            {/* <TouchableOpacity
                onPress={this.addToCartPressed}
            >
              <Text style={styles.addToCart}>Add to cart</Text>
            </TouchableOpacity> */}

            <ContentDivider/>
            <View style={styles.ourPromise}>
               <Text style={styles.ourPromiseTitle}>Voorent Promise</Text>
               <View style={{flexDirection:'row'}}>
                <View style={{flex:0.15,alignItems:'center'}}>
                <Icon 
                    name="ios-checkmark"
                    size={40}
                    color='green'
                />
                </View>
                <View style={{flex:0.85}}>
                  <Text style={{fontWeight:'500'}}>Similar to new</Text>
                  <Text style={{fontWeight:'100',paddingTop:2,paddingBottom:16}}>All our products are cleaned and inspected properly before delivery.</Text>
                </View>
               </View>
               <View style={{flexDirection:'row'}}>
                <View style={{flex:0.15,alignItems:'center'}}>
                <Icon 
                    name="ios-checkmark"
                    size={40}
                    color='green'
                />
                </View>
                <View style={{flex:0.85}}>
                  <Text style={{fontWeight:'500'}}>100% Refund </Text>
                  <Text style={{fontWeight:'100',paddingTop:2,paddingBottom:16}}>We promise to refund 100% security amount in case you don't like it</Text>
                </View>
               </View>
            </View>
            <ContentDivider/>
            <View style={styles.ourPromise}>
               <Text style={styles.ourPromiseTitle}>Important Terms</Text>
               <View style={{flexDirection:'row'}}>
                <View style={{flex:0.15,alignItems:'center'}}>
                <Icon 
                    name="ios-lock"
                    size={40}
                    color='grey'
                />
                </View>
                <View style={{flex:0.85}}>
                  <Text style={{fontWeight:'500'}}>Refundable depost</Text>
                  <Text style={{fontWeight:'100',paddingTop:2,paddingBottom:16}}>We charge one month rental as refundable security deposit</Text>
                </View>
               </View>
               <View style={{flexDirection:'row'}}>
                <View style={{flex:0.15,alignItems:'center'}}>
                <Icon 
                    name="ios-calendar"
                    size={40}
                    color='grey'
                />
                </View>
                <View style={{flex:0.85}}>
                  <Text style={{fontWeight:'500'}}>Rental tenure</Text>
                  <Text style={{fontWeight:'100',paddingTop:2,paddingBottom:16}}>We bill the product for a minimum renting tenure of 3 months</Text>
                </View>
               </View>
            </View>
            <ContentDivider/>


            <View style={styles.guarantee}>
            <Text>Our promise</Text>





                <Text>Free shipping</Text>
                <Text>Free setup</Text>
                <Text>Free relocation</Text>
                <Text>Our promise</Text>
                <Text>Free shipping</Text>
                <Text>Free setup</Text>
                <Text>Free relocation</Text>
            </View>
            <View>
              <Text>Share</Text>
            </View>
            </ScrollView>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,backgroundColor:'white',height:50}}>
              <TouchableOpacity onPress={() => {this.addToCartPressed()}}>
                <Text style={styles.addToCart}>ADD TO CART</Text>
              </TouchableOpacity>
              {this.showToast && <Toast message="Added to cart"/>}

            </View>
        </View>    
      );
  }
}

class ContentDivider extends React.Component <any,any>{

  render() {
    return (
        <View style={{height:10,backgroundColor:'#DCDCDC'}}/>
    );
  }

}

const styles = StyleSheet.create({
  container : {
    flex:1,
    
  },
  imageSliderContainer : {
    height: DEVICE_DIMENSIONS.height*0.4
  },
  tenureBlock :{
    width:35,
    height:35,
    borderWidth:1,
    margin:6,
    justifyContent:'center',
  },
  modal : {

    marginTop: DEVICE_DIMENSIONS.height*0.35,
    height:DEVICE_DIMENSIONS.height*0.3,
    width:DEVICE_DIMENSIONS.width*0.9,
    marginLeft:DEVICE_DIMENSIONS.width*0.05,
    backgroundColor:'rgb(234, 163, 61)'
  },
  tenure :{
    flexDirection : 'row',
    alignContent:'center',
    justifyContent : 'center',
    
  },
  tenureText : {
    alignSelf:'center',
    padding:4,
    fontSize:18
    
  },
  tenureTitle : {
    padding:4,
    fontSize:18,
    marginLeft : 8,
    alignSelf:'center',
    justifyContent : 'center',
    fontStyle : 'italic'
  },
  title : {
    padding:5,
    fontSize:18,
    fontWeight:'bold'
  },
  description : {
    padding:7,
    fontStyle:'italic',
    color:'#2F4F4F'
  },
  rentAndDeposit: {
    flexDirection:'row',
    justifyContent:'space-around',
    padding:20,
    
  },
  rent : {
    fontSize :20
  },
  deposit : {
    fontSize:20
  },
  doublestar : {
    paddingLeft:10
  },
  addToCart : {
    margin:0,
    borderWidth:0,
    borderRadius:0,
    backgroundColor :'rgb(234, 163, 61)',
    overflow:'hidden',
    padding:8,
    fontSize:16,
    textAlign:'center',
    textAlignVertical: "center",
    height:50

    
  },
  ourPromiseTitle : {
    fontSize:18,
    paddingBottom:12,
  },
  ourPromise : {
    padding:14
  }
 


});
