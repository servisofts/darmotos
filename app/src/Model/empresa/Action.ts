import { SAction } from "servisofts-model";
export default class Action extends SAction {
    getAll() {
        super.getAll({
            key_usuario: "",
        })
    }
}