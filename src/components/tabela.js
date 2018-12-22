import React, { Component } from "react";
import firebase from "firebase";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./tabela.css";

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/tables/SimpleTable.js
const logo = require("../Imagens/logo.png");
class Tabela extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("cadastro/")
      .on("value", snap => {
        var arrayPregao = [];
        snap.forEach(data => {
          arrayPregao.push(data.val());
        });

        console.log("arrayPregao");
        console.log(arrayPregao);
        this.setState({
          data: arrayPregao
        });
        this.setState({
          columns: arrayPregao
        });
      });
  }

  setColumns() {
    var array = [];
    ["nome", "email", "serviço", "telefone", "mensagem"].map((x, i) => {
      array.push({
        Header: x,
        accessor: x
      });
    });
    console.log("array");
    console.log(array);
    return array;
  }

  render() {
    return (
      <div className="divv">
        <img src={logo} className="logo" />
        <div>
          <p className="mensagemm">
            Parabéns voce se cadastrou,veja quem também se cadastrou:
          </p>
          <p className="mensagemm">
            Também é possivel visualizar através do aplicativo do celular
          </p>
        </div>
        <ReactTable
          data={this.state.data}
          columns={this.setColumns()}
          defaultPageSize={6}
          className="reactTable"
        />
      </div>
    );
  }
}
export default Tabela;
