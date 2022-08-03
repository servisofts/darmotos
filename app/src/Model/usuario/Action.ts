import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
export default class Action extends SAction {
    
    getAll() {
        super.getAll({
            cabecera: "usuario_app",
            key_usuario: "",
        })
    }
    registro(data): void {
        super.registro({
            cabecera: "usuario_app",
            key_usuario: "",
            data
        });
    }

    login({ usuario, password }) {
        const petition = {
            ...this.model.info,
            type: "login",
            estado: "cargando",
            data: {
                usuario,
                password
            }
        }
        SSocket.send(petition);
    }

}