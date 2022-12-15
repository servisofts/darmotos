import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../../Model';
import DatosDocumentosEditar from './Components/DatosDocumentosEditar';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: []
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $onSubmit(data) {
        Parent.model.Action.editar({
            data: {
                ...this.data,
                ...data
            },
            key_usuario: ""
        }).then((resp) => {
            this.presolve(this.pk)
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
    $submitName() {
        return ""
    }
    $footer() {
        return <DatosDocumentosEditar key_producto={this.pk} onSubmit={() => {
            return new Promise((resolve, reject) => {
                this.presolve = resolve;
                this.form.submit();
                // resolve("KEY_USUARIO");
            })
        }} />
    }
}

export default connect(index);