import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../../Model';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_banco"],
            params: ["key_banco?"]
            // item: Item,

        });
    }
    $allowNew() {
        return true
    }
    $allowTable() {
        return true
    }
    $allowAccess() {
        return true && !this.$params.key_banco
    }
    $filter(data) {
        return data.estado != 0
    }
    $getData() {
        return Parent.model.Action.getAll();
    }
}
export default connect(index);