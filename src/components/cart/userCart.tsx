import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,Dimensions,ScrollView,Platform} from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIndicator } from 'react-native-indicators';
import CartFooter from './../../components/cart/footer'
import {Toast} from './../../constant'

@observer
export default class UserCart extends React.Component<any,any> {

    @observable cartItems = {"id": ['1'],"tenure": [],"quantity": []}
    @observable productDetails = [{id :'',title : '',description:'',images:{},tenure:[],price:[]}]
    @observable maxQuantityToastVisible = false;
    @observable cartLoaded = false
    @observable totalAmount = 0
    @observable savedItems ={id:[''],tenure:[''],quantity:['']}

    componentDidMount = async () => {
        this.getUpdatedCart()
    }

    getUpdatedCart = async () => {
        const fetchCartItemsAPI = 'https://api.myjson.com/bins/mo704'
        const response = await fetch(fetchCartItemsAPI)
        this.cartItems = await response.json()
        this.productDetails.pop()
        
        this.cartItems.id.forEach(async element => {
            const api='https://api.myjson.com/bins/1cfa04'
            const response = await fetch(api)
            const jsonResponse = await response.json()
            this.productDetails.push(await jsonResponse)
            let quantity :any = this.cartItems.quantity[this.cartItems.id.indexOf(element)]
            quantity  = parseInt(quantity,10)+1 //adding deposit to total amount
            this.totalAmount = this.totalAmount + (quantity*jsonResponse.price[jsonResponse.tenure.indexOf(this.cartItems.tenure[this.cartItems.id.indexOf(element)])])
        });
        this.cartLoaded = true
    }
  //  @x cartItems = {id :['p1','p2','p3','p4','p5','p6'] , tenure :['3','9','12','3','3','6'], quantity :['1','2','1','2','1','3']}
  //  @observable details1 = {id :'p1',title : 'Parasnath Home Pro 5 Step 5.1 Ft Light Weight Aluminium Heavy Duty Folding Ladder(Made in India)',description:'A reliable yet simplistic upholstered bed with storage. It promotes comfort as well as provides extra space for storage.',images:{},tenure:['3','6','9','12','18','24'],price:[800,750,650,600,550,485]};
  //  @observable details2 = {id :'p2',title : 'Product 2 title',description:'A reliable yet simplistic upholstered bed with storage. It promotes comfort as well as provides extra space for storage.',images:{},tenure:['3','6','9','12','18','24'],price:[800,750,650,600,550,485]};
  //  @observable details3 = {id :'p3',title : 'Product 3 title',description:'A reliable yet simplistic upholstered bed with storage. It promotes comfort as well as provides extra space for storage.',images:{},tenure:['3','6','9','12','18','24'],price:[800,750,650,600,550,485]};
  //  @observable details4 = {id :'p4',title : 'Product 4 title',description:'A reliable yet simplistic upholstered bed with storage. It promotes comfort as well as provides extra space for storage.',images:{},tenure:['3','6','9','12','18','24'],price:[800,750,650,600,550,485]};
  //  @observable details5 = {id :'p5',title : 'Product 5 title',description:'A reliable yet simplistic upholstered bed with storage. It promotes comfort as well as provides extra space for storage.',images:{},tenure:['3','6','9','12','18','24'],price:[800,750,650,600,550,485]};
  //  @observable details6 = {id :'p6',title : '123456789012 kv sjhfv sjh 345678901123',description:'A reliable yet simplistic upholstered bed with storage. It promotes comfort as well as provides extra space for storage.',images:{},tenure:['3','6','9','12','18','24'],price:[800,750,650,600,550,485]};
    
    getItem = (val) => {
        const index = this.cartItems.id.indexOf(val)
        return this.productDetails[index]
    }
    
    deleteFromCart = (index) => {
        this.cartItems.id.splice(index, 1)
        this.cartItems.tenure.splice(index,1)
        this.cartItems.quantity.splice(index,1)
        this.productDetails.splice(index,1)
        this.getUpdatedCart()
    }

    updateItemQuantityAPI = ()  => {
        const newCartItem = this.cartItems
        //posting API
        return true        
    }

    save = (index) => {
        this.savedItems.id.push(this.cartItems.id[index])
        this.savedItems.tenure.push(this.cartItems.tenure[index])
        this.savedItems.quantity.push(this.cartItems.quantity[index])
        this.deleteFromCart(index)
    }

