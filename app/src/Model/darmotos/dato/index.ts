import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "dato"
    },
    Columns: {
        "key": {
            type: "text",
            pk: true
        },
        "fecha_on": {
            type: "timestamp",
            label: "Fecha de creacion"
        },
        "estado": {
            type: "integer"
        },
        "key_usuario": {
            type: "text",
            fk: "usuario"
        },
        "descripcion": {
            type: "text",
            label: "Descripcion",
            notNull: true,
            editable: true
        },
        "observacion": {
            type: "text",
            label: "Observacion",
            notNull: true,
            editable: true
        },
        "tipo": {
            type: "text",
            label: "Observacion",
            notNull: true,
            editable: true
        },
        "required": {
            type: "boolean",
            notNull: true,
            editable: true
        },
        "caducable": {
            type: "boolean",
            notNull: true,
            editable: true
        },
    },
    image: {
        name: "test"
    },
    Action,
    Reducer,
});