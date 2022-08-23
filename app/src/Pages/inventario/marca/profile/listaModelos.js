import DPA, { connect } from 'servisofts-page';
import Model from '../../../../Model';

const Parent = {
    name: "modelo",
    path: "/inventario/modelo",
    model: Model.modelo
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            page: false,
            Parent: Parent,
            title: "Modelos",
            type: "componentTitle",
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_marca",],
            // item: Item,

        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    }
    $filter(data) {
        return data.estado != 0
    }
    onNew() {
        super.onNew({ key_marca: this.props.key_marca })
    }

    $getData() {
        return Parent.model.Action.getAllBy({ key_marca: this.props.key_marca });
    }
}
export default connect(index);