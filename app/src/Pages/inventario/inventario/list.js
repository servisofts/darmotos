import { SHr, SList, SText, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../../Model';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Inventario",
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_servicio", "key_sucursal"],
        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        return data.estado != 0
    }
    $getData() {
        var sucursales = Model.sucursal.Action.getAll();
        var almacenes = Model.almacen.Action.getAll();
        // var almacen_producto = Model.almacen_producto.Action.getAll();
        var _productos = Model.producto.Action.getAll();
        var modelos = Model.modelo.Action.getAll();
        var tipo_producto = Model.tipo_producto.Action.getAll();

        if (!sucursales) return null;
        if (!almacenes) return null;
        // if (!almacen_producto) return null;
        if (!_productos) return null;
        if (!modelos) return null;
        if (!tipo_producto) return null;

        var productos = {};
        console.log(_productos)

        Object.values(_productos).map((pro) => {
            pro.modelo = modelos[pro.key_modelo];
            productos[pro.key] = pro;
        })

        // console.log(productos)
        var sucursalFinal = {}
        Object.values(sucursales).map((obj) => {
            var almacenes_data = Model.almacen.Action.getAllBy({
                key_sucursal: obj.key
            })

            Object.values(almacenes_data).map((almacen) => {
                almacenes_data[almacen.key].tipo_producto = {}

                var alm_pro = Object.values(productos).filter(o => o.key_almacen == almacen.key);
                // var productos_con_almacen = alm_pro.map((ap) => {
                //     var pro = productos[ap.key_producto];
                //     pro.almacen_producto = ap;

                //     return pro;
                // })

                // console.log(productos_con_almacen)
                Object.values(tipo_producto).map((tp) => {
                    var arr = Object.values(alm_pro).filter(o => o?.modelo?.key_tipo_producto == tp.key)
                    tp.productos = arr
                    almacenes_data[almacen.key].tipo_producto[tp.key] = { ...tp };
                })
                almacenes_data[almacen.key].tipo_producto["sin_tipo"] = {
                    key: "sin_tipo",
                    descripcion: "Sin tipo de producto",
                    productos: Object.values(alm_pro).filter(o => o?.modelo?.key_tipo_producto == null)
                }
                // almacenes_data[almacen.key].tipo_producto["vendido"] = {
                //     key: "vendido",
                //     descripcion: "Vendidos",
                //     productos: Object.values(alm_pro).filter(o => !!o?.key_cliente)
                // }
            })
            obj.almacenes = almacenes_data;
            sucursalFinal[obj.key] = obj;
        })
        return sucursalFinal
    }



    renderTipoProducto(tp) {
        var disponibles = tp.productos.filter(o => !o.key_cliente)
        var vendidas = tp.productos.filter(o => !!o.key_cliente)
        return <SView col={"xs-12"}>
            <SText>( {disponibles.length} )  {tp.descripcion}  {vendidas.length}</SText>
        </SView>
    }
    renderAlmacen(almacen) {
        return <SView>
            <SText>{almacen.descripcion}</SText>
            <SHr />
            <SHr />
            <SList
                data={almacen.tipo_producto}
                render={(o) => this.renderTipoProducto(o)}
            />
        </SView>
    }
    $item(obj) {
        return <SView col={"xs-12"} card style={{
            padding: 8
        }}>
            <SText>{obj.descripcion}</SText>
            <SHr />
            <SList
                data={obj.almacenes}
                render={(o) => this.renderAlmacen(o)}
            />
        </SView>
    }
}
export default connect(index);