import DPA, { connect } from '../../../Components/DPA';
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
        var marca = Model.marca.Action.getByKey(data.key_marca);
        if (!marca) return null;
        data.marca = marca;
        return data;
    }
    $renderContent() {
        return <SView col={"xs-12"}>
            {super.$renderContent()}
            {this.buildLabel({ label: "Marca", value: this.data.marca.descripcion })}
        </SView>
    }
}
export default connect(index);