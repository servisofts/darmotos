import { SDate, SHr, SList, SMath, SNavigation, SText, STheme, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import Model from '../../../../../Model';

const Parent = {
    name: "Compras sin recepcionar.",
    path: `/inventario/almacen/profile/recepcion_compra`,
    model: Model.compra_venta_detalle
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            type: "componentTitle",
            Parent: Parent,
            title: Parent.name,
            excludes: ["key", "fecha_on", "key_usuario", "Password", "Telefono", "Correo", "CI"]
        });
    }

    // $allowNew() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    // }
    // $allowTable() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    // }
    // $allowAccess() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    // }
    $filter(data) {
        return data.estado != "0"
    }
    $getData() {
        if (!this.props.data) return null;
        return Model.compra_venta_detalle.Action.comprasSinRecepcionar({ key_sucursal: this.props.data.key_sucursal });
    }
    $item(data, opt) {
        return <SList
            data={new Array(data.cantidad).fill(0)}
            render={(obj) => {
                return this.my_item(data, opt)
            }}
        />
    }
    my_item(data, opt) {
        const { codigo, descripcion, cantidad, precio_unitario, proveedor, descuento, fecha_on, key } = data;
        return <SView card style={{
            padding: 8
        }} onPress={() => {
            var precio = precio_unitario - (descuento / cantidad)
            SNavigation.navigate("/productos/producto/new", {
                precio_compra: parseFloat(precio).toFixed(2),
                descripcion: descripcion,
                key_compra_venta_detalle: key,
                key_almacen: this.props.data.key,
                onSelect: (data) => {
                    Model.compra_venta_detalle.Action.recepcionar({
                        key_compra_venta_detalle: key,
                        key_producto: data.key
                    }).then((resp) => {
                        console.log(resp);
                    }).catch(e => {
                        console.log(e)
                    })
                    SNavigation.goBack();
                }
            });
        }}>

            <SView row center>
                <SText fontSize={18} bold>{descripcion}</SText>
                <SView flex />
                <SText bold fontSize={18}>x  {1} </SText>
                <SView width={8} />
                <SView width={10} height={10} style={{ borderRadius: 100 }} backgroundColor={STheme.color.danger} />
            </SView>
            <SHr />

            <SView>
                <SText color={STheme.color.lightGray}>Proveedor: {proveedor.razon_social}</SText>
                <SText color={STheme.color.lightGray}>Nit: {proveedor.nit}</SText>
            </SView>
            <SView row center>

                <SView flex />
                <SText color={STheme.color.lightGray} fontSize={12}>{new SDate(fecha_on).toString("dd de MONTH, yyyy, hh:mm")}</SText>
            </SView>
            <SHr />
            {/* <SText>{JSON.stringify(data)}</SText> */}
        </SView>
    }
}
export default connect(index);