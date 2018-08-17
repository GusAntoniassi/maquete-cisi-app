import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';

import Video from 'react-native-vlc';

export default class Monitoramento extends Component {

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.fullScreen} onPress={() => {Alert.alert("a"); fetch('http://192.168.11.105/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=right')}}>
                <Video
                    style={styles.fullScreen}
                    src={{ uri: "rtsp://admin:admin@192.168.11.105:554/11" }}
                    source={{ uri: "rtsp://admin:admin@192.168.11.105:554/11" }} // Can be a URL or a local file.
                    rate={1.0}                   // 0 is paused, 1 is normal.
                    volume={1.0}                 // 0 is muted, 1 is normal.
                    muted={false}                // Mutes the audio entirely.
                    paused={false}               // Pauses playback entirely.
                    resizeMode="cover"           // Fill the whole screen at aspect ratio.
                    repeat={true}                // Repeat forever.
                    playInBackground={false}     // Audio continues to play when aentering background.
                    playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
                    onLoadStart={this.loadStart} // Callback when video starts to load
                    onLoad={this.setDuration}    // Callback when video loads
                    onProgress={this.setTime}    // Callback every ~250ms with currentTime
                    onEnd={this.onEnd}           // Callback when playback finishes
                    onError={this.videoError}    // Callback when video cannot be loaded
                />

                </TouchableOpacity>

                <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        <View style={styles.rateControl}>
                            <TouchableOpacity onPress={() => {fetch('http://192.168.11.105/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=right')}}>
                            <Text>Teste</Text>       
                            </TouchableOpacity>
                        </View>

                        <View style={styles.volumeControl}>
                           
                        </View>

                        <View style={styles.resizeModeControl}>
                           
                        </View>
                    </View>

                    
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
});