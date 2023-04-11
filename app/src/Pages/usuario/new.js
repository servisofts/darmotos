import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            params: ["key_rol?", "onSelect?"],
            excludes: ["key", "fecha_on", "key_usuario", "estado"]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $inputs() {
        var inputs = super.$inputs();
        inputs["Password"].type = "password"
        inputs["Correo"].type = "email"
        inputs["Telefono"].type = "phone"
        inputs["rep_pass"] = { label: "Rep. Password", type: "password", required: true }
        return inputs;
    }
    $onSubmit(data) {
        if (data["Password"] != data["rep_pass"]) {
            SPopup.alert("Las contraceñas no coinciden.")
            return;
        }
        Parent.model.Action.registro({
            data: data,
            key_rol: this._params.key_rol,
            key_usuario: ""
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            if (this._params.onSelect) {
                this._params.onSelect(resp.data);
                SNavigation.goBack();
                return;
            }

            SNavigation.replace("/usuario/profile", { pk: resp.data.key });
        }).catch(e => {
            SPopup.alert("Ya existe un usuario con el dato, " + e.error_dato)
            console.error(e);

        })
    }


}

export default connect(index);