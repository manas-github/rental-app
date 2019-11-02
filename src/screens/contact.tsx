import React from 'react';
import { StyleSheet, TextInput, View, ScrollView, Linking, SafeAreaView, Platform, Text, TouchableOpacity } from 'react-native';
import { observer } from "mobx-react"
import { observable } from 'mobx';
import { Icon } from 'react-native-elements';
import { DEVICE_DIMENSIONS } from '../constant';

@observer
export default class Contact extends React.Component {

    @observable name = ''
    @observable phone = ''
    @observable message = ''

    updateInput = (feild, value) => {
        if (feild === 'name') {
            this.name = value
        }
        else if (feild === 'phone') {
            this.phone = value
        }
        else if (feild === 'message') {
            this.message = value
        }

    }
    callmeback = () => {
        let subject = 'sub'
        let message = this.message
        let load = 'mailto:somethingemail@gmail.com?subject=' + subject + '&body=' + message + ''
        Linking.openURL(load)

    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.status} />
                    <ScrollView>
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>Send us a message</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.updateInput('name', text)}
                                value={this.name}
                                placeholder={'Name'}
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.updateInput('phone', text)}
                                value={this.phone}
                                placeholder={'Mobile'}
                            />
                            <TextInput
                                style={styles.messageInput}
                                onChangeText={(text) => this.updateInput('message', text)}
                                value={this.message}
                                placeholder={'Enter you message here...'}
                                multiline={true}
                                maxLength={360}
                            />
                            <TouchableOpacity style={styles.callmebackButton} onPress={() => this.callmeback()}>
                                <Text style={{ textAlign: 'center' }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ textAlign: 'center', marginTop: 30, padding: 8 }}>Other options to connect</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity>
                                <Icon
                                    name="call"
                                    size={80}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name="mail"
                                    size={80}
                                />
                            </TouchableOpacity>
                        </View>
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
        height: Platform.OS === 'ios' ? 0 : 24,
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: DEVICE_DIMENSIONS.width - 55,
        height: 40,
        backgroundColor: '#E4D9D6',
        marginBottom: 8,
        padding: 8,
        borderRadius: 8
    },
    messageInput: {
        width: DEVICE_DIMENSIONS.width - 55,
        height: 180,
        backgroundColor: '#E4D9D6',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8
    },
    callmebackButton: {
        width: DEVICE_DIMENSIONS.width - 55,
        height: 40,
        backgroundColor: 'orange',
        borderRadius: 8,
        justifyContent: 'center'

    },
    formTitle: {
        padding: 12,
        fontSize: 16
    }
});
