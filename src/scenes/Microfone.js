import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';

export default class Microfone extends Component {

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
                        <Title>Auto-falantes</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <View style={{ flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{position:'absolute', top:20, fontSize:17, fontWeight:'bold'}}>Transmitir mensagem de áudio</Text>

                    <TouchableOpacity>
                    <View style={{
                        alignItems:'center', justifyContent:'center', backgroundColor:'#eee', borderRadius:Dimensions.get('window').width * .7, width: Dimensions.get('window').width * .7, height: Dimensions.get('window').width * .7
                    }}>
                    <Image
                            style={{ width: Dimensions.get('window').width * .30, height: Dimensions.get('window').width * .30 }}
                            source={require('./../assets/img/microphone.png')}
                        />
                    </View>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}