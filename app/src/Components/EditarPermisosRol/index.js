import React, { Component } from 'react'
import { SHr, SImage, SInput, SList, SLoad, SPopup, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../Model';

export default class EditarPermisosRol extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var pages = Model.page.Action.getAll({
            key_usuario: ""
        });
        var permisos = Model.permiso.Action.getAll();
        var permisos_rol = Model.rolPermiso.Action.getAllByKeyRol(this.props.key_rol)
        var allowEdit = Model.usuarioPage.Action.getPermiso({ url: "/rol", permiso: "edit_permiso" })
        if (!pages) return <SLoad />;
        if (!permisos) return <SLoad />;
        if (!permisos_rol) return <SLoad />;
        if (allowEdit == "cargando") return <SLoad />;

        return (<SView col={"xs-12"}>
            <SHr />
            <SText fontSize={16} bold>Permisos</SText>
            <SHr />
            <SList
                buscador

                horizontal={true}
                data={pages}
                render={(itm) => {
                    var pf = Object.values(permisos).filter(obj => obj.key_page == itm.key)
                    return <SView col={"xs-5.7"} >
                        <SHr height={16} />
                        <SView row col={"xs-12"} style={{
                            alignItems: "center"
                        }} >
                            <SView width={30} height={30} card>
                                <SImage src={Model.page._get_image_download_path(SSocket.api, itm.key)} />
                            </SView>
                            <SView width={8} />
                            <SText fontSize={16} bold>{itm.descripcion}</SText>
                        </SView>
                        <SHr />
                        <SList
                            data={pf}
                            // horizontal
                            order={[{ key: "type", order: "desc", "peso": 1 }]}
                            space={16}
                            render={(itm2) => {
                                var activo = Object.values(permisos_rol).find(elm => elm.key_permiso == itm2.key)
                                return <SView row style={{
                                    alignItems: 'center'
                                }}>
                                    <SInput
                                        col={""}
                                        type={"checkBox"}
                                        defaultValue={!!activo}
                                        editable={!!allowEdit}
                                        onChangeText={(e) => {
                                            if (e) {
                                                Model.rolPermiso.Action.registro({
                                                    data: {
                                                        key_rol: this.props.key_rol,
                                                        key_permiso: itm2.key,
                                                    },
                                                    key_usuario: Model.usuario.Action.getKey()
                                                })
                                            } else {
                                                Model.rolPermiso.Action.editar({
                                                    data: {
                                                        ...activo,
                                                        estado: 0
                                                    },
                                                    key_usuario: Model.usuario.Action.getKey()
                                                })
                                            }
                                        }} />
                                    <SView width={4} />
                                    <SText>{itm2.descripcion}</SText>
                                </SView>
                            }}
                        />
                    </SView>
                }}
            />
            <SHr height={30} />
        </SView>
        )
    }
}