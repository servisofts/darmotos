import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup, SThread } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_compra_venta", "observacion", "unidad_medida", "fecha_on", "key_usuario", "key_servicio", "estado", "cliente", "proveedor", "tipo", "state", "key_sucursal"]

        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $inputs() {
        var imp = super.$inputs();

        // imp["observacion"].col = "xs-6 md-3.6"
        imp["descripcion"].col = "xs-12 md-12"
        imp["descripcion"].type = "textArea"
        imp["cantidad"].defaultValue = "1"
        imp["cantidad"].col = "xs-3.6"
        imp["cantidad"].type = "number"
        imp["precio_unitario"].col = "xs-8"
        imp["precio_unitario"].type = "money"
        // imp["unidad_medida"].col = "xs-5.8"
        imp["descuento"].col = "xs-12"
        imp["descuento"].type = "money"
        return imp;
    }
    $onSubmit(data) {
        new SThread(1000, "esperarFoto", false).start(() => {
            Parent.model.Action.editar({
                data: {
                    ...this.data,
                    ...data
                },
                key_usuario: ""
            }).then((resp) => {
                SNavigation.goBack();
            }).catch(e => {
                console.error(e);

            })
        })

    }
}

export default connect(index);