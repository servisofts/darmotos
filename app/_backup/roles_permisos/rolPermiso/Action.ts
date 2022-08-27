import { SAction } from "servisofts-model";
export default class Action extends SAction {
    getAllByKeyRol(key) {
        var reducer = this._getReducer();
        if (reducer.key_rol != key) {
            reducer.data = "";
            reducer.key_rol = key;
        }
        return super.getAll({
            key_usuario:"",
            key_rol: key
        })
    }
}