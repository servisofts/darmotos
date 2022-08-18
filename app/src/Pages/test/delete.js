import DPA, { connect } from '../../Components/DPA';
import { Parent } from "."
import { SNavigation, SPopup } from 'servisofts-component';

class index extends DPA.delete {
    constructor(props) {
        super(props, { Parent: Parent, });
    }

    $onDelete() {
        this.data.estado = 0;
        Parent.model.Action.editar({
            data: this.data,
            key_usuario: ""
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            SPopup.alert("error")
        })
    }

    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
}
export default connect(index);