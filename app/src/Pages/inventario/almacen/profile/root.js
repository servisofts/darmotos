import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../../Model';
import { MenuPages } from 'servisofts-rn-roles_permisos';
import Item from "../item"
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_servicio", "key_sucursal"],
            item: Item
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
        return <SView col={"xs-12"} >
            <SHr />
            <SText fontSize={16} bold>Menu</SText>
            <SHr />

            <MenuPages path={"/inventario/almacen/profile/"} permiso={"ver"} params={{
                pk: this.pk
            }}>
                {/* <MenuButtom label={"Permisos"} url={Parent.path + "/profile/permisos"} params={{ pk: this.pk }} icon={<SIcon name={"Ajustes"} />} /> */}
                {/* <MenuButtom label={"Datos"} url={Parent.path + "/profile/datos"} params={{ pk: this.pk }} icon={<SIcon name={"Ajustes"} />} /> */}
                {/* <MenuButtom label={"Datos"} url={Parent.path + "/profile/datos"} params={{ pk: this.pk }} icon={<SIcon name={"Ajustes"} />} /> */}
            </MenuPages>
        </SView>
    }
}
export default connect(index);