import DPA, { connect } from '../../Components/DPA';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado"]
        });
    }

    $onSubmit(data) {
        Parent.model.Action.registro({
            data: data,
            key_usuario: ""
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            SNavigation.goBack();
        }).catch(e => {
            SPopup.alert("error")
        })
    }
}

export default connect(index);