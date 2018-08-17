import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button, Icon, Title, Fab } from 'native-base';
import * as firebase from 'firebase'
import config from './../config/firebase'
import DialogProgress from 'react-native-dialog-progress'
import Spinner from 'react-native-loading-spinner-overlay';

export default class UsuarioList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            spinner:true
        }
    }

    componentDidMount() {

        this.load()

    }

    load() {

        if(!this.state.spinner)
            this.setState({spinner:true})

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        firebase.database().ref('users/').once('value', (snapshot) => {
            this.setState({ users: snapshot.val(), spinner:false})
            DialogProgress.hide()
        })

    }

    renderItems() {
        return Object.values(this.state.users).map(
            (user, key) => <ListItem thumbnail key={key}>
                <Body>
                    <Text>{user.nome}</Text>
                    <Text note numberOfLines={1}>{user.professor ? 'Professor' : 'Aluno'}</Text>
                </Body>

                <Right>
                    
                </Right>
            </ListItem>
        )
    }

    render() {
        return (
            <Container>
                <Spinner visible={this.state.spinner}/>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Usuários</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content>
                    <List>
                        {this.renderItems()}
                    </List>
                </Content>
                <Fab
                    active={true}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: 'green' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('UsuarioForm', {
                        callback:   (formScreen) => { formScreen.props.navigation.goBack(); this.load(); }                    
                    })}>
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }
}