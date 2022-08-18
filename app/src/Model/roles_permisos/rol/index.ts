import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "roles_permisos",
        component: "rol"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "descripcion": { type: "text", editable: true, },
        "fecha_on": { type: "timestamp" },
        "estado": { type: "integer" },
        "key_servicio": { type: "text", fk: "servicio" },
    },
    image: {
        api:"roles_permisos",
        name:"rol"
    },
    Action,
    Reducer,
});