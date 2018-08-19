import React, { Component } from 'react';
import { View, Text, Dimensions, Image, Alert} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import DialogProgress from 'react-native-dialog-progress'
import SocketIOClient from 'socket.io-client'
import { setSensores } from './../services/redux/actions/SensorActions'
import { connect } from 'react-redux'


class Principal extends Component {

    constructor(props) {
        super(props)        
    }

    componentDidMount() {

        const options = {
            title:"Aguarde",
            message:"Estabelecendo conexão com a central",
            isCancelable:false
        }

        DialogProgress.show(options)

        this.socket = SocketIOClient('http://18.231.50.4:5000')

        this.socket.on('connect', (message) => {
            DialogProgress.hide()
        });

        this.socket.on('statusSensores', (message) => {
            this.props.setSensores(message)            
        });

    }

    render() {

        let imageStyle = {width: Dimensions.get('window').width * .20, height: Dimensions.get('window').width * .20}
        let imageContentStyle = { width: Dimensions.get('window').width * .36, height: Dimensions.get('window').width * .36 }
        let buttonStyle = {flexDirection:'column', height: Dimensions.get('window').width * .36, justifyContent:'space-around'}

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                           
                        </Button>
                    </Left>
                    <Body>
                        <Title>CISI CTRL</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.push("Config")}>
                            <Icon name="settings" />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 1, flexDirection: 'column'}}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <View style={imageContentStyle}>
                            <Button full light style={buttonStyle} onPress = {() => {this.props.navigation.push("Porta", {socket:this.socket})}}>
                                <Image
                                    style={imageStyle}                                    
                                    source={require('./../assets/img/door.png')}
                                />
                                <Text>Porta</Text>
                            </Button>
                        </View>
                        <View style={imageContentStyle}>
                            <Button full light style={buttonStyle} onPress = {() => {this.props.navigation.push("Luz", {socket:this.socket})}}>
                                <Image
                                    style={imageStyle}                                    
                                    source={require('./../assets/img/idea.png')}
                                />
                                <Text>Luzes</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <View style={imageContentStyle}>
                            <Button full light style={buttonStyle} onPress = {() => {this.props.navigation.push("ArCondicionado", {socket:this.socket})}}>
                                <Image
                                    style={imageStyle}                                    
                                    source={require('./../assets/img/air.png')}
                                />
                                <Text>Ar Condicionado</Text>
                            </Button>
                        </View>
                        <View style={imageContentStyle}>
                            <Button full light style={buttonStyle} onPress = {() => {this.props.navigation.push("Microfone")}}>
                                <Image
                                    style={imageStyle}                                    
                                    source={require('./../assets/img/microphone.png')}
                                />
                                <Text>Alto-falantes</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <View style={imageContentStyle}>
                            <Button full light style={buttonStyle} onPress = {() => {this.props.navigation.push("Monitoramento")}}>
                                <Image
                                    style={imageStyle}                                    
                                    source={require('./../assets/img/cctv.png')}
                                />
                                <Text>Monitoramento</Text>
                            </Button>
                        </View>
                        <View style={imageContentStyle}>
                            <Button full light style={buttonStyle} onPress = {() => {this.props.navigation.push("UsuarioList")}}>
                                <Image
                                    style={imageStyle}                                    
                                    source={require('./../assets/img/team.png')}
                                />
                                <Text>Usuários</Text>
                            </Button>
                        </View>
                    </View>

                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => ({sensores : state.SensorReducer})
export default connect(mapStateToProps, { setSensores })(Principal)