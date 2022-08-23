import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado", "key_empresa"]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }

    $onSubmit(data) {
        data.key_empresa = Model.empresa.Action.getSelect()?.key; //TODO
        // data.key_empresa = "74ac7008-5a7f-49da-9b0c-9a9961e4327e";
        if (!data.key_empresa) {
            SPopup.alert("no hay empresa");
            return;
        }
        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            SNavigation.goBack();
        }).catch(e => {
            SPopup.alert("error")
        })
    }
}

export default connect(index);