import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "inventario",
        component: "modelo"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_marca": { type: "text", fk: "marca", label: "Marca" },
        "descripcion": { type: "text", notNull: true, editable: true, label: "Descripcion" },
        "observacion": { type: "text", editable: true, label: "Observacion" },
        "fecha_on": { type: "timestamp", label: "F. Creacion" },
        "estado": { type: "integer" },

    },
    image: {
        api: "inventario",
        name: "modelo",
    },
    Action,
    Reducer,
});