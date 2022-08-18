import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "roles_permisos",
        component: "permiso"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "descripcion": { type: "text", editable: true, },
        "type": { type: "text", editable: true, },
        "fecha_on": { type: "timestamp" },
        "estado": { type: "integer" },
        "key_page": { type: "text", fk: "page" },
    },
    image: {
        api: "roles_permisos",
        name: "permiso"
    },
    Action,
    Reducer,
});