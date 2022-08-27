import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SList, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
import DatoItem from "./DatoItem";
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    getDatos() {
        var datos = Model.dato.Action.getAllByKeyUsuario(this.props.key_usuario);
        this.usuario_dato = Model.usuario_dato.Action.getAllBy({
            key_usuario_perfil: this.props.key_usuario
        })
        if (!datos) return null;
        if (!this.usuario_dato) return null;
        // var inputs = {};
        // Object.values(datos).map((obj) => {
        //     var dto = Object.values(this.usuario_dato).find(o => o.key_dato == obj.key);
        //     var defaultValue = dto?.descripcion;
        //     var filePath = SSocket.api.root + "usuario_dato/" + this.props.key_usuario;
        //     // inputs[obj.key] = { label: obj.descripcion, type: obj.tipo, required: obj.required, defaultValue: defaultValue, filePath: filePath }

        // })
        return <SList
            data={datos}
            order={[{ key: "tipo", order: "desc", peso: 1 }]}
            render={(obj) => {
                var dto = Object.values(this.usuario_dato).find(o => o.key_dato == obj.key);
                return <DatoItem obj={obj} dto={dto} />

                return <SView col={"xs-12"}>
                    <SView row>
                        <SText color={STheme.color.gray}>{obj.descripcion} {obj.required ? "*" : ""}</SText>
                        <SText >{dto?.descripcion}</SText>
                    </SView>
                    {/* <SText>{obj.tipo}</SText> */}
                </SView>
            }}
        />
    }
    render() {
        return (
            <SView col={"xs-12"}>
                <SHr />
                <SView col={"xs-12"} >
                    <SHr />
                    <SText fontSize={16} bold>Datos y documentos</SText>
                    <SView row card width={100} center height={30} onPress={() => {
                        SNavigation.navigate("/usuario/profile/edit_datos", { pk: this.props.key_usuario })
                    }}>
                        <SIcon name='Pencil' fill={STheme.color.text} width={12} />
                        <SView width={8} />
                        <SText>Editar</SText>
                    </SView>
                    <SHr />
                    {this.getDatos()}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);