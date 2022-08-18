import DPA, { connect } from '../../Components/DPA';
import { Parent } from "."
import { SView } from 'servisofts-component';
import EditarPermisosRol from '../../Components/EditarPermisosRol';

class index extends DPA.profile {
    constructor(props) {
        super(props, { Parent: Parent, excludes: ["key", "key_servicio", "estado"] });
    }

    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        return <SView col={"xs-12"}>
            <EditarPermisosRol key_rol={this.pk} />
        </SView>
    }

}
export default connect(index);