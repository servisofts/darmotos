import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";
import SSocket from 'servisofts-socket'
export default new SModel<Action, Reducer>({
    info: {
        service: "usuario",
        component: "usuario",
        version: "2.0",
    },
    image: {
        name: "usuario",
        api: "root"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "Nombres": { type: "text", notNull: true, editable: true },
        "Apellidos": { type: "text", notNull: true, editable: true },
        "CI": { type: "text", notNull: true, editable: true },
        "Correo": { type: "text", notNull: true, editable: true },
        "Telefono": { type: "text", notNull: true, editable: true },
        "Password": { type: "text", notNull: true, editable: true },
    },
    Action,
    Reducer,
});