    changeQuantity = (type:string,index:number) =>{
        let q = parseInt(this.cartItems.quantity[index])
        if(type=='increase'){
            if(q==5){
                // alert('Max quantity limit reached for this item')
                this.maxQuantityToastVisible = true
                setTimeout(() => {
                    this.maxQuantityToastVisible = false
                  }, 2500);
            }
            else{
                if(this.updateItemQuantityAPI()){
                    (this as any).cartItems.quantity[index] = (q+1).toString()
                    const price = this.productDetails[index].price[this.productDetails[index].tenure.indexOf(this.cartItems.tenure[index])]
                    this.totalAmount = this.totalAmount + price
                }
            }
        }
        else if(type=='decrease' && q!=1){
            if(this.updateItemQuantityAPI()){
                (this as any).cartItems.quantity[index] = (q-1).toString()
                const price = this.productDetails[index].price[this.productDetails[index].tenure.indexOf(this.cartItems.tenure[index])]
                this.totalAmount = this.totalAmount - price
            }
        }
    }

    renderItems = (val, index) =>{
        let currentItem =this.cartLoaded && this.getItem(val)
        let price = this.cartLoaded && currentItem && currentItem.price[currentItem.tenure.indexOf(this.cartItems.tenure[index])]
        let formattedTitle = this.cartLoaded && currentItem && (currentItem.title.length>=25 ? currentItem.title.substring(0,25)+'...' : currentItem.title)
        
        return(            
            <View key={index} style={{backgroundColor:'#d3d3d3',margin:0}}>
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{width:Dimensions.get('window').width*0.65,padding:5}}>
                        <Text style={{fontSize:16,fontWeight:'600'}}>{formattedTitle}</Text>
                        <Text style={{fontSize:12,paddingTop:10}}>Tenure : {this.cartItems.tenure[index]} month</Text>
                        <Text style={{fontSize:12}}>Deposit : &#8377; {price}</Text>
                        <Text style={{fontSize:12,paddingBottom:10}}>Rent : &#8377; {price}/month</Text>
                        <Text style={{fontSize:12}}>Delivery in 2 days, Sat | Free</Text>
                    </View>
                    <View style={{width:Dimensions.get('window').width*0.35}}>
                        <Image
                            style={{ height: 80}}
                            source={{uri: 'https://www.brooksrunning.com/dw/image/v2/aaev_prd/on/demandware.static/-/Sites-BrooksCatalog/default/dw58b5a708/images/ProductImages/120266/120266_084_l_WR.jpg?sw=900'}}
                        />
                        <View style={{flexDirection:'row',padding:5}}>
                            <Text style={{fontSize:16}}>Qty :  </Text>
                            <TouchableOpacity onPress={() =>this.changeQuantity('decrease',index)}>
                                <Icon 
                                    name="ios-remove-circle-outline"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Text style={{fontSize:16}}>  {this.cartItems.quantity[index]}  </Text>
                            <TouchableOpacity onPress={() =>this.changeQuantity('increase',index)}>
                               <Icon 
                                    name={"ios-add-circle-outline"}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1}} onPress={()=>this.save(index)}>
                        <Text style={styles.saveDeleteBtn}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=>this.deleteFromCart(index)}>
                        <Text style={styles.saveDeleteBtn}>Remove</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:20,backgroundColor:'white'}}>
                </View>
            </View>
        )
    }

    render() {
        if(!this.cartLoaded || (this.cartItems.id.length!=this.productDetails.length))
            return (
                <View style={{justifyContent:'center',alignItems:'center',height:320}}>
                    <MaterialIndicator 
                        color='orange' 
                        animationDuration={800}
                        count={20}
                        size={20}
                    />
                </View>
            )
        if(this.cartLoaded && this.cartItems.id.length<1) 
            return (
                <View style={styles.container}>
                    <Text>Your cart is empty</Text>
                </View>    
                )
        else if(this.cartLoaded && this.cartItems.id.length===this.productDetails.length)
            return(
                <View style={styles.container}>
                    <ScrollView>
                        {this.cartItems.id.map((val,index)=>this.renderItems(val,index))}
                        <View style={{height:40}}/>
                    </ScrollView>
                        {this.maxQuantityToastVisible && <Toast message="Max quantity reached for this product"/>}
                    <CartFooter navigation={(this as any).props.navigation} amount ={this.totalAmount} screen='cart'/>
                </View>
            )
        else
            return (
                <View style={styles.container}>
                    <Text>If you are seeing this, please contact our support team</Text>
                </View>  
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
    },
    status : {
        height: Platform.OS === 'ios' ? 0 : 24,
    },
    saveDeleteBtn : {
        fontSize:18,
        padding:6,
        borderWidth:1,
        textAlign:'center',
        borderColor:'#DCDCDC',
        backgroundColor : '#eee9e9'            
    }
});
