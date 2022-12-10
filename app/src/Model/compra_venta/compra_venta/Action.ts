import { STheme } from "servisofts-component";
import { SAction } from "servisofts-model";
import Model from "../..";

import { compra_venta_state } from "./index"
export default class Action extends SAction {

    registro(extra?: {}): Promise<unknown> {
        return super.registro({
            ...extra,
            key_usuario: Model.usuario.Action.getKey(),
        })
    }

    aprobar({ key_compra_venta }): Promise<unknown> {
        return super.editar({
            data: {
                key: key_compra_venta,
                state: "aprobado"
            },
            key_usuario: Model.usuario.Action.getKey(),
        })
    }
    changeState(obj: { data: any, state: compra_venta_state }): Promise<unknown> {
        return super.editar({
            data: {
                ...obj.data,
                state: obj.state
            },
            key_usuario: Model.usuario.Action.getKey(),
        })
    }

    getStateInfo(key) {
        var statesi = {
            "cotizacion": { color: STheme.color.lightGray, label: "Cotizacion" },
            "aprobado": { color: STheme.color.warning, label: "Aprobado" },
            "denegado": { color: STheme.color.danger, label: "Denegado" },
            "comprado": { color: STheme.color.success, label: "Comprado" },
        }
        if (!key) return statesi;
        return statesi[key];

    }
    // getAll() {
    //     var empresa: any = Model.empresa.Action.getSelect();
    //     if (!empresa) return null;
    //     return super.getAll({
    //         key_empresa: empresa.key,
    //         key_usuario: Model.usuario.Action.getKey()
    //     })
    // }
}   