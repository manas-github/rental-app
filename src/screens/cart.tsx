import React from 'react';
import { StyleSheet, View,Platform} from 'react-native';
import { observer } from "mobx-react"
import UserCart from './../components/cart/userCart'

@observer
export default class Cart extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "CART"
        }

    };

    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.status}/>
                        <UserCart navigation={(this as any).props.navigation}/>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {    
        flex: 1,    
    },
    status : {
        height: Platform.OS === 'ios' ? 0 : 24,
    }
});
