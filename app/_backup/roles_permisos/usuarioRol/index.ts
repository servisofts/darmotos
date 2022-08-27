import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "roles_permisos",
        component: "usuarioRol"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "fecha_on": { type: "timestamp" },
        "fecha_off": { type: "timestamp" },
        "estado": { type: "integer" },
        "key_rol": { type: "text", fk: "rol" },
        "key_usuario": { type: "text", fk: "usuario" },
    },
    Action,
    Reducer,
});