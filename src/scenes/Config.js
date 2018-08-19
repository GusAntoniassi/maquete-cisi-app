import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Text, Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Picker, ListItem, Radio } from 'native-base';
import * as firebase from 'firebase'
import config from './../config/firebase'
import DialogProgress from 'react-native-dialog-progress'
import Spinner from 'react-native-loading-spinner-overlay';


export default class Config extends Component {

    constructor(props) {

        super(props)
        this.state = {
            spinner: false,
            ipcamera: ""
        }



    }

    componentDidMount() {

        this.setState({spinner:true})

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        firebase.database().ref('config/').once('value',  (snapshot) => {
            this.setState({ipcamera:snapshot.val().ipcamera})
            this.setState({spinner:false})
        })
    }

    save() {

        const options = {
            title: "Aguarde",
            message: "Salvando configuração",
            isCancelable: false
        }

        DialogProgress.show(options)

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        firebase.database().ref('config/').set(
            {
                ipcamera: this.state.ipcamera
            }
        ).then((data) => {
            DialogProgress.hide()
            Alert.alert(
                "Sucesso",
                "Dados gravados com sucesso",
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack(null) },
                ],
                { cancelable: false }
            )
        }).catch((error) => {
            DialogProgress.hide()
            Alert.alert("Erro", "Ocorreu um erro ao gravar os dados")
        })

    }

    render() {
        return (
            <Container>
                <Spinner visible={this.state.spinner} />
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Config</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.save()}>
                            <Text>Salvar</Text>
                        </Button>
                    </Right>
                </Header>
                
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>IP Câmera</Label>
                            <Input value={this.state.ipcamera}
                                onChangeText={ipcamera => {
                                    this.setState({ ipcamera: ipcamera })
                                }} />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}