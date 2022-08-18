import DPA, { connect } from '../../Components/DPA';
import { Parent } from "."
import { SHr, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.profile {
    constructor(props) {
        super(props, { Parent: Parent, excludes: ["key", "key_usuario", "key_servicio", "estado"] });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $footer() {
        if (!this.data) return null;
        var sucs = Model.sucursal.Action.getAll(this.data.key);
        if (!sucs) return <SLoad />
        return <SView col={"xs-12"}>
            <SHr height={30} />
            <SText>Sucursales:</SText>
            <SHr />
            <SList data={sucs} render={(obj) => {
                return <SView col={"xs-12"} card style={{
                    padding: 8
                }}>
                    <SText>{obj.descripcion}</SText>
                </SView>
            }} />
        </SView>
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
}
export default connect(index);