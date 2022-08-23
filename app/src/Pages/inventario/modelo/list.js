import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../../Model';
import { SNavigation } from 'servisofts-component';
import item from './item';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_servicio", "key_marca"],
            item:item
        });
    }

    $allowNew(){
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowTable(){
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        return data.estado != 0
    }

    $getData() {
        return Parent.model.Action.getAll();
    }
}
export default connect(index);