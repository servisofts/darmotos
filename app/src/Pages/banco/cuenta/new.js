import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_banco"],
            params: ["key_banco"]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $onSubmit(data) {
        data.key_banco = this.$params.key_banco
        Parent.model.Action.registro({
            data: data,
            key_usuario: "",
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            SPopup.alert("error")
        })
    }
}

export default connect(index);