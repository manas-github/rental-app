import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput} from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/Ionicons';
import {DEVICE_DIMENSIONS} from './../../constant'


interface props{
  navigation : any;
}

@observer
export default class SearchProducts extends React.Component<props,any> {
  navigation: any;
    constructor(props :any){
        super(props);
        this.navigation = (this as any).props.navigation;
    }

  @observable searchKey = ''
  @observable searchItems ={id:['1','2','3']}
  @observable historyKeywords = ['Search1','search2','search3 barak','search4']
  @observable title=['title','fdgfasdfs','fdgjujukyu','qwert','yuiop','ertyui']
  @observable titleMatched=['']
  @observable historyMatched=['']
  @observable noMatch =['']

  componentDidMount = () => {
    this.historyKeywords.forEach(val => {
      this.historyMatched.push(val)
    })
    this.historyMatched.shift()
    this.titleMatched=[]
    this.noMatch=[]
  }

  updateSearchKey = (value) => {
    this.searchKey=value
    this.search(value)
  }

  search = (val) => {
    this.historyMatched=['']
    this.historyKeywords.forEach(item => {
      if(item.toLowerCase().indexOf(val.toLowerCase())!=-1)
          this.historyMatched.push(item)
    });
    this.titleMatched=['']
    if(val!=''){
      this.title.forEach(item => {
        if(item.toLowerCase().indexOf(val.toLowerCase())!=-1)
            this.titleMatched.push(item)
      });
    }
    if(this.titleMatched.length==1 && this.historyMatched.length==1 && this.titleMatched[0]=='' && this.historyMatched[0]=='' ){
      this.noMatch=['']
      this.noMatch.push(val)
      this.noMatch.shift()
    }
    if(val==''){
      this.noMatch=[]
    }
    this.historyMatched.shift()
    this.titleMatched.shift()
}

  remove = (index) => {
    this.historyMatched.splice(index,1)
  }

  searchProducts = (val) =>{
    (this as any).props.navigation.navigate('ProductListScreen',{productType:'searched',searchKey:val});
  }

  renderItems = (val,index,type) =>{
    if(type=='history'){
      return(
        <View key={index} style={styles.listBox}>
          <View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() =>this.search(val)}>
                  <Icon 
                    name="ios-time"
                    size={32}
                  /> 
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>this.searchProducts(val)}>       
                  <Text style={{fontSize:18,paddingTop:5,paddingRight:50}}>   {val}</Text>
                </TouchableOpacity>  
              </View>
              <View style={{textAlign:'right',paddingRight:8}}>
                <TouchableOpacity onPress={() =>this.remove(index)}>
                  <Icon 
                    name="ios-trash"
                    size={26}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
    }  
    if(type=='title'){
        return(
          <View key={index} style={styles.listBox}>
            <View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={() =>this.search(val)}>
                    <Icon 
                      name="ios-search"
                      size={32}
                    /> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.searchProducts(val) }>       
                    <Text style={{fontSize:18,paddingTop:5,paddingRight:50}}>   {val}</Text>
                  </TouchableOpacity>  
                </View>
              </View>
            </View>
          </View>
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchbarContainer}>
          <View style={styles.searchbar}>
            <Icon  name={'ios-search'} size={26} style={styles.searchbarIcon}/>
            <TextInput
              style={styles.input}
              placeholder={'Search your product here'}
              placeholderTextColor={'white'}
              value={this.searchKey}
              autoFocus={true}
              onChangeText={(value)=>{this.updateSearchKey(value)}}
            />  
          </View>
        </View>   
        {this.historyMatched.map((val,index)=>this.renderItems(val,index,'history'))}
        {this.titleMatched.map((val,index)=>this.renderItems(val,index,'title'))}
        {this.noMatch.map((val,index)=>this.renderItems(val,index,'title'))}
      </View>    
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listBox :{
      height:60,
      borderWidth:0.2,
      borderColor:'black',
      opacity:0.4,
      justifyContent:'center',
      
    },
    searchbarContainer : {
      height:52,
      backgroundColor:'#ffa366'
    },
    searchbar : {
      height:40,
      marginTop:6,
      marginHorizontal:4,
      backgroundColor:'#ffc299',
    },
    input : {
      height:40,
      width: DEVICE_DIMENSIONS.width-20,
      fontSize:18,
      paddingLeft:32
    },
    inputContainer : {
      height:40
    },
    searchbarIcon : {
      position : 'absolute',
      top:6,
      left:4
    }


});
