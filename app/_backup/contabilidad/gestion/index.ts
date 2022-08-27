import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "contabilidad",
        component: "gestion"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "descripcion": { type: "text", notNull: true, editable: true },
        "fecha_on": { type: "timestamp" },
        "estado": { type: "integer", editable: true },
        "fecha": { type: "timestamp" },
        "key_empresa": { type: "text", fk: "empresa", notNull: true },
        "key_usuario": { type: "text", fk: "usuario" }
    },
    Action,
    Reducer,
});