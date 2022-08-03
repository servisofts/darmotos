import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

class index extends SModel<Action, Reducer> {
    constructor() {
        super({
            info: {
                service:"usuario",
                component: "usuario",
                version: "2.0",
            },
            Action,
            Reducer,
        });
    }
}

export default new index();