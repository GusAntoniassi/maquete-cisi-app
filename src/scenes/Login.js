import React, { Component } from 'react';
import { View, Text, Dimensions, Image, Alert, StatusBar } from 'react-native';
import { Container, Input, Header, Form, Left, Item, Label, Body, Right, Button, Icon, Title, Content } from 'native-base';
import DialogProgress from 'react-native-dialog-progress'
import { setSensores } from './../services/redux/actions/SensorActions'
import { setUser } from './../services/redux/actions/UserActions'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import config from './../config/firebase'
import Spinner from 'react-native-loading-spinner-overlay';


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            spinner: false,
            user:"",
            pass:""
        }
    }

    componentDidMount() {



    }

    login() {
        if (!this.state.spinner)
            this.setState({ spinner: true })

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        firebase.database().ref('users/')
            .orderByChild("usuario")
            .equalTo(this.state.user)
            .once("value",  (snapshot) => {
                this.setState({ spinner: false })
                let user = snapshot.val()                
                if(user === null)
                    Alert.alert("Atenção", "Login incorreto")
                else if(Object.values(user)[0].senha != this.state.pass)
                    Alert.alert("Atenção", "Senha incorreta")
                else{
                    this.props.setUser(Object.values(user)[0])  
                    this.props.navigation.navigate("Principal")
                }

            });
    }

    render() {

        return (
            <Container>
                <Spinner visible={this.state.spinner}/>
                <StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />
                <View style={{ flex: 1, backgroundColor: '#424242', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: Dimensions.get('window').width * .5 }}
                        resizeMode='contain'
                        source={require('./../assets/img/logo-unipar.png')}
                    />
                    <Form style={{ width: 300, marginTop: -50 }}>


                        <Item floatingLabel>
                            <Label style={{ color: '#fff' }}>Login</Label>
                            <Input
                                style={{ color: '#fff' }}
                                value={this.state.user}                  
                                onChangeText={user => this.setState({user:user})}
                                autoCapitalize='none'
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ color: '#fff' }}>Senha</Label>
                            <Input
                                style={{ color: '#fff' }}
                                value={this.state.pass}                  
                                onChangeText={password => this.setState({pass:password})}
                                secureTextEntry
                                autoCapitalize='none'
                            />
                        </Item>

                        <Button style={{
                            paddingHorizontal: 20,
                            alignSelf: 'center',
                            backgroundColor: '#333',
                            marginTop: 15,
                            marginBottom: 15,

                        }} onPress={() => this.login()}>
                            <Text style={{ color: '#fff' }}>ENTRAR</Text>
                        </Button>

                    </Form>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ sensores: state.SensorReducer })
export default connect(mapStateToProps, { setSensores, setUser })(Login)