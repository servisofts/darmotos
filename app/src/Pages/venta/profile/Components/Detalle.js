import React, { Component } from 'react';
import { SDate, SHr, SImage, SList, SLoad, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../../Model';
import PopupDetalleItem from './PopupDetalleItem';
export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    data = {}
    detalle_item({ key, key_usuario, nombre, precio, cantidad, descuento, tipo }) {
        var onPress = null;
        if (!this.props.disabled) {
            onPress = () => {
                SPopup.open({
                    key: "popup-detalle-item",
                    content: <PopupDetalleItem data={{ key, key_usuario, nombre, precio, cantidad, descuento }} key_compra_venta={this.data.key} />,
                })
            }
        }
        return <SView col={"xs-12"} row center onPress={onPress}>
            <SView width={40} height={40} style={{ padding: 4 }}>
                <SView flex height card style={{
                    overflow: 'hidden',
                }}>
                    <SImage src={SSocket.api.root + "usuario/" + key_usuario} />
                </SView>
            </SView>
            <SView flex>
                <SText bold >{nombre}</SText>
                <SText>{SMath.formatMoney(precio)} X {parseInt(cantidad)} </SText>
                <SText fontSize={10} bold color={STheme.color.lightGray}>{tipo}</SText>
            </SView>
            <SView width={8} />
            <SView col={"xs-3"} style={{ alignItems: 'end', textAlign: "end" }}>
                <SText style={{ alignItems: 'end', textAlign: "end" }}>{SMath.formatMoney((precio * cantidad))}</SText>
                {descuento ? <SText color={STheme.color.danger}>- {SMath.formatMoney(descuento)}</SText> : null}
            </SView>
        </SView>
    }
    getButtom() {
        if (this.props.disabled) return null;
        return <SView card style={{
            padding: 16
        }} onPress={() => {
            // SNavigation.navigate("/venta/detalle/new", { key_compra_venta: this.data.key })
            SNavigation.navigate("/productos/producto", {
                onSelect: (resp) => {
                    // var cvdp = Object.values(this.compra_venta_detalle_producto).find((o) => o.key_producto == resp.key && o.estado > 0)
                    // if (cvdp) {
                    //     var cvd = this.compra_venta_detalle[cvdp.key_compra_venta_detalle];
                    //     console.log(cvdp, cvd)
                    //     if (cvd) {
                    //         if (cvd.estado > 0) {
                    //             console.log(cvd, cvdp)
                    //             SPopup.alert("El producto ya existe en la cotizacion")
                    //             return;
                    //         }

                    //     }
                    // }
                    var precio_unitario = resp.precio_venta;
                    if (this.props.data.tipo_pago != "contado") {
                        precio_unitario = resp.precio_venta_credito;
                    }
                    Model.compra_venta_detalle.Action.registro({
                        data: {
                            key_compra_venta: this.data.key,
                            tipo: "producto",
                            descripcion: resp.descripcion,
                            cantidad: 1,
                            precio_unitario: precio_unitario,
                            descuento: 0,
                            data: {
                                precio_venta: resp.precio_venta,
                                precio_venta_credito: resp.precio_venta_credito,
                            }
                        },
                        key_producto: resp.key,
                        key_usuario: Model.usuario.Action.getKey()
                    })
                    console.log(resp);
                }
            })
        }}>
            <SText bold color={STheme.color.danger} center>AGREGAR PRODUCTO O SERVICIO</SText>
        </SView>
    }
    render() {
        this.data = this.props.data;
        this.compra_venta_detalle = Model.compra_venta_detalle.Action.getAll({
            key_compra_venta: this.data.key
        })
        // this.compra_venta_detalle_producto = Model.compra_venta_detalle_producto.Action.getAll({
        //     key_compra_venta: this.data.key
        // });
        // if (!this.compra_venta_detalle_producto) return <SLoad />
        if (!this.compra_venta_detalle) return <SLoad />
        return <SView col={"xs-12"} center>
            <SHr />
            <SText bold>DETALLE</SText>
            <SHr />
            {/* <SText>{JSON.stringify(this.compra_venta_detalle)}</SText> */}
            <SList
                data={this.compra_venta_detalle}
                filter={obj => obj.estado != 0 && obj.key_compra_venta == this.data.key}
                order={[{ "key": "fecha_on", order: "asc" }]}
                render={(obj) => {
                    // var cvdp = Object.values(this.compra_venta_detalle_producto).find((o) => o.key_compra_venta_detalle == obj.key)
                    // var producto = Model.producto.Action.getByKey(cvdp.key_producto);
                    // if (!producto) return <SLoad />
                    // var precio_unitario = obj.data.precio_venta;
                    // if (this.props.data.tipo_pago != "contado") {
                    //     precio_unitario = obj.data.precio_venta_credito;
                    // }
                    // if (this.state.loading) return <SLoad />

                    // if (parseFloat(precio_unitario) != parseFloat(obj.precio_unitario)) {
                    //     console.log("AQUI ENTRA ENL PRECIO UNITARIO DIFERENTE")
                    //     // console.log(obj.precio_unitario, precio_unitario)
                    //     obj.precio_unitario = precio_unitario;
                    //     this.setState({ loading: true })
                    //     Model.compra_venta_detalle.Action.editar({
                    //         data: obj
                    //     }).then((resp) => {
                    //         this.setState({ loading: false })
                    //     }).catch((e) => {
                    //         this.setState({ loading: false })
                    //     })
                    //     return <SLoad />
                    // }

                    return this.detalle_item({
                        key: obj.key,
                        nombre: obj.descripcion,
                        cantidad: obj.cantidad,
                        precio: obj.precio_unitario,
                        key_usuario: obj.key_usuario,
                        descuento: obj.descuento,
                        tipo: obj.tipo
                    })
                }}
            />
            <SHr />
            <SHr />
            {this.getButtom()}
        </SView>
    }
}
