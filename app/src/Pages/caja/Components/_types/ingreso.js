import React, { Component } from 'react';
import { SButtom, SHr, SInput, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../Model';
import PopupMontoDetalle from '../PopupMontoDetalle';

export default class ingreso {
    static key = "ingreso";
    static descripcion = "Ingreso"
    static icon = "Ingreso"
    static isActive(obj) {
        return 1
    }
    static getEstado(obj) {
        return <SText color={STheme.color.success}>{"confirmada"}</SText>
    }
    static action(obj) {

    }
    static onPress(caja) {
        //Pedimos el monto y el detalle
        PopupMontoDetalle.open({
            onSubmit: ({ monto, detalle }) => {
                //Pedimos el tipo de pago
                SNavigation.navigate("/caja/tipo_pago", {
                    monto: monto,
                    detalle: detalle,
                    key_caja: caja.key,
                    _type: this.key,
                    onSelect: (tipo_pago) => {
                        var caja_detalle = {
                            "key_caja": caja.key,
                            "descripcion": detalle,
                            "monto": monto,
                            "tipo": "ingreso",
                            "key_tipo_pago": tipo_pago.key,
                        }
                        //Registramos el caja_detalle
                        Model.caja_detalle.Action.registro({
                            data: caja_detalle,
                            key_usuario: Model.usuario.Action.getKey()
                        }).then((resp) => {
                            console.log(resp)

                        })
                    }

                })
            }
        });
    }
}
