import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import {} from "../constant";

@observer
export default class OrderConfirmation extends React.Component<any, any> {

    @observable orderId = 0
    @observable status = ""
    componentDidMount = async () => {
        this.orderId =  (this as any).props.navigation.state.params.orderId
        this.status = (this as any).props.navigation.state.params.status

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Order placed successfully</Text>
                <Text>tick image</Text>
                <Text>Click here to visit order section</Text>
                <Text>{this.orderId }</Text>
        <Text>{this.status }</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   


});

