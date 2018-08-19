import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import { setSensores } from './../services/redux/actions/SensorActions'
import { connect } from 'react-redux'
import DateFormat from './../utils/DateFormat'

class Porta extends Component {

    renderSituacao(){

        let cor     =   this.props.sensores.porta.status == 1 ? 'green' : '#cb3837'
        let texto   =   this.props.sensores.porta.status == 1 ? 'aberta' : 'fechada'

        return <Text style={{ fontSize: 17 }}>A tranca da porta do CISI está <Text style={{ color: cor, fontWeight: 'bold' }}>{texto}</Text></Text>                            
       
    }

    renderButton(){

        let cor     =   this.props.sensores.porta.status == 1 ? '#333' : '#38761d'
        let texto   =   this.props.sensores.porta.status == 1 ? `Fechar` : `Abrir`

        return <Button onPress={() => this.toggleAction()} style={{margin:10, backgroundColor:cor}} full>
                            <Text style={{color:'white'}}>{texto}</Text>
                        </Button>
    }

    toggleAction(){

        this.props.sensores.porta.status = (this.props.sensores.porta.status == 1) ? 0 : 1
        this.props.sensores.porta.dataUltimaAlteracao = new Date()        
        this.props.sensores.porta.usuarioUltimaAlteracao = this.props.user.nome
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
                        <Title>Porta</Title>
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
                            source={require('./../assets/img/door.png')}
                        />
                        <View>
                            {this.renderSituacao()}                            
                        </View>
                    </View>
                    <View style={{ height: '60%', padding: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{margin:10}}>Última alteração realizada por <Text style={{fontWeight:'bold'}}>{this.props.sensores.porta.usuarioUltimaAlteracao}</Text> em {DateFormat.format(this.props.sensores.porta.dataUltimaAlteracao)}</Text>
                        
                       {this.renderButton()}

                        
                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => ({sensores : state.SensorReducer, user:state.UserReducer})
export default connect(mapStateToProps, { setSensores })(Porta)