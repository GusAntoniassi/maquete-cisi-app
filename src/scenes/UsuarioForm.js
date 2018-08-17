import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Text, Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Picker, ListItem, Radio } from 'native-base';
import * as firebase from 'firebase'
import config from './../config/firebase'
import DialogProgress from 'react-native-dialog-progress'


export default class UsuarioForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: "",
            usuario: "",
            senha: "",
            professor: false
        }
    }

    saveUser() {

        const options = {
            title: "Aguarde",
            message: "Salvando usuário",
            isCancelable: false
        }

        DialogProgress.show(options)

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        firebase.database().ref('users/').push(
            this.state
        ).then((data) => {
            DialogProgress.hide()
            Alert.alert(
                "Sucesso", 
                "Dados gravados com sucesso",
                [
                    {text: 'OK', onPress: () => this.props.navigation.state.params.callback(this)},
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
                
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Cadastrar Usuário</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.saveUser()}>
                            <Text>Salvar</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>Nome</Label>
                            <Input value={this.state.nome}
                                onChangeText={nome => {
                                    this.setState({ nome: nome })
                                }} />
                        </Item>
                        <Item fixedLabel>
                            <Label>Usuário</Label>
                            <Input value={this.state.usuario}
                                onChangeText={usuario => {
                                    this.setState({ usuario: usuario })
                                }} />
                        </Item>
                        <Item fixedLabel>
                            <Label>Senha</Label>
                            <Input value={this.state.senha}
                                onChangeText={senha => {
                                    this.setState({ senha: senha })
                                }} secureTextEntry={true}/>
                        </Item>

                        <ListItem onPress={() => this.setState({ professor: true })}>
                            <Left>
                                <Text>Professor</Text>
                            </Left>
                            <Right>
                                <Radio selected={this.state.professor} />
                            </Right>
                        </ListItem>
                        <ListItem onPress={() => this.setState({ professor: false })}>
                            <Left>
                                <Text>Aluno</Text>
                            </Left>
                            <Right>
                                <Radio selected={!this.state.professor} />
                            </Right>
                        </ListItem>
                    </Form>
                </Content>
            </Container>
        );
    }
}