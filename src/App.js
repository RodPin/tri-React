import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import Select from "react-select";
import Tabela from "./components/tabela";
// const sucesso = require("./Imagens/sucesso.png");

class App extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      telefone: "",
      mensagem: "",
      servico: "",
      check: false
    };
  }
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDGokYP58OyIcKN6aPm81clhRrmn_skZoM",
      authDomain: "tri-app-5e2d6.firebaseapp.com",
      databaseURL: "https://tri-app-5e2d6.firebaseio.com",
      projectId: "tri-app-5e2d6",
      storageBucket: "tri-app-5e2d6.appspot.com",
      messagingSenderId: "752950081176"
    };
    firebase.initializeApp(config);
  }

  onChangeText(key, change) {
    this.setState({ [key]: change.target.value });
  }
  arrayToJson(array) {
    return array.map(x => {
      return { value: x, label: x };
    });
  }
  renderSelect(options, nome) {
    return (
      <Select
        name={nome}
        onChange={selectedOption => this.handleChange(selectedOption, nome)}
        options={this.arrayToJson(options)}
        className="input_Serviço"
        required
      />
    );
  }
  handleChange(selectedOption, keyy) {
    // this.setState({ [keyy]: selectedOption.value });
    this.state[keyy] = selectedOption.value;
  }
  check(event) {
    event.preventDefault();

    console.log(this.state);
    delete this.state.check;

    firebase
      .database()
      .ref()
      .child("cadastro/")
      .push(this.state);
    this.setState({ check: true });
  }

  render() {
    if (this.state.check === false) {
      return (
        <div className="container">
          <div id="formulario">
            <div className="div_Titulo">
              <br />
              <p className="titulo">Peça seu orçamento agora mesmo!</p>
            </div>
            <form name="myForm" onSubmit={event => this.check(event)}>
              <div className="div">
                {/* <input type="text" class="input_Nome" id="Nome" required /> */}
                <input
                  type="text"
                  value={this.state["nome"]}
                  className="input_Nome"
                  placeholder={"Nome"}
                  onChange={change => this.onChangeText("nome", change)}
                  required
                />

                <input
                  type="text"
                  value={this.state["email"]}
                  className="input_Email"
                  placeholder={"E-mail"}
                  onChange={change => this.onChangeText("email", change)}
                  required
                />
              </div>
              <div className="div">
                <input
                  type="text"
                  value={this.state["telefone"]}
                  className="input_Telefone"
                  placeholder={"Telefone"}
                  onChange={change => this.onChangeText("telefone", change)}
                  required
                />

                {this.renderSelect(["servico1", "servico2"], "serviço")}
              </div>
              <div className="div">
                <input
                  type="text"
                  value={this.state["mensagem"]}
                  className="input_Mensagem"
                  placeholder={"Mensagem"}
                  onChange={change => this.onChangeText("mensagem", change)}
                  required
                />
              </div>
              <div className="div_Botao">
                <button
                  className={"botao"}
                  type="submit"
                  // onClick={() => {
                  //   this.check();
                  // }}
                  // disabled={isEnabled}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <Tabela />;
    }
  }
}

export default App;
