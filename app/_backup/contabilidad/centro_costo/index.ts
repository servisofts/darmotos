import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "contabilidad",
        component: "centro_costo"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "codigo": { type: "text", notNull: true, editable: true },
        "descripcion": { type: "text", notNull: true, editable: true },
        "fecha_on": { type: "timestamp" },
        "estado": { type: "integer" },
        "key_empresa": { type: "text", fk: "empresa", notNull: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "tipo": { type: "text" }
    },
    Action,
    Reducer,
});