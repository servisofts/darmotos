import React, { Component } from 'react';
import { SButtom, SDate, SHr, SIcon, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import _types from './_types';
export default class CajaDetalleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getColor() {
        if (this.props.data.monto > 0) return STheme.color.text
        return STheme.color.danger
    }

    getTipo(obj) {
        var data = obj.data;
        if (!data) return null;
        var tipo = _types[data.type]
        return <SView onPress={() => {
            tipo.action(obj);
        }}>{tipo.getEstado(obj)}</SView>
    }

    render() {
        var obj = this.props.data;
        // console.log(obj)
        return <SView col={"xs-12"} card style={{ padding: 8 }} row>
            {/* <SText card style={{ padding: 8 }}>{JSON.stringify(obj)}</SText> */}
            <SView flex>
                <SText fontSize={16}>{obj.descripcion}</SText>
                <SText fontSize={10} color={STheme.color.gray}>{new SDate(obj.fecha_on).toString("yyyy-MM-dd hh:mm")}</SText>
                <SText fontSize={16}>{obj.key_cuenta_contable}</SText>
                <SHr />
                <SHr />
            </SView>
            <SView center>
                <SText bold color={this.getColor()} fontSize={16}>Bs. {SMath.formatMoney(obj.monto)}</SText>
                <SText fontSize={10}>{obj.key_tipo_pago}</SText>
            </SView>
            <SView col={"xs-12"}>
                {this.getTipo(obj)}
            </SView>
        </SView>
    }
}
