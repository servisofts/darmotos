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
        var almacen_producto = Model.almacen_producto.Action.getAll();
        var _productos = Model.producto.Action.getAll();
        var modelos = Model.modelo.Action.getAll();
        var tipo_producto = Model.tipo_producto.Action.getAll();

        if (!sucursales) return null;
        if (!almacenes) return null;
        if (!almacen_producto) return null;
        if (!_productos) return null;
        if (!modelos) return null;
        if (!tipo_producto) return null;

        var productos = {};
        Object.values(_productos).map((pro) => {
            pro.modelo = modelos[pro.key_modelo];
            productos[pro.key] = pro;
        })

        var sucursalFinal = {}
        Object.values(sucursales).map((obj) => {
            var almacenes_data = Model.almacen.Action.getAllBy({
                key_sucursal: obj.key
            })

            Object.values(almacenes_data).map((almacen) => {
                almacenes_data[almacen.key].tipo_producto = {}


                Object.values(tipo_producto).map((tp) => {
                    var arr = Object.values(productos).filter(o => o?.modelo?.key_tipo_producto == tp.key)
                    almacenes_data[almacen.key].tipo_producto[tp.key] = arr;
                })

            })
            obj.almacenes = almacenes_data;
            sucursalFinal[obj.key] = obj;
        })
        return sucursalFinal
    }



    renderTipoProducto(producto) {
        return <SView col={"xs-12"}>
            <SText>{producto.descripcion}</SText>
        </SView>
    }
    renderAlmacen(almacen) {
        return <SView>
            <SText>{almacen.descripcion}</SText>
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