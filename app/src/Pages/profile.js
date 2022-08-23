import DPA, { connect } from 'servisofts-page';
import { SButtom, SHr, SInput, SList, SText, SView } from 'servisofts-component';
import Model from '../Model';
import EditarUsuarioRol from './usuario/Components/EditarUsuarioRol';
const Parent = {
    name: "usuario",
    path: `/usuario`,
    model: Model.usuario,
}

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "Password"],
            defaultParams: {
                "pk": Model.usuario.Action.getKey()
            },
        });
    }

    $allowEdit() {
        return true;
    }
    // $allowDelete() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    // }
    // $allowAccess() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    // }
    $getData() {
        return Parent.model.Action.getByKey(this.$params["pk"]);
    }
    $footer() {
        return <SView col={"xs-12"} center>
            <SHr />
            <SButtom type={'danger'} variant={"confirm"} onPress={() => {
                Model.usuario.Action.unlogin();
            }}>SALIR</SButtom>
            <SHr />
            <EditarUsuarioRol key_usuario={this.$params["pk"]} disabled />

        </SView>

    }
}
export default connect(index);