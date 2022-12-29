import React, { Component } from 'react';
import { SButtom, SHr, SLoad, SNavigation, SText, SView } from 'servisofts-component';
import Model from '../../../../Model';

export default class AlmacenActual extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderAlmacen() {
        var data = Model.almacen_producto.Action.getAllByKeyProducto({
            key_producto: this.props.key_producto
        })
        if (!data) return <SLoad />
        var obj = Object.values(data)[0]
        if (!obj) {
            return null;
        }
        var almacen = Model.almacen.Action.getByKey(obj.key_almacen);
        if (!almacen) return <SLoad />
        return <SView col={"xs-12"} card style={{
            padding: 4
        }}>
            <SHr />
            <SText bold>{almacen.descripcion}</SText>
            <SText>{almacen.observacion}</SText>
            <SHr />
        </SView>
    }
    render() {
        return (
            <SView center col={"xs-12"}>
                {this.renderAlmacen()}
                <SHr />
                <SButtom type={"danger"} onPress={() => {
                    SNavigation.navigate("/inventario/almacen/list", {
                        onSelect: (almacen) => {
                            Model.almacen_producto.Action.traspaso({
                                key_almacen: almacen.key,
                                key_producto: this.props.key_producto
                            }).then(r => {
                                console.log("entro en la respuesta")
                            }).catch(e => {

                            })
                        }
                    })
                }}>TRASPASAR</SButtom>
            </SView>
        );
    }
}
