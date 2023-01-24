import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup, SThread } from 'servisofts-component';
import Model from '../../Model';

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
    $inputs() {
        var inp = super.$inputs();
        inp["observacion"].type = "textArea";
        return inp;
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