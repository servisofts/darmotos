import { SNavigation, SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";
export default class Action extends SAction {

    getAll() {
        return super.getAll({
            cabecera: "usuario_app",
            key_usuario: "",
        })
    }
    async registro(data) {
        return super.registro({
            cabecera: "usuario_app",
            key_usuario: "",
            ...data
        });
    }
    async editar(extra) {
        return super.editar({
            cabecera: "usuario_app",
            key_usuario: "",
            ...extra
        });
    }

    async login({ usuario, password }) {
        return new Promise((resolve, reject) => {
            const petition = {
                ...this.model.info,
                type: "login",
                estado: "cargando",
                data: {
                    usuario,
                    password
                }
            }
            SSocket.sendPromise(petition).then((resp) => {
                this._dispatch(resp);
                resolve(resp);
            }).catch(e => {
                reject(e);
            });
        });
    }
    unlogin() {
        SStorage.removeItem('usr_log');
        Model._events.CLEAR();
        SNavigation.reset("/");
    }
    getUsuarioLog() {
        var reducer = this._getReducer()
        return reducer.usuarioLog;
    }
    getKey() {
        var reducer = this._getReducer()
        return reducer.usuarioLog?.key;
    }

}