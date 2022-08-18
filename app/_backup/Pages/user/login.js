import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SInput, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import Model from '../../Model';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (Model.usuario.Action.getUsuarioLog()) {
            SNavigation.replace("/");
            return null;
        }
        return (
            <SPage title={'Login'} hidden >
                <SView col={"xs-12"} center>
                    <SHr height={50}/>
                    <SText fontSize={18}>Inicia session</SText>
                    <SHr height={50}/>
                    <SForm
                        col={"xs-11 sm-10 md-8 lg-6 xl-4"}
                        inputs={{
                            usuario: { label: "Usuario", required: true },
                            password: { label: "Contraseña", type: "password" }
                        }}
                        onSubmitName={"Login"}
                        onSubmit={(data) => {
                            console.log(data);
                            Model.usuario.Action.login(data).then((resp) => {
                                console.log("exito");
                            }).catch(e => {
                                SPopup.alert("usuario no encontrado")
                            })
                        }}
                    />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Login);