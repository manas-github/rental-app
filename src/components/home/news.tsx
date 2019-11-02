import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"

@observer
class news extends React.Component<any, any> {

    onPressLearnMore = () => {
        alert('pressed')
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/advertisement.jpeg')}
                />
                <Text style={styles.title}>Finally lorem ipsum lorem ipsumFinally lorem ipsum lorem ipsum Finally lorem ipsum lorem ipsum</Text>
                <Button
                    onPress={this.onPressLearnMore}
                    title="Learn More"
                    color="#ccc"
                    accessibilityLabel="Learn more about this purple button"
                />
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
        height: 300,
        paddingHorizontal: 40
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default news;
