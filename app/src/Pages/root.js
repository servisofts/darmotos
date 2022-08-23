import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SNavigation, SPage, SText, SView } from 'servisofts-component';
import Model from '../Model';
import MenuButtom from '../Components/MenuButtom';
import MenuPages from '../Components/MenuPages';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        if (!Model.usuario.Action.getUsuarioLog()) {
            SNavigation.replace("/login");
            return null;
        }
        return (
            <SPage title={'DARMOTOS'} >
                <SHr height={32} />
                <MenuPages path={"/"} permiso={"page"}>
                    <MenuButtom label={"Profile"} url={"/profile"} icon={<SIcon name={"Ajustes"} />} />
                </MenuPages>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);