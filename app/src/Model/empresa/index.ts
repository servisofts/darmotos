import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

class index extends SModel<Action, Reducer> {
    constructor() {
        super({
            info: {
                service:"empresa",
                component: "empresa"
            },
            Action,
            Reducer,
        });
    }
}

export default new index();