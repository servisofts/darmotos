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
            <SText center bold>{this.data?.tipo}</SText>
            <SText center bold>{this.data?.descripcion}</SText>
            <SHr />
            <SText center >{this.data?.observacion}</SText>
            <Separador data={this.data} />
            <Estado data={this.data} />
            <Separador data={this.data} />
            <Proveedor data={this.data} disabled />
            <Separador data={this.data} />
            <Cliente data={this.data} />
            <Separador data={this.data} />
            <Detalle disabled data={this.data} />
            <Separador data={this.data} />
            <Totales data={this.data} />
            <Separador data={this.data} />
            <SHr />
            <SText>ESTA COTIZACION FUE DENEGADA</SText>
            <SHr />
            <Separador data={this.data} />
            <SView card style={{ padding: 16 }} onPress={() => {
                Model.compra_venta.Action.changeState({ data: this.data, state: "cotizacion" })
            }}>
                <SText bold color={STheme.color.lightBlack}>VOLVER A COTIZAR</SText>
            </SView>
        </SView>

        );
    }
}