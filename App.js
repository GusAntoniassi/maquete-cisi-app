import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './src/services/redux/reducers'

import Principal from "./src/scenes/Principal";
import Luz from "./src/scenes/Luz";
import Porta from "./src/scenes/Porta"
import Microfone from "./src/scenes/Microfone";
import ArCondicionado from "./src/scenes/ArCondicionado";
import Monitoramento from "./src/scenes/Monitoramento";
import UsuarioList from "./src/scenes/UsuarioList";
import UsuarioForm from "./src/scenes/UsuarioForm";
import Login from "./src/scenes/Login";

const Stack = StackNavigator({
  Principal: { screen: Principal },
  Luz: { screen: Luz },
  Porta: { screen: Porta },
  Microfone: { screen: Microfone },
  ArCondicionado: { screen: ArCondicionado },
  Monitoramento: { screen: Monitoramento },
  UsuarioList: { screen: UsuarioList },
  UsuarioForm: { screen: UsuarioForm },
  Login: { screen: Login }
}, {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      gesturesEnabled: false
    }
  })

const store = createStore(reducers)

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      return (
        <StyleProvider style={getTheme(material)}>
          <Provider store={store}>
          <Stack/>
          </Provider>
        </StyleProvider>
      )
  }


}


