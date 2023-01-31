import React, { Component } from 'react';
import { SNavigation, SText, STheme } from 'servisofts-component';
import Model from '../../../../Model';

export default class amortizacion {
    static key = "amortizacion";
    static descripcion = "Deudas de clientes"
    static icon = "Caja"
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
                monto: monto,
                fecha: "2023-01-06",
                key_cuota: data.key_cuota,
                key_caja_detalle: obj.key
            },
            key_usuario: Model.usuario.Action.getKey()
        }).then(e => {
            var amortizacion = e.data;
            obj.data.key_amortizacion = amortizacion.key
            Model.caja_detalle.Action.editar({
                data: obj,
                key_usuario: Model.usuario.Action.getKey()
            })
        }).catch(e => {
            console.error(e);
        })

    }


    static onPress(caja) {
        SNavigation.navigate("/cobranza/clientes_con_deuda", {
            onSelect: (cuota) => {
                SNavigation.navigate("/caja/tipo_pago", {
                    monto: cuota.monto,
                    detalle: "Amortizacion de cuota",
                    key_caja: caja.key,
                    _type: this.key,
                    onSelect: (tipo_pago) => {
                        console.log("Selecciono el tipo de pago");
                        var caja_detalle = {
                            "key_caja": caja.key,
                            "descripcion": "Amortizacion de cuota",
                            "monto": cuota.monto,
                            "tipo": "ingreso",
                            "key_tipo_pago": tipo_pago.key,
                            "data": {
                                "type": "amortizacion",
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

                // var caja_detalle = {
                //     "key_caja": data.key,
                //     "descripcion": "Amortizacion de cuota (" + cuota.codigo + ") " + cuota.descripcion,
                //     "monto": "21.00",
                //     "tipo": "ingreso",
                //     "key_tipo_pago": "efectivo",
                //     "data": {
                //         "type": "amortizacion",
                //         "key_cuota": cuota.key
                //     }
                // }

                // Model.caja_detalle.Action.registro({
                //     data: caja_detalle,
                //     key_usuario: Model.usuario.Action.getKey()
                // }).then((resp) => {
                //     console.log(resp)

                // })

            }
        })
    }
}
