import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado"]
        });
    }

    getOptionsTipo() {
        return [
            { key: "", content: "--" },
            { key: "text", content: "Texto" },
            { key: "number", content: "Numero" },
            { key: "money", content: "Moneda" },
            { key: "date", content: "Fecha" },
        ]
    }
    $inputs() {
        var inp = super.$inputs();
        // inp["observacion"].type ="textArea"
        inp["tipo"] = { label: "Tipo de dato", required: true, type: "select", defaultValue: "", options: this.getOptionsTipo() }
        return inp;
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $onSubmit(data) {
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