import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import * as firebase from 'firebase'
import config from './../config/firebase'

import Video from 'react-native-vlc';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Monitoramento extends Component {

    constructor(props) {

        super(props)
        this.loadStart = this._loadStart.bind(this)
        this.start = this._start.bind(this)
        this.state = {
            ipcamera: null,
            spinner: false
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        firebase.database().ref('config/').once('value', (snapshot) => {
            this.setState({ ipcamera: snapshot.val().ipcamera })            
        })

    }

    _loadStart() {
        this.setState({
            spinner: true
        })
    }

    _start() {
        this.setState({
            spinner: false
        })
    }

    render() {

        if (this.state.ipcamera != null)
            return (
                <View style={styles.container}>
                    <Spinner visible={this.state.spinner} />

                    <Video
                        style={styles.fullScreen}
                        src={{ uri: `rtsp://admin:admin@${this.state.ipcamera}:554/11` }}
                        source={{ uri: `rtsp://admin:admin@${this.state.ipcamera}:554/11` }} // Can be a URL or a local file.
                        rate={1.0}                   // 0 is paused, 1 is normal.
                        volume={1.0}                 // 0 is muted, 1 is normal.
                        muted={false}                // Mutes the audio entirely.
                        paused={false}               // Pauses playback entirely.
                        resizeMode="cover"           // Fill the whole screen at aspect ratio.
                        repeat={true}                // Repeat forever.
                        playInBackground={false}     // Audio continues to play when aentering background.
                        playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
                        onLoadStart={this.loadStart} // Callback when video starts to load
                        onLoad={this.start}    // Callback when video loads

                    />

                </View>

            );
        else
            return null
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