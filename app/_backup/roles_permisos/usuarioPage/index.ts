import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "roles_permisos",
        component: "usuarioPage"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "fecha_on": { type: "timestamp" },
        "estado": { type: "integer" },
        "key_servicio": { type: "text", fk: "servicio" },
        "descripcion": { type: "text", editable: true, },
        "url": { type: "text", editable: true, },
        "is_page": { type: "boolean", editable: true, },
    },
    // image: "rol",
    Action,
    Reducer,
});