import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, SImage, SLoad, SNavigation, SText, STheme, SView } from 'servisofts-component'
import Model from '../../Model';
import SSocket from 'servisofts-socket'

type MenuButtomType = {
    label: String,
    url: String,
    icon: any,
    permiso?: String,
    params?: any,
    onPress?: Function
}
export default class MenuButtom extends Component<MenuButtomType> {
    buildIcon(label) {
        return <SView col={"xs-12"} height style={{
            position: "absolute",
        }} backgroundColor={STheme.color.card}>
            {/* <SIcon name={"Box"} fill={STheme.color.card} /> */}
            {/* <SView style={{
                position: "absolute",
            }} center col={"xs-12"} height>
                <SText color={STheme.color.gray} fontSize={12} bold>{label}</SText>
            </SView> */}
        </SView>
    }

    render() {

        var label = this.props.label;
        var icon = this.props.icon;
        if (this.props.permiso) {
            var permiso = Model.usuarioPage.Action.getPermiso({ url: this.props.url, permiso: this.props.permiso });
            var page = Model.usuarioPage.Action.getPage({ url: this.props.url });

            if (permiso == "cargando") {
                return null;
            }
            if (page == "cargando") {
                return null;
            }
            if (!permiso) return null;
            if (!icon) {
                icon = <SImage src={SSocket.api.roles_permisos + "/page/" + permiso.key_page} style={{
                    resizeMode: "cover"
                }} />
            }
            if (!label) {
                label = page.descripcion;

            }

        }

        return <SView
            height={100}
            width={90}
            center
            onPress={() => {
                if (this.props.onPress) {
                    this.props.onPress();
                    return;
                }
                if (this.props.params) {
                    SNavigation.navigate(this.props.url, this.props.params)
                    return;
                }
                SNavigation.navigate(this.props.url)
            }}>
            <SView width={60} height={60} style={{
                borderRadius: 8,
                overflow: 'hidden',
            }}>
                {icon}
            </SView>
            <SView col={"xs-11"} flex>
                <SText center fontSize={14} col={"xs-12"}>{label}</SText>
            </SView>
        </SView>
    }
}