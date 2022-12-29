import React, { Component } from 'react';
import { SButtom, SDate, SHr, SIcon, SList, SLoad, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../Model';

export default class AlmacenProductoHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderAlmacen() {
        var data = Model.almacen_producto.Action.getHistorico({
            key_producto: this.props.key_producto
        })
        var almacenes = Model.almacen.Action.getAll();
        if (!data) return <SLoad />
        if (!almacenes) return <SLoad />
        // var obj = Object.values(data)[0]

        return <SList
            data={data}
            center
            horizontal
            order={[{ key: "fecha_movimiento", order: "desc", type: "date" }]}
            render={(obj, key, index) => {
                var almacen = Model.almacen.Action.getByKey(obj.key_almacen);
                // var esUltimo = (Object.values(data).length - 1) == index;
                var esUltimo = 0 == index;

                return <SView center row>
                    {/* {!esUltimo ? <SIcon name='Arrow' width={20} height={20} fill={STheme.color.gray} /> : <SView width={20} />} */}

                    <SView width={110} card style={{
                        padding: 2,
                        opacity: !esUltimo ? 0.6 : 1,
                    }} center>
                        <SHr />
                        <SText bold center>{almacen.descripcion}</SText>
                        <SHr />
                        <SText center fontSize={12} color={STheme.color.gray}>{new SDate(obj.fecha_movimiento).toString("yyyy-MM-dd hh:mm:ss")}</SText>
                        <SHr />
                    </SView>
                    <SIcon name='Arrow' width={20} height={20} fill={STheme.color.gray} />
                    <SHr />
                </SView>
            }}
        />
    }
    render() {
        return (
            <SView col={"xs-12"}>
                <SHr />
                <SText>Historial de trapasos de almacenes:</SText>
                <SHr />
                {this.renderAlmacen()}
            </SView>
        );
    }
}
