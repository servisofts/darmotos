import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SHr, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.item {
    constructor(props) {
        super(props, {
            Parent: Parent,
            // row:false
        });
    }
    $getData() {
        var data = super.$getData();
        var sucursal = Model.sucursal.Action.getByKey(data.key_sucursal);
        if (!sucursal) return null;
        data.sucursal = sucursal;
        return data;
    }
    $renderContent() {
        return <SView col={"xs-12"}>
            {super.$renderContent()}
            {this.buildLabel({ label: "Sucursal", value: this.data.sucursal.descripcion })}
        </SView>
    }
}
export default connect(index);