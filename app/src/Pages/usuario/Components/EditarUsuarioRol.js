import React, { Component } from 'react'
import { SHr, SImage, SInput, SList, SLoad, SPopup, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import SSocket from 'servisofts-socket'
import { connect } from 'react-redux';
class EditarUsuarioRol extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        this.pk = this.props.key_usuario;
        var rol = Model.rol.Action.getAll();
        var usuarioRol = Model.usuarioRol.Action.getAllByKeyUsuario(this.pk);
        var allowEdit = Model.usuarioPage.Action.getPermiso({ url: "/usuario", permiso: "edit_rol" })
        if (!rol) return <SLoad />;
        if (!usuarioRol) return <SLoad />;
        if (allowEdit == "cargando") return <SLoad />;
        return (<SView col={"xs-12"}>
            <SHr />
            <SText fontSize={16} bold>Roles</SText>
            <SHr />
            <SList
                data={rol}
                buscador
                render={(itm) => {
                    var usuarioRolActivo = Object.values(usuarioRol).find(o => o.key_rol == itm.key && o.estado > 0)
                    return <SView row col={"xs-12"} style={{
                        alignItems: 'center'
                    }}>
                        <SInput
                            col={""}
                            type={"checkBox"}
                            defaultValue={!!usuarioRolActivo}
                            disabled={!allowEdit || !!this.props.disabled}
                            onChangeText={(e) => {
                                if (e) {
                                    Model.usuarioRol.Action.registro({
                                        data: {
                                            key_rol: itm.key,
                                            key_usuario: this.pk,
                                        },
                                        key_usuario: Model.usuario.Action.getKey()
                                    })
                                } else {
                                    Model.usuarioRol.Action.editar({
                                        data: {
                                            ...usuarioRolActivo,
                                            estado: 0
                                        },
                                        key_usuario: Model.usuario.Action.getKey()
                                    })
                                }
                            }} />
                        <SView width={4} />
                        <SView width={30} height={30} card>
                            <SImage src={Model.rol._get_image_download_path(SSocket.api, itm.key)} />
                        </SView>
                        <SView width={4} />
                        <SText>{itm.descripcion}</SText>

                    </SView>

                }}
            />
        </SView>
        )
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EditarUsuarioRol);