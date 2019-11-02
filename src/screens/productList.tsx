import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Platform } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import Listing from './../components/productList/listing'

@observer
export default class ProductList extends React.Component {

    @observable productType = (this as any).props.navigation.getParam('productType');

    static navigationOptions = ({ navigation }) => {
        if (navigation.getParam('productType') == 'searched')
            return {
                title: navigation.getParam('searchKey').toUpperCase(),

            }
        return {
            title: navigation.getParam('productType').toUpperCase(),
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.status} />
                    <ScrollView>
                        <Listing navigation={(this as any).props.navigation} />
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    status: {
        height: Platform.OS === 'ios' ? 0 : 0,
    }
});
