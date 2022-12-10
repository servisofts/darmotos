import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import Model from '../../../../Model';
import { SDate, SHr, SImage, SList, SLoad, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import States from './Components/States';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "key_usuario", "key_servicio"]
        });
        this.state = {
            curState: "",
            totales: {
                subtotal: 0,
                descuento: 0,
                total: 0,
                gifcard: 0,
                total_a_pagar: 0,
                credito_fiscal: 0,
            }
            // proveedor: {}
        }
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
        this.empresa = Model.empresa.Action.getSelect();
        var data = Parent.model.Action.getByKey(this.pk);
        this.compra_venta_detalle = Model.compra_venta_detalle.Action.getAllBy({
            key_compra_venta: this.pk
        })

        var t = Model.compra_venta_detalle.Action.getTotales({
            key_compra_venta: this.pk
        })
        if (!this.empresa) return null;
        if (!this.compra_venta_detalle) return null;
        if (!t) return null;
        if (!data) return null;
        // this.calcularTotal();
        if (this.state.totales.total_a_pagar != t.total_a_pagar) {
            this.state.totales = t;
            this.setState({ ...this.state })
        }

        if (!this.state.curState) {
            this.state.curState = data.state;
        } else {
            if (this.state.curState != data.state) {
                this.state.curState = data.state;
                // SPopup.alert("El estado cambio");
            }
        }
        return data
    }

    $render() {
        this.data = this.$getData()
        if (!this.data) return <SLoad />
        var ITEM = States[this.data.state];
        if (!ITEM) {
            ITEM = States["default"];
        }
        return <ITEM data={this.data} />
    }

}
export default connect(index);