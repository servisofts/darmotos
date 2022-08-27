import DPA, { connect } from 'servisofts-page';
import { Parent } from "."

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_banco"],
            params: ["key_cuenta?"]
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
        return true && !this.$params.key_cuenta
    }
    $filter(data) {
        
        return data.estado != 0 && data.key == this.$params.key_cuenta
    }
    $getData() {
        return Parent.model.Action.getAll();
    }
}
export default connect(index);