import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SNavigation, SPage, SText, SView } from 'servisofts-component';
import Model from '../../Model';
// import Model from '../../Model';
import PagesList from "../index";
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItem({ label, url, icon }) {
        return <SView
            height={100}
            width={100}
            center
            onPress={() => {
                SNavigation.navigate(url)
            }}>
            <SView width={60} height={60}>
                {icon}
            </SView>
            <SText center fontSize={14} col={"xs-12"}>{label}</SText>
        </SView>
    }
    getPages() {
        var dataPage = Model.usuarioPage.Action.getPages();
        if (!dataPage) return null;
        return Object.values(dataPage).map((obj) => {
            return this.getItem({
                icon: <SImage src={SSocket.api.roles_permisos + "/page/" + obj.key} />,
                label: obj.descripcion,
                url: obj.url
            })
        })
    }


    render() {
        if (!Model.usuario.Action.getUsuarioLog()) {
            SNavigation.replace("/user/login");
            return null;
        }

        return (
            <SPage title={'DarMotos'} >
                <SView col={"xs-12"} row>
                    <SHr />
                    {this.getItem({
                        label: "Profile",
                        url: "/user/profile",
                        icon: <SIcon name={"Ajustes"} />
                    })}
                    {this.getPages()}

                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);