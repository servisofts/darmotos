import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "test"
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
        }
    },
    image:{
        name:"test"
    },
    Action,
    Reducer,
});