import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SPage, SText, STheme, SView } from 'servisofts-component';
import MenuButtom from '../../Components/MenuButtom';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <SPage title={'Inventario'}>
                <SHr height={32} />
                <SView col={"xs-12"} row center>
                    <MenuButtom url={"/inventario/marca"} permiso={"ver"} />
                    <MenuButtom url={"/inventario/modelo"} permiso={"ver"} />
                    <MenuButtom url={"/inventario/almacen"} permiso={"ver"} />
                    <MenuButtom url={"/inventario/producto"} permiso={"ver"} />
                    <MenuButtom url={"/inventario/inventario_dato"} permiso={"ver"} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);