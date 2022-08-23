import React, { Component } from 'react'
import { SHr, SImage, SInput, SList, SLoad, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../../../Model';

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
        var allowEdit = Model.usuarioPage.Action.getPermiso({ url: "/rol/profile/permisos", permiso: "edit" })
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
                order={[{ key: "url", order: "asc", peso: 1 }]}
                // horizontal={true}
                data={pages}
                render={(itm) => {
                    var pf = Object.values(permisos).filter(obj => obj.key_page == itm.key)
                    var cant = itm.url.split(/\//g).length;
                    return <SView col={"xs-12"} style={{
                        padding: 8,
                        paddingLeft: (cant - 1) * 16,
                    }} card>
                        <SHr height={16} />
                        <SView row flex style={{
                            alignItems: "center"
                        }} >
                            <SView width={40} height={40} card>
                                <SImage src={Model.page._get_image_download_path(SSocket.api, itm.key)} />
                            </SView>
                            <SView width={8} />
                            <SView flex>
                                <SText fontSize={16} bold>{itm.descripcion}</SText>
                                <SHr height={4} />
                                <SText fontSize={12}>{itm.url}</SText>
                            </SView>

                        </SView>
                        <SHr />
                        <SList
                            data={pf}
                            horizontal
                            order={[{ key: "type", order: "desc", "peso": 1 }]}
                            space={16}
                            render={(itm2) => {
                                var activo = Object.values(permisos_rol).find(elm => elm.key_permiso == itm2.key)
                                return <SView style={{
                                    alignItems: 'center',
                                    marginTop: 4,
                                }}>
                                    <SInput
                                        col={""}
                                        type={"checkBox"}
                                        defaultValue={!!activo}
                                        disabled={!allowEdit}
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
                                    <SText color={STheme.color.lightGray}>{itm2.descripcion}</SText>
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