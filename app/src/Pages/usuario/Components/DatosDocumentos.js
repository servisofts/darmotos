import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SPage, SText, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async onSubmit(data) {
        var arr = Object.keys(data);
        for (let i = 0; i < arr.length; i++) {
            const key_dato = arr[i];
            var dto = Object.values(this.usuario_dato).find(o => o.key_dato == key_dato);
            if (!dto) {
                var resp = await Model.usuario_dato.Action.registro({
                    data: {
                        key_usuario_perfil: this.props.key_usuario,
                        descripcion: data[key_dato],
                        key_dato: key_dato
                    },
                    key_usuario: Model.usuario.Action.getKey()
                })
            } else {
                if (dto?.descripcion != data[key_dato]+"") {
                    var resp = await Model.usuario_dato.Action.editar({
                        data: {
                            ...dto,
                            descripcion: data[key_dato],
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
            inputs[obj.key] = { label: obj.descripcion, type: obj.tipo, required: obj.required, defaultValue: dto?.descripcion, }
        })
        return <SForm inputs={inputs} onSubmitName={"Editar"} onSubmit={(data) => {
            console.log("subir")
            this.onSubmit(data);
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