import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SPage, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async onSubmit(data, ref) {
        var arr = Object.keys(data);
        for (let i = 0; i < arr.length; i++) {
            const key_dato = arr[i];
            var dto = Object.values(this.usuario_dato).find(o => o.key_dato == key_dato);
            var dato_str = data[key_dato];
            if (typeof dato_str != "string") {
                dato_str = JSON.stringify(dato_str);
            }
            if (!dto) {
                var resp = await Model.usuario_dato.Action.registro({
                    data: {
                        key_usuario_perfil: this.props.key_usuario,
                        descripcion: dato_str,
                        key_dato: key_dato
                    },
                    key_usuario: Model.usuario.Action.getKey()
                })

            } else {
                if (dto?.descripcion != dato_str) {
                    var resp = await Model.usuario_dato.Action.editar({
                        data: {
                            ...dto,
                            descripcion: dato_str,
                        },
                        key_usuario: Model.usuario.Action.getKey()
                    })

                }

            }

        }
    }
    getDatos() {
        var datos = Model.dato.Action.getAllByKeyUsuario(this.props.key_usuario);
        this.usuario_dato = Model.usuario_dato.Action.getAllBy({
            key_usuario_perfil: this.props.key_usuario
        })
        if (!datos) return null;
        if (!this.usuario_dato) return null;
        var inputs = {};
        Object.values(datos).map((obj) => {
            var dto = Object.values(this.usuario_dato).find(o => o.key_dato == obj.key);
            var defaultValue = dto?.descripcion;
            var filePath = SSocket.api.root + "usuario_dato/" + this.props.key_usuario;
            inputs[obj.key] = { label: obj.descripcion, type: obj.tipo, required: obj.required, defaultValue: defaultValue, filePath: filePath }

        })
        return <SForm inputs={inputs} onSubmitName={"Editar"} onSubmit={(data, ref) => {
            // console.log("subir")
            // console.log(data);
            // var files = ref.getFiles()
            // console.log(files);
            console.log(data);

            this.onSubmit(data, ref);
            ref.uploadFiles2(
                SSocket.api.root + "upload/usuario_dato/" + this.props.key_usuario,
            );
        }} />
    }
    render() {
        return (
            <SView col={"xs-12"}>
                <SHr />
                <SText fontSize={16} bold>Datos y documentos</SText>
                <SHr />
                {this.getDatos()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);