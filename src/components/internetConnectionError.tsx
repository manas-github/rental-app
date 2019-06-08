import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity ,FlatList,Dimensions} from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"





@observer
export default class InternetConnectionError extends React.Component<any, any> {
  
 

  render() {

    return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Could not connect to the internet. Please check your connection</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },

});

