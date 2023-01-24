import React, { Component } from 'react';
import { SButtom, SHr, SInput, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../Model';
import PopupMontoDetalle from '../PopupMontoDetalle';

export default class index {
    static key = "cierre";
    static descripcion = "Cierre de caja"
    static icon = "Salir"
    static isActive(obj) {
        return 1
    }
    static getEstado(obj) {
        return <SText color={STheme.color.success}>{"confirmada"}</SText>
    }
    static action(obj) {

    }
    static onPress(data) {

        SPopup.confirm({
            title: "Seguro q desea cerrar la caja",
            onPress: () => {
                Model.caja.Action.editar({
                    action: "cerrar",
                    data: {
                        ...data,
                    },
                    key_usuario: Model.usuario.Action.getKey()
                }).then((e) => {
                    // SNavigation.goBack();
                }).catch((e) => {

                })
            }

        })

    }
}
