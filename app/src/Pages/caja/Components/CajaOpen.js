import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
import CajaActions from './CajaActions';
import CajaDetalleItem from './CajaDetalleItem';
import SelectMonedas from './SelectMonedas';
import _types from './_types';
import SSocket from 'servisofts-socket';
import Cajero from './Cajero';
import CajaArqueo from './CajaArqueo';
class CajaOpen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render_open(data) {
        var caja_detales = Model.caja_detalle.Action.getAll({ key_caja: data.key });
        var usuario = Model.usuario.Action.getByKey(data.key_usuario);
        if (!caja_detales) return <SLoad />
        if (!usuario) return <SLoad />
        var monto_actual = Model.caja_detalle.Action.getMontoEnCaja({ key_caja: data.key });
        // console.log(data)
        return <SView center col={"xs-12"}>
            <Cajero data={data} />
            <SHr />
            <SText>Fecha de apertura: {new SDate(data.fecha_on).toString("yyyy-MM-dd hh:mm:ss")}</SText>
            <SHr height={16} />
            <SView card style={{ padding: 16 }}>
                <SText fontSize={20} bold>Bs. {SMath.formatMoney(monto_actual)}</SText>
            </SView>
            <SHr height={36} />
            <CajaArqueo key_caja={data.key} />
            <SHr height={36} />
            <CajaActions data={data} />
            <SHr height={36} />
            <SList
                col={"xs-12"}
                order={[{ key: "fecha_on", order: "desc", peso: 1, type: "date" }]}
                data={caja_detales}
                render={(obj) => {
                    return <CajaDetalleItem data={obj} />
                }}
            />
            <SHr height={100} />
        </SView>
    }

    render() {
        return (<SView col={"xs-11 sm-10 md-8 lg-6 xl-4"}>
            {this.render_open(this.props.data)}
            {/* <SelectMonedas key_empresa={this.props.sucursal.key_empresa}/> */}
        </SView>
        );
    }
}

export default (CajaOpen);