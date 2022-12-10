import { SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../../Model';
import Editar_tipo_producto_inventario_dato from './Components/Editar_tipo_producto_inventario_dato';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Detalle del tipo de producto.",
            excludes: ["key", "key_usuario", "key_servicio", "estado"]

        });
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        return <SView col={"xs-12"}>
            <Editar_tipo_producto_inventario_dato key_tipo_producto={this.pk} />
        </SView>

    }
}
export default connect(index);