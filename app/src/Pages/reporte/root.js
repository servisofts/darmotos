import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <SPage title={'Reportes'}>
                <SHr height={32} />
                <MenuPages path={"/reporte/"} >
                    <MenuButtom label={"Balance"} icon={<SImage src={require("./balance/logo.png")} />} onPress={() => {
                        SPopup.dateBetween("Entre que fechas quiere ver el balance?", (fecha) => {
                            SNavigation.navigate("/reporte/balance", fecha)
                        })
                    }} />
                    <MenuButtom label={"Cajas activas"} icon={<SImage src={require("./cajas_activas/logo.png")} />} onPress={() => {
                        SNavigation.navigate("/reporte/cajas_activas")
                    }} />
                    <MenuButtom label={"Cajas historico"} icon={<SImage src={require("./cajas_historico/logo.png")} />} onPress={() => {
                        SPopup.dateBetween("Entre que fechas quiere ver las cajas?", (fecha) => {
                            SNavigation.navigate("/reporte/cajas_historico", fecha)
                        })
                    }} />
                </MenuPages>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);