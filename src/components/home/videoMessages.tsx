import React from 'react';
import { StyleSheet, Text, View,WebView } from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"
import Video from 'react-native-video';

@observer
class VideoMessages extends React.Component<any, any> {

  onBuffer = () => {

  }
  videoError = () => {

  }

  render() {
    return (
      <View style={styles.container}>
       
            <Text>video</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:400
  },

});

export default  VideoMessages;
