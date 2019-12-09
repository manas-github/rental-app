import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/Ionicons';

@observer
export default class OrderConfirmation extends React.Component<any, any> {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "ORDER STATUS"
        }

    };

    @observable orderId = 0
    @observable status = ""
    componentDidMount =  () => {
       this.orderId =  (this as any).props.navigation.state.params.orderId
       this.status = (this as any).props.navigation.state.params.status
    }

    navigateTo = (screen) => {
        (this as any).props.navigation.navigate(screen)
    }

    render() {
        if(this.status=="success")
            return (
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Icon
                            name="ios-checkmark-circle-outline"
                            size={70}
                            color="#ffa366"
                        />
                    </View>
                    <Text style={{textAlign:"center"}}>Order placed</Text>
                    <Text style={{textAlign:"center"}}>Order id : {this.orderId}</Text>

                    <TouchableOpacity onPress={()=>this.navigateTo('SubscriptionsScreen')}>
                        <Text style={styles.button}>
                            My orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navigateTo('HomeScreen')}>
                        <Text style={styles.button}>
                            Home
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        else if(this.status=="failed") {
            return (
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Icon
                            name="ios-warning"
                            size={70}
                            color="#ffa366"
                        />
                    </View>
                    <Text style={{textAlign:"center"}}>Transaction failed</Text>
                    <TouchableOpacity onPress={()=>this.navigateTo('CartScreen')}>
                        <Text style={styles.button}>
                            Try again
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navigateTo('HomeScreen')}>
                        <Text style={styles.button}>
                            Home
                        </Text>
                    </TouchableOpacity>

            </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                <Text>Error</Text>


            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon : {
        justifyContent:"center",
        alignItems:"center",
        marginTop:80
    },
    button : {
        backgroundColor:"#ffa366",
        marginHorizontal:100,
        height:40,
        textAlign:"center",
        marginTop:15,
        paddingTop:10,
        color:"white"
    }
   


});

