import { SAction } from "servisofts-model";
export default class Action extends SAction {

    getAllByKeyUsuario(key) {
        var reducer = this._getReducer();
        if (reducer.key_usuario != key) {
            reducer.data = "";
            reducer.key_usuario = key;
        }
        return super.getAll({
            key_usuario: key
        })
    }
}