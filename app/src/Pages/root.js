import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SNavigation, SPage, SText, SView } from 'servisofts-component';
import Model from '../Model';
import PagesList from "./index";
import SSocket from 'servisofts-socket'
import MenuButtom from '../Components/MenuButtom';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getPages() {
        var dataPage = Model.usuarioPage.Action.getPages();
        if (!dataPage) return null;
        return Object.values(dataPage).map((obj) => {
            return <MenuButtom url={obj.url} permiso={"page"} />
        })
    }


    render() {
        if (!Model.usuario.Action.getUsuarioLog()) {
            SNavigation.replace("/login");
            return null;
        }
        return (
            <SPage title={'DARMOTOS'} >
                <SHr height={32} />
                <SView col={"xs-12"} row center>

                    <MenuButtom label={"Profile"} url={"/profile"} icon={<SIcon name={"Ajustes"} />} />
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