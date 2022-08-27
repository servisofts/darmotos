import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado"]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $inputs() {
        var inp = super.$inputs();
        inp["key_sucursal"] = {
            ...inp["key_sucursal"],
            editable: false,
            value: this.state?.sucursal?.key,
            onPress: () => {
                SNavigation.navigate("/sucursal", {
                    onSelect: (item) => {
                        this.setState({ sucursal: item })
                    }
                })
            }
        }
        return inp;
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