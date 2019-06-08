import React from 'react';
import { StyleSheet,TextInput, View,ScrollView,SafeAreaView,Platform,Text,TouchableOpacity} from 'react-native';
import { observer } from "mobx-react"
import { observable } from 'mobx';
import {DEVICE_DIMENSIONS} from './../constant'
import Icon from 'react-native-vector-icons/Ionicons';


@observer
export default class Profile extends React.Component {

    constructor (props){
        super(props)

    }
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'PROFILE',
        };
      };
    @observable userDetails = {'name':'Manas','email':'abc@example.com','mobile':'8888888888'}
    @observable editable = false;
    @observable editedDetails = {'name':this.userDetails.name,'email':this.userDetails.email,'mobile':this.userDetails.mobile}
    updateScreen = () =>{
        this.editable = true
    }

    saveChanges = () => {
        this.editable=false
        alert('saved')
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={styles.status}/>
                    <ScrollView>
                        <View>
                            <View style={{}}>
                                <View style={styles.profilePicture}>
                                    <Icon 
                                        name="ios-contact"
                                        size={140}
                                    />
                                </View>
                                <Text style={styles.inputTitle}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.editedDetails.name}
                                    editable={this.editable}
                                    onChangeText = { (value) => this.editedDetails.name=value}

                                />
                                <Text style={styles.inputTitle}>Email id</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.editedDetails.email}
                                    editable={this.editable}
                                    onChangeText = { (value) => this.editedDetails.email=value}

                                />
                                <Text style={styles.inputTitle}>Mobile Number</Text>
                                <TextInput
                                    style={styles.input}
                                    maxLength={10}
                                    value={this.editedDetails.mobile}
                                    editable={this.editable}
                                    onChangeText = { (value) => this.editedDetails.mobile=value}

                                />
                                
                                {this.editable && <Text style={styles.inputTitle}>OTP</Text>}
                                {this.editable && <TextInput
                                    style={styles.input}
                                    maxLength={6}
                                    editable={true}
                                />}
                                
                            </View>
                            {!this.editable ?
                                <TouchableOpacity style={styles.button} onPress={() => this.updateScreen()}>
                                    <Text>Update details</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.button} onPress={() => this.saveChanges()}>
                                    <Text>Save changes</Text>
                                </TouchableOpacity>
                            }
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
    status : {
        height: Platform.OS === 'ios' ? 0 : 24,
    },
    input : {
        width : DEVICE_DIMENSIONS.width-55,
        height :32,
         padding:8,
        marginLeft:27.5,
        borderBottomWidth:0.8,
        borderBottomColor:'black',
        fontSize:14
    },
    inputTitle : {
        marginLeft:22.5,
        padding:8,
        color : '#B2ABAB',
        marginTop:8
    },
    profilePicture : {
        alignSelf:'center', 
    },
    button: {
        marginTop:30,
        backgroundColor:'grey',
        height: 40,
        width: 120,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    }

    
});
