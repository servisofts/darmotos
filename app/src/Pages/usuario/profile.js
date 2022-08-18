import DPA, { connect } from '../../Components/DPA';
import { Parent } from "."
import { SHr, SInput, SList, SText, SView } from 'servisofts-component';
import Model from '../../Model';
import EditarUsuarioRol from '../../Components/EditarUsuarioRol';

class index extends DPA.profile {
    constructor(props) {
        super(props, { Parent: Parent, excludes: ["key", "Password"] });
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
            <EditarUsuarioRol key_usuario={this.pk} />
        </SView>

    }
}
export default connect(index);