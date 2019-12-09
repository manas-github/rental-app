import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';
import { observable } from 'mobx'
import { observer } from "mobx-react"
import { Video } from 'expo-av';


@observer
class VideoMessages extends React.Component<any, any> {

    @observable player;

    onBuffer = () => {

    }
    videoError = () => {

    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.heading}>AWARD WINNING DESIGNS...</Text>
            <View style={styles.video}>
                <Video
                    source={require('./../../assets/videos/myvideo.mp4')}
                    rate={1.0}
                    volume={1.0}
                    isMuted={true}
                    resizeMode="cover"
                    shouldPlay
                    useNativeControls={true}
                    isLooping={false}
                    style={{ width: 350, height: 300 }}
                />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    video : {
        alignItems: 'center',
        // justifyContent: 'center',
        height: 400,
    },
    heading: {
        fontSize: 18,
        padding: 10,
        marginLeft: 10,
        color: 'grey',
        fontWeight: '600',
        marginTop:30
    },
});

export default VideoMessages;
