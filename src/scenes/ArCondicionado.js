import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import { setSensores } from './../services/redux/actions/SensorActions'
import { connect } from 'react-redux'
import DateFormat from './../utils/DateFormat'

class ArCondicionado extends Component {

    constructor(props){
        super(props)        
    }

    renderButton(){

        let cor     =   this.props.sensores.ar.status == 1 ? '#333' : '#38761d'
        let texto   =   this.props.sensores.ar.status == 1 ? `Desligar ar condicionado` : `Ligar ar condicionado`

        return <Button onPress={() => this.toggleAction()} style={{ margin: 10, backgroundColor: cor }} full dark>
                            <Text style={{ color: 'white', margin: 10 }}>{texto}</Text>
                        </Button>
    }

    toggleAction(){

        this.props.sensores.ar.status = (this.props.sensores.ar.status == 1) ? 0 : 1
        this.props.sensores.ar.dataUltimaAlteracao = new Date()        
        this.props.navigation.state.params.socket.emit("message", this.props.sensores)
        
    }

    aumentaTemperatura(){

        if(this.props.sensores.ar.temperatura == 30)
            return
            
        this.props.sensores.ar.temperatura++
        this.props.sensores.ar.dataUltimaAlteracao = new Date()        
        this.props.navigation.state.params.socket.emit("message", this.props.sensores)
        
    }

    diminuiTemperatura(){

        if(this.props.sensores.ar.temperatura == 18)
            return

        this.props.sensores.ar.temperatura--
        this.props.sensores.ar.dataUltimaAlteracao = new Date()        
        this.props.navigation.state.params.socket.emit("message", this.props.sensores)
        
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Ar Condicionado</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <View style={{ flex: 1 }}>
                    <View style={{
                        height: '40%',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        borderBottomColor: '#eee',
                        borderBottomWidth: 1,
                        marginLeft: 30,
                        marginRight: 30
                    }}>
                        <Image
                            style={{ width: Dimensions.get('window').width * .20, height: Dimensions.get('window').width * .20 }}
                            source={require('./../assets/img/air.png')}
                        />
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: 'bold' }}>Ar Condicionado está</Text> <Text style={{ color: 'green', fontWeight: 'bold' }}>ligado</Text>.</Text>
                            <Text style={{ fontSize: 17 }}>Última temperatura <Text style={{ fontWeight: 'bold' }}>{this.props.sensores.ar.temperatura}°</Text></Text>
                            <Text style={{ fontSize: 17 }}>Temperatura ambiente <Text style={{ fontWeight: 'bold' }}>{this.props.sensores.ar.temperatura}°</Text></Text>
                        </View>
                    </View>
                    <View style={{ height: '60%', padding: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ margin: 10 }}>Última alteração realizada por <Text style={{ fontWeight: 'bold' }}>{this.props.sensores.ar.usuarioUltimaAlteracao}</Text> em {DateFormat.format(this.props.sensores.ar.dataUltimaAlteracao)}</Text>
                        <View style={{alignSelf:'flex-start', margin:10}}>
                            <Text style={{fontWeight:'bold', fontSize:17}}>Temperatura</Text>
                        </View>

                        <View style={{flexDirection:'row', alignItems:'center', margin:10}}>
                            <Button onPress={() => this.diminuiTemperatura()} style={{marginRight:10, width:45, justifyContent:'center'}} light>
                                <Text style={{ fontSize:20, fontWeight:'bold', margin: 10 }}>-</Text>
                            </Button>
                            <Text style={{ fontSize: 17, fontWeight:'bold'}}>{this.props.sensores.ar.temperatura}</Text>
                            <Button onPress={() => this.aumentaTemperatura()} style={{marginLeft:10, width:45, justifyContent:'center'}} light>
                                <Text style={{ fontSize:20, fontWeight:'bold', margin: 10 }}>+</Text>
                            </Button>
                        </View>

                        {this.renderButton()}

                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => ({sensores : state.SensorReducer})
export default connect(mapStateToProps, { setSensores })(ArCondicionado)