import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SLoad, SNavigation, SText, SView } from 'servisofts-component'
import Model from '../../Model';

type MenuButtomType = {
    label: String,
    url: String,
    icon: any,
    permiso?: String
}
export default class MenuButtom extends Component<MenuButtomType> {
    render() {

        if (this.props.permiso) {
            var permiso = Model.usuarioPage.Action.getPermiso({ url: this.props.url, permiso: this.props.permiso });
            if (permiso == "cargando") {
                return null;
            }
            if (!permiso) return null;
        }

        return <SView
            height={100}
            width={90}
            center
            onPress={() => {
                SNavigation.navigate(this.props.url)
            }}>
            <SView width={60} height={60}>
                {this.props.icon}
            </SView>
            <SView col={"xs-12"} flex>
                <SText center fontSize={14} col={"xs-12"}>{this.props.label}</SText>
            </SView>
        </SView>
    }
}