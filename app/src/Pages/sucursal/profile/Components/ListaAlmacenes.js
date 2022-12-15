import DPA, { connect } from 'servisofts-page';
import Model from '../../../../Model';

const Parent = {
    name: "Almacenes de la sucursal",
    path: `/inventario/almacen`,
    model: Model.almacen
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            type: "componentTitle",
            Parent: Parent,
            title: Parent.name,
            excludes: ["key", "fecha_on", "key_usuario", "Password", "Telefono", "Correo", "CI"]
        });
    }

    // $allowNew() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    // }
    // $allowTable() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    // }
    // $allowAccess() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    // }
    $filter(data) {
        return data.estado != "0"
    }
    $getData() {
        return Model.almacen.Action.getAllBy({ key_sucursal: this.props.key_sucursal });
    }
}
export default connect(index);