import React from 'react';
import { StyleSheet, View, TouchableOpacity,TextInput,Dimensions} from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/Ionicons';
import {DEVICE_DIMENSIONS} from './../../constant'

interface props{
  navigation : any;
}

@observer
class Searchbar extends React.Component<any, any> {

  navigation: any;
  constructor(props :any){
      super(props);
      this.navigation = (this as any).props.navigation;
  }

  navigateToSearchScreen = () => {
    this.navigation.navigate('SearchScreen')
  }

  render() {
    return (
      <TouchableOpacity onPress={ () => this.navigateToSearchScreen()}>
        <View style={styles.container}>
          <View style={styles.searchbarContainer}>
            <View style={styles.searchbar}>
              <Icon  
                name={'ios-search'} 
                size={26} 
                style={styles.searchbarIcon}
              />
              <TextInput
                style={styles.input}
                onFocus={ ()=> this.navigateToSearchScreen()}
                placeholder={'Search your products here'}
                placeholderTextColor={'white'}
              />  
            </View>
          </View>              
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
        width:'100%',
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

export default  Searchbar;
