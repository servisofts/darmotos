import React, { Component } from 'react';
import { SButtom, SDate, SHr, SInput, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../Model';
import PopupMontoDetalle from '../PopupMontoDetalle';

export default class index {
    static key = "pago_servicio";
    static descripcion = "Pago de servicio"
    static icon = "Carrito"
    static isActive(obj) {
        if (!obj.data.key_amortizacion) return 0
        return 1
    }
    static getEstado(obj) {
        if (!obj.data.key_amortizacion) return <SText color={STheme.color.warning}>{"Pendiente"}</SText>
        return <SText color={STheme.color.success}>{"confirmada"}</SText>
    }
    static action(obj) {
        if (obj.data.key_amortizacion) return "El movimiento ya esta confirmado."
        const { data, monto } = obj
        Model.cuota_amortizacion.Action.registro({
            data: {
                descripcion: "Amortizacion de cuota desde caja.",
                observacion: "--",
                monto: monto*-1,
                fecha: new SDate().toString("yyyy-MM-dd"),
                key_cuota: data.key_cuota,
                key_caja_detalle: obj.key
            },
            key_usuario: Model.usuario.Action.getKey()
        }).then(e => {
            var amortizacion = e.data;
            obj.data.key_amortizacion = amortizacion.key
            obj.cuentas = Object.values(e.cuentas);
            Model.caja_detalle.Action.editar({
                data: obj,
                key_usuario: Model.usuario.Action.getKey()
            })
        }).catch(e => {
            console.error(e);
        })
    }
    static onPress(caja) {
        //Pedimos el monto y el detalle
        SNavigation.navigate("/cobranza/proveedores_que_debemos", {
            onSelect: (cuota) => {
                SNavigation.navigate("/caja/tipo_pago", {
                    monto: cuota.monto,
                    detalle: "Pago de servicio",
                    key_caja: caja.key,
                    _type: this.key,
                    onSelect: (tipo_pago) => {
                        var caja_detalle = {
                            "key_caja": caja.key,
                            "descripcion": "Pago de servicio",
                            "monto": cuota.monto * -1,
                            "tipo": "egreso",
                            "key_tipo_pago": tipo_pago.key,
                            "data": {
                                "type": "pago_servicio",
                                "key_cuota": cuota.key
                            }
                        }
                        console.log(caja_detalle)
                        Model.caja_detalle.Action.registro({
                            data: caja_detalle,
                            key_usuario: Model.usuario.Action.getKey()
                        }).then((resp) => {
                            console.log(resp)

                        })
                    }

                })
            }
        })
        return;
        PopupMontoDetalle.open({
            title: this.descripcion,
            onSubmit: ({ monto, detalle }) => {
                //Pedimos el tipo de pago
                var caja_detalle = {
                    "key_caja": caja.key,
                    "descripcion": detalle,
                    "monto": monto * -1,
                    "tipo": "egreso",
                    "key_tipo_pago": "efectivo",
                }
                //Registramos el caja_detalle
                Model.caja_detalle.Action.registro({
                    data: caja_detalle,
                    key_usuario: Model.usuario.Action.getKey()
                }).then((resp) => {
                    console.log(resp)

                })

            }
        });
    }
}
