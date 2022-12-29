import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../../Model';
import Cliente from '../Cliente';
import Comentarios from '../Comentarios';
import Detalle from '../Detalle';
import Estado from '../Estado';
import Participantes from '../Participantes';
import PlanPagos from '../PlanPagos';
import Proveedor from '../Proveedor';
import Separador from '../Separador';
import Totales from '../Totales';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getActions() {
        if (!this.isAdmin) return null
        return <SView col={"xs-12"} row center>
            <SView card style={{ padding: 16 }} onPress={() => {
                Model.compra_venta.Action.changeState({ data: this.data, state: "cotizacion" })
            }}>
                <SText bold color={STheme.color.lightBlack}>VOLVER A COTIZAR</SText>
            </SView>
            <SView width={8} />
            <SView card style={{ padding: 16 }} onPress={() => {
                Model.compra_venta.Action.changeState({ data: this.data, state: "comprado" })
            }}>
                <SText bold color={STheme.color.success}>COMPRAR</SText>
            </SView>
        </SView>
    }
    render() {
        this.data = this.props.data;
        this.isAdmin = Model.compra_venta_participante.Action.allowAdmin({ key_compra_venta: this.props.data.key });
        // var statei = Model.compra_venta.Action.getStateInfo(this.data.state)
        return (<SView col={"xs-12"} center>
            <SView col={"xs-12"} center card style={{ padding: 14, }}>
                <SHr />
                <SText center bold fontSize={18}>{this.data?.descripcion}</SText>
                <SHr />
                <SText center >{this.data?.observacion}</SText>
                <Separador data={this.data} />
                <Estado data={this.data} />
                <Separador data={this.data} />
                <Proveedor data={this.data} disabled />
                <Separador data={this.data} />
                <Cliente data={this.data} disabled />
                <Separador data={this.data} />
                <Detalle data={this.data} disabled />
                <Separador data={this.data} />
                <Totales data={this.data} disabled />
                <Separador data={this.data} />
                <PlanPagos ref={ref => this.pp = ref} data={this.data} disabled={!this.isAdmin} />
                <Separador data={this.data} />

                {/* <Separador data={this.data}/> */}


                {this.getActions()}
            </SView>
            <SHr height={50} />
            <Participantes data={this.data} />
            <SHr height={50} />
            <SView col={"xs-12"} center card>
                <Comentarios data={this.data} />
            </SView>
        </SView>
        );
    }
}