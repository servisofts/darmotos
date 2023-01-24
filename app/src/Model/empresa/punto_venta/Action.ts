import { SAction } from "servisofts-model";
import Model from "../..";
export default class Action extends SAction {
    getAll({ key_sucursal }) {
        var reducer = this._getReducer();
        if (reducer.key_sucursal != key_sucursal) {
            reducer.data = null;
            reducer.key_sucursal = key_sucursal;
        }
        return super.getAll({
            key_sucursal: key_sucursal
        })
    }

    getByKey(key: any, { key_sucursal }: any) {
        var data = this.getAll({ key_sucursal });
        if (!data) return null;
        return super.getByKey(key, { key_sucursal: key_sucursal }, null);
    }
    getAllByKeyEmpresa(key_empresa) {
        // var empresa: any = Model.empresa.Action.getSelect();
        // if (!empresa) return null;
        var reducer = this._getReducer();
        if (reducer.key_empresa != key_empresa) {
            reducer.data = "";
            reducer.key_empresa = key_empresa;
        }

        var resp = super.getAll({
            key_empresa: key_empresa,
            key_usuario: Model.usuario.Action.getKey()
        })
        return resp;
    }
}   