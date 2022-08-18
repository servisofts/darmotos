import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "roles_permisos",
        component: "rolPermiso"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "type": { type: "text", editable: true, },
        "fecha_on": { type: "timestamp" },
        "estado": { type: "integer" },
        "key_rol": { type: "text", fk: "rol" },
        "key_permiso": { type: "text", fk: "permiso" },
    },

    Action,
    Reducer,
});