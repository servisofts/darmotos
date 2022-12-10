import { SHr, SText, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { MenuPages } from 'servisofts-rn-roles_permisos';
import { Parent } from "."
import Model from '../../../Model';
import DatosDocumentos from './Components/DatosDocumentos';
import item from './item';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            itemType: "1",
            excludes: ["key", "key_usuario", "key_servicio",],
            item: item

        });
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        return <SView col={"xs-12"}>
            <SHr />
            <SHr />
            <SText>Datos:</SText>
            <SHr />
            <DatosDocumentos key_producto={this.pk} />
        </SView>

    }
    // $footer() {
    //     return <SView col={"xs-12"} center>
    //         <MenuPages path={"/productos/producto/profile"} >

    //         </MenuPages>

    //     </SView>
    // }
}
export default connect(index);