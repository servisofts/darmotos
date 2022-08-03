import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SPage, SText } from 'servisofts-component';
import Model from '../../Model';
// import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'index'}>
                <SText>{JSON.stringify(this.props.state, "\n", "\t")}</SText>
                <SButtom type={"danger"} onPress={() => {
                    Model.TEST();
                }}>test</SButtom>
                <SButtom type={"danger"} onPress={() => {
                    Model.usuario.Action.login({
                        "usuario": "admin@gmail.com",
                        "password": "1234"
                    })
                }}>login</SButtom>
                <SButtom type={"danger"} onPress={() => {
                    Model.empresa.Action.getAll();
                }}>getAll</SButtom>
                <SButtom type={"danger"} onPress={() => {
                    Model.usuario.Action.registro({
                        "Nombres": "admin",
                        "Apellidos": "Admin",
                        "Password": "123",
                        "Correo": "admin2@gmail.com",
                        "Telefono": "+591 0000001",
                        "CI": "0000000"
                    });
                }}>registro</SButtom>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);