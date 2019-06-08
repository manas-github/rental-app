import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {observable} from 'mobx'
import { observer } from "mobx-react"

@observer
class Sponsored extends React.Component<any, any> {

  render() {
    return (
      <View style={styles.container}>
            <Text>Sponsored</Text>
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
  },
});

export default  Sponsored;
