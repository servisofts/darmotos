import { SDate, SHr, SIcon, SList, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import Model from '../../../../../Model';

const Parent = {
    name: "Ventas sin entregar.",
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
        return Model.compra_venta_detalle.Action.ventasSinEntregar({ key_sucursal: this.props.data.key_sucursal });
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
        const { codigo, descripcion, cantidad, precio_unitario, proveedor, cliente, descuento, fecha_on, key, key_producto, key_compra_venta_detalle_producto } = data;
        return <SView card style={{
            padding: 8
        }} onPress={() => {
            SPopup.confirm({
                title: "Entregar al cliente",
                message: "Seguro que decea entregar",
                onPress: () => {
                    Model.producto.Action.editar({
                        key_usuario: Model.usuario.Action.getKey(),
                        data: {
                            key: key_producto,
                            key_cliente: cliente.key_usuario,
                        }
                    }).then(r => {
                        Model.compra_venta_detalle.Action.entregar({
                            key_compra_venta_detalle_producto: key_compra_venta_detalle_producto,
                        }).then((resp) => {
                            console.log(resp);
                        }).catch(e => {
                            console.log(e)
                        })
                    }).catch(e => {

                    })

                }
            })
            // SNavigation.navigate("/productos/producto/profile", { pk: key_producto })
            // var precio = precio_unitario - (descuento / cantidad)
            // SNavigation.navigate("/productos/producto/new", {
            //     precio_compra: parseFloat(precio).toFixed(2),
            //     descripcion: descripcion,
            //     key_compra_venta_detalle: key,
            //     key_almacen: this.props.data.key,
            //     onSelect: (data) => {
            //         Model.compra_venta_detalle.Action.recepcionar({
            //             key_compra_venta_detalle: key,
            //             key_producto: data.key
            //         }).then((resp) => {
            //             console.log(resp);
            //         }).catch(e => {
            //             console.log(e)
            //         })
            //         SNavigation.goBack();
            //     }
            // });
        }}>

            <SView row center card onPress={() => {
                SNavigation.navigate("/productos/producto/profile", { pk: key_producto })
            }}>
                <SText fontSize={18} bold>{descripcion}</SText>
                <SView flex />
                <SText bold fontSize={18}>x  {1} </SText>
                <SView width={8} />
                <SView width={10} height={10} style={{ borderRadius: 100 }} backgroundColor={STheme.color.danger} />
            </SView>
            <SHr />

            <SView>
                <SText color={STheme.color.lightGray}>Cliente: {cliente?.razon_social}</SText>
                <SText color={STheme.color.lightGray}>Nit: {cliente?.nit}</SText>
                <SText color={STheme.color.lightGray}>Telefono: {cliente?.telefono}</SText>
                <SText color={STheme.color.lightGray}>Correo: {cliente?.correo}</SText>
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