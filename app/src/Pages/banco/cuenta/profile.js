import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SHr, SList, SLoad, SNavigation, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import C_cuenta_movimiento_list_by_cuenta from "./movimiento/Components/list_by_cuenta";
import item from './item';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            item: item,
            Parent: Parent,
            excludes: ["key", "key_usuario", "estado", "key_banco", "fecha_on"],
            params: ["pk", "key_banco"]
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
    $allowBack() {
        return true;
    }

    $getData() {
        var data = Parent.model.Action.getByKey(this.pk, null, {});
        if (data) {
            if (!data.key) {
                SNavigation.goBack();
                return null;
            }
        }
        return data;
    }
    $footer() {
        return <SView col={"xs-12"}>
            <SHr />
            <C_cuenta_movimiento_list_by_cuenta key_cuenta={this.pk} />
        </SView>
    }

}
export default connect(index);