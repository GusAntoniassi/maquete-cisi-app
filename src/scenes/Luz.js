import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import { setSensores } from './../services/redux/actions/SensorActions'
import { connect } from 'react-redux'
import DateFormat from './../utils/DateFormat'

class Luz extends Component {

    constructor(props){
        super(props)        
    }

    renderSituacaoLuzes(){
        return this.props.sensores.leds.map(
            (led, chave) => {

                let cor     =   led.status == 1 ? 'green' : '#cb3837'
                let texto   =   led.status == 1 ? 'acesa' : 'apagada'

                return <Text key={chave+1} style={{ fontSize: 16 }}>A luz {chave+1} está <Text style={{ color: cor, fontWeight: 'bold' }}>{texto}</Text></Text>
            }
        )
    }

    renderBotoes(){
        return this.props.sensores.leds.map(
            (led, chave) => {

                let cor     =   led.status == 1 ? '#333' : '#38761d'
                let texto   =   led.status == 1 ? `Apagar luz ${chave+1}` : `Acender luz ${chave+1}`

                return <Button onPress={() => this.toggleAction(chave)} key={chave+1} style={{margin:10, backgroundColor:cor}} full success>
                            <Text style={{color:'white'}}>{texto}</Text>
                        </Button>
            }
        )
    }

    toggleAction(key){

        this.props.sensores.leds[key].status = (this.props.sensores.leds[key].status == 1) ? 0 : 1

        for(let led in this.props.sensores.leds){
            this.props.sensores.leds[led].dataUltimaAlteracao = new Date() 
            this.props.sensores.leds[led].usuarioUltimaAlteracao = this.props.user.nome
        }

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
                        <Title>Luzes</Title>
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
                        marginLeft:30,
                        marginRight:30
                    }}>
                        <Image
                            style={{ width: Dimensions.get('window').width * .20, height: Dimensions.get('window').width * .20 }}
                            source={require('./../assets/img/idea.png')}
                        />
                        <View style={{alignItems:'center'}}>
                            {this.renderSituacaoLuzes()}
                        </View>
                    </View>
                    <View style={{ height: '60%', padding: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{margin:10}}>Última alteração realizada por <Text style={{fontWeight:'bold'}}>{this.props.sensores.leds[0].usuarioUltimaAlteracao}</Text> em {DateFormat.format(this.props.sensores.leds[0].dataUltimaAlteracao)}</Text>

                       {this.renderBotoes()}

                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => ({sensores : state.SensorReducer, user:state.UserReducer})
export default connect(mapStateToProps, { setSensores })(Luz)