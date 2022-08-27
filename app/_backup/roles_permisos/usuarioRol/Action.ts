import { SAction } from "servisofts-model";
export default class Action extends SAction {

    getAllByKeyUsuario(key) {
        var reducer = this._getReducer();
        if (reducer.key_usr != key) {
            reducer.data_usr = "";
            reducer.data = "";

            reducer.key_usr = key;
        }
        if (!reducer.data_usr) {
            var data = super.getAll({
                key_usuario: key
            })
            if (!data) return null;
            reducer.data_usr = data;
        }
        return reducer.data_usr
    }
    getAllByKeyRol(key) {
        var reducer = this._getReducer();
        if (reducer.key_rol != key) {
            reducer.data_rol = "";
            reducer.data = "";

            reducer.key_rol = key;
        }
        if (!reducer.data_rol) {
            var data = super.getAll({
                key_rol: key
            })
            if (!data) return null;
            reducer.data_rol = data;
        }
        return reducer.data_rol
    }
}