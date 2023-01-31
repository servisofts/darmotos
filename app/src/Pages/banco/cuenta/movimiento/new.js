import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation } from 'servisofts-component';
import Model from '../../../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_cuenta"],
            params: ["key_cuenta"]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $inputs() {
        var imp = super.$inputs();
        imp["monto"].type = "money"
        imp["descripcion"].type = "textArea"
        imp["type"] = { label: "Tipo", required: true, type: "select", defaultValue: "", options: Model.cuenta_movimiento.Action.getTypes() }
        return imp;
    }
    $onSubmit(data) {
        data.key_cuenta = this.$params.key_cuenta
        if (data.type == "egreso") {
            data.monto = data.monto * -1;
        }
        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey(),
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);