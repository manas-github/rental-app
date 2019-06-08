import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,FlatList} from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import { BallIndicator,BarIndicator,DotIndicator,MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator  } from 'react-native-indicators';
import {DEVICE_DIMENSIONS} from './../../constant'


interface props{
    navigation : any;
}
  

@observer
export default class Listing extends React.Component<props,any> {

    navigation: any;
    constructor(props :any){
        super(props);
        this.navigation = (this as any).props.navigation;
    }

    @observable productType = (this as any).props.navigation.getParam('productType');
    @observable isLoaded : boolean= false
    @observable keyProp:number=1
    // @observable data={furniture :[
    //   {id : 1,url: 'https://picsum.photos/640/644',title:'furniture1',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[100,200,300]},
    //   {id : 2,url:'https://picsum.photos/640/624',title:'furniture2',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[101,201,301]},
    //   {id : 3,url:'https://picsum.photos/640/614',title:'furniture3',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[102,202,302]},
    //   {id : 4,url:'https://picsum.photos/640/664',title:'furniture4',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[103,203,303]},
    //   {id : 5,url:'https://picsum.photos/640/694',title:'furniture5',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //   {id : 6,url:'https://picsum.photos/640/694',title:'furniture6',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //   {id : 7,url: 'https://picsum.photos/640/644',title:'furniture1',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[100,200,300]},
    //   {id : 8,url:'https://picsum.photos/640/624',title:'furniture2',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[101,201,301]},
    //   {id : 9,url:'https://picsum.photos/640/614',title:'furniture3',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[102,202,302]},
    //   {id : 10,url:'https://picsum.photos/640/664',title:'furniture4',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[103,203,303]},
    //   {id : 11,url:'https://picsum.photos/640/694',title:'furniture5',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //   {id : 12,url:'https://picsum.photos/640/694',title:'furniture6',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //   {id : 13,url: 'https://picsum.photos/640/644',title:'furniture1',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[100,200,300]},
    //   {id : 14,url:'https://picsum.photos/640/624',title:'furniture2',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[101,201,301]},
    //   {id : 15,url:'https://picsum.photos/640/614',title:'furniture3',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[102,202,302]},
    //   {id : 16,url:'https://picsum.photos/640/664',title:'furniture4',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[103,203,303]},
    //   {id : 17,url:'https://picsum.photos/640/694',title:'furniture5',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //   {id : 18,url:'https://picsum.photos/640/694',title:'furniture6',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]}
    // ],
    // appliance :[
    //     {id : 19,url: 'https://picsum.photos/640/644',title:'appliance1',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[100,200,300]},
    //     {id : 20,url:'https://picsum.photos/640/624',title:'appliance2',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[101,201,301]},
    //     {id : 21,url:'https://picsum.photos/640/614',title:'appliance3',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[102,202,302]},
    //     {id : 22,url:'https://picsum.photos/640/664',title:'appliance4',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[103,203,303]},
    //     {id : 23,url:'https://picsum.photos/640/694',title:'appliance5',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //     {id : 24,url:'https://picsum.photos/640/694',title:'appliance6',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //     {id : 25,url: 'https://picsum.photos/640/644',title:'appliance1',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[100,200,300]},
    //     {id : 26,url:'https://picsum.photos/640/624',title:'appliance2',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[101,201,301]},
    //     {id : 27,url:'https://picsum.photos/640/614',title:'appliance3',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[102,202,302]},
    //     {id : 28,url:'https://picsum.photos/640/664',title:'appliance4',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[103,203,303]},
    //     {id : 29,url:'https://picsum.photos/640/694',title:'appliance5',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //     {id : 30,url:'https://picsum.photos/640/694',title:'appliance6',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //     {id : 31,url: 'https://picsum.photos/640/644',title:'appliance1',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[100,200,300]},
    //     {id : 32,url:'https://picsum.photos/640/624',title:'appliance2',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[101,201,301]},
    //     {id : 33,url:'https://picsum.photos/640/614',title:'appliance3',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[102,202,302]},
    //     {id : 34,url:'https://picsum.photos/640/664',title:'appliance4',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[103,203,303]},
    //     {id : 35,url:'https://picsum.photos/640/694',title:'appliance5',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //     {id : 36,url:'https://picsum.photos/640/694',title:'appliance6',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]}
    //   ],
    //   package :[
    //     {id : 37,url: 'https://picsum.photos/640/644',title:'package1',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[100,200,300]},
    //     {id : 38,url:'https://picsum.photos/640/624',title:'package2',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[101,201,301]},
    //     {id : 39,url:'https://picsum.photos/640/614',title:'package3',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[102,202,302]},
    //     {id : 40,url:'https://picsum.photos/640/664',title:'package4',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[103,203,303]},
    //     {id : 41,url:'https://picsum.photos/640/694',title:'package5',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]},
    //     {id : 42,url:'https://picsum.photos/640/694',title:'package6',description:'lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum',price:[104,204,304]}
    //   ]

    // }
    @observable data = {"furniture" : {},"appliance":{},"package":{}}
    componentDidMount = async () =>{
        if(this.productType!=='searched'){
            const productListApi = 'https://api.myjson.com/bins/pbn12'
            const response = await fetch(productListApi);
            this.data = await response.json()
            this.isLoaded = true
        }
        else{
            const productListApi = 'https://api.myjson.com/bins/j1j2g'
            //const productListApi = 'https://api.myjson.com/bins/x1fi0'
            const response = await fetch(productListApi);
            this.data = await response.json()
            this.isLoaded = true
        }


    }

    navigateToProductDetailScreen = (id) =>{
        this.navigation.navigate('ProductDetailsScreen',{productId:id})
    }
    _renderItem = ({item}) => (
        <TouchableOpacity key={item.key} style={styles.grid} onPress={ () => this.navigateToProductDetailScreen(item.id)}>
            <Image source={{uri : item.url}} style={{  height: 158,borderRadius:0}}/>
            <View style={styles.titleAndPrice}>
                <Text style={styles.title}>{item.title.toUpperCase()}</Text>
                <Text style={styles.price}>Starting from &#8377;{item.price[0]}</Text>
            </View>
            {/* <Text style={styles.description}>{item.description}</Text> */}

        </TouchableOpacity>
      );
    _keyExtractor = (item, index) => this.keyProp && this.keyProp++;


  render() {
    
    const data = this.data[this.productType]
    if(this.isLoaded && data.length>0)
        return (
            <View>
                <FlatList
                    style={styles.flatlist}
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    numColumns={2}
                />
            </View>
        );
    else if(this.isLoaded)
        return(
            <Text>No such product found</Text>
        )
    else
    return (
        <View style={{justifyContent:'center',alignItems:'center',marginTop:DEVICE_DIMENSIONS.height/2-10}}>
            <BarIndicator 
                color='orange' 
                animationDuration={800}
                count={20}
                size={20}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    flatlist : {
    },
    titleAndPrice:{
        backgroundColor:'#DCDCDC',
        paddingVertical:5

    },
  title : {
    fontSize: 13

  },
  price : {
      fontSize: 12,
      fontStyle:'italic',


      
  },
  description : {
      fontStyle:'italic'
  },
  grid : {
      width:DEVICE_DIMENSIONS.width*0.5,
      padding:4

      
  }


});
