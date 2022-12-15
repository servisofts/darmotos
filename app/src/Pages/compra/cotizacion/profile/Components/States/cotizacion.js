import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../../../Model';
import Cliente from '../Cliente';
import Detalle from '../Detalle';
import Estado from '../Estado';
import Proveedor from '../Proveedor';
import Separador from '../Separador';
import Totales from '../Totales';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        this.data = this.props.data;
        var statei = Model.compra_venta.Action.getStateInfo(this.data.state)
        return (<SView col={"xs-12"} center card style={{ padding: 14, }}>
            <SHr />
            <SText center bold fontSize={18}>{this.data?.descripcion}</SText>
            <SHr />
            <SText center >{this.data?.observacion}</SText>
            <Separador data={this.data} />
            <Estado data={this.data} />
            <Separador data={this.data} />
            <Proveedor data={this.data} />
            <Separador data={this.data} />
            <Cliente data={this.data} />
            <Separador data={this.data} />
            <Detalle data={this.data} />
            <Separador data={this.data} />
            <Totales data={this.data} />
            <Separador data={this.data} />
            <SView col={"xs-12"} center row>

                <SView card style={{ padding: 16, }} onPress={() => {
                    Model.compra_venta.Action.changeState({ data: this.data, state: "denegado" })
                }}>
                    <SText bold color={STheme.color.danger}>DENEGAR</SText>
                </SView>
                <SView width={8} />

                <SView card style={{ padding: 16 }} onPress={() => {
                    Model.compra_venta.Action.changeState({ data: this.data, state: "aprobado" })
                }}>
                    <SText bold color={STheme.color.warning}>APROBAR</SText>
                </SView>
            </SView>
        </SView>
        );
    }
}