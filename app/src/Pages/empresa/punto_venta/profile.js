import { SNavigation, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../../Model';
import ListaMonedaDetalle from './Components/listaMonedaDetalle';
import PuntoVentaTipoPago from './Components/PuntoVentaTipoPago';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            params: ["key_sucursal"],
            title: "Detalle del Punto de venta.",
            excludes: ["key", "key_usuario", "key_servicio", "estado", "lat", "lng", "key_sucursal"]
        });
        // this.key_empresa = SNavigation.getParam("key_empresa");
    }
    $allowEdit() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    onEdit() {
        SNavigation.navigate(Parent.path + "/edit", { pk: this.pk, key_sucursal: this.$params.key_sucursal })
    }
    $allowDelete() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk, { key_sucursal: this.$params.key_sucursal });
    }
    $footer() {
        return <SView col={"xs-12"} >
            <PuntoVentaTipoPago key_punto_venta={this.pk} />
            {/* <ListaMonedaDetalle key_empresa_moneda={this.pk} /> */}
        </SView>
    }

}
export default connect(index);