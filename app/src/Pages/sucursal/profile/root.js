import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SList, SLoad, SMath, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
import { MenuPages } from 'servisofts-rn-roles_permisos';
import SCharts from 'servisofts-charts';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_usuario", "estado", "lat", "lng", "key_empresa"],
            // item: item
        });
    }
    componentDidMount() {
        Model.compra_venta.Action.getStates(this.pk).then(e => {
            this.setState({ data: e.data });
        }).catch(e => {
            console.error(e);
        })
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


    getChart() {
        if (!this.state.data) return <SLoad />

        return <SView col={"xs-12"} height={200}>
            <SCharts
                type='barras_verticales'
                config={{ grosor: 75, separacion: 10, }}
                data={[
                    { key: "a", val: this.state.data["comprado"]?.sum ?? 0, label: "Compras", color: "#006600", info:"Bs."+ SMath.formatMoney(this.state.data["comprado"]?.sum ?? 0) },
                    { key: "b", val: this.state.data["vendido"]?.sum ?? 0, label: "Ventas", color: "#6666FF", info: "Bs."+SMath.formatMoney(this.state.data["vendido"]?.sum ?? 0) },
                    { key: "c", val: this.state.data["cobrado"]?.sum ?? 0, label: "Cobrado", color: "#FF6666", info: "Bs."+SMath.formatMoney(this.state.data["cobrado"]?.sum ?? 0) },
                    // { key: "d", val: this.state.data["cotizacion"]?.sum ?? 0, label: "Cotizacion", color: "#FF66FF", info: SMath.formatMoney(this.state.data["cotizacion"]?.sum ?? 0) },
                ]}
                fill={STheme.color.card} />
        </SView>
    }
    $footer() {
        return <SView col={"xs-12"} >

            {this.getChart()}

            <SText fontSize={16} bold>Menu</SText>
            <SHr />
            <MenuPages path={"/sucursal/profile/"} permiso={"ver"} params={{
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