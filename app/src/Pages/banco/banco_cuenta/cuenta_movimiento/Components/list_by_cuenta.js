import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import Model from '../../../../../Model';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            type: "componentTitle",
            title: "Movimientos",
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_banco"],
            params: ["key_cuenta"]
            // item: Item,

        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }

    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    }
    $filter(data) {
        return data.estado != 0 && data.key_cuenta == this.$params.key_cuenta
    }
    onNew() {
        super.onNew({ key_cuenta: this.$params.key_cuenta })
    }
    $getData() {
        return Parent.model.Action.getAll();
    }
}
export default connect(index);