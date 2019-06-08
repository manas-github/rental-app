import React from 'react';
import { StyleSheet, View,ScrollView,SafeAreaView,Platform} from 'react-native';
import { observer } from "mobx-react"
import UserCart from './../components/cart/userCart'
import CartFooter from './../components/cart/footer'

@observer
export default class Cart extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                {/* <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}> */}
                    <View style={styles.status}/>
                     {/* <ScrollView> */}
                        <UserCart navigation={(this as any).props.navigation}/>
                   {/* / </ScrollView> */}
                {/* </SafeAreaView> */}
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
