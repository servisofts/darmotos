import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../../Model';

class index extends DPA.table {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_usuario", "estado",]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        return data.estado != 0
    }
    $headers() {
        var h = super.$headers();
        h["fecha_on"].width = 150
        h["descripcion"] = { key: "descripcion", label: "Descripcion", width: 200, }
        h["precio_compra"] = { key: "precio_compra", label: "P. Compra", width: 100, }
        console.log(h);
        return h
    }
    $getData() {
        return Model.producto.Action.getAll();
    }
}
export default connect(index);