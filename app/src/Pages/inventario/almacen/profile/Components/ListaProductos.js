import { SDate, SHr, SImage, SList, SMath, SNavigation, SText, STheme, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import Model from '../../../../../Model';
import SSocket from 'servisofts-socket'
const Parent = {
    name: "Productos en el almacen.",
    path: `/inventario/almacen/profile/productos`,
    model: Model.almacen_producto
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            type: "componentTitle",
            Parent: Parent,
            title: Parent.name,
            // item:item,
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
        // var data = Model.almacen_producto.Action.getAllByKeyAlmacen(this.props.data.key);
        this.modelos = Model.modelo.Action.getAll();
        this.marcas = Model.marca.Action.getAll();
        this.productos = Model.producto.Action.getAllBy({
            key_almacen: this.props.data.key
        });
        this.tipo_productos = Model.tipo_producto.Action.getAll();
        if (!this.productos) return null;
        if (!this.modelos) return null;
        if (!this.marcas) return null;
        if (!this.tipo_productos) return null;
        // if (!data) return null;

        Object.values(this.productos).map((obj) => {
            // obj.producto = this.productos[obj.key_producto]
            obj.modelo = this.modelos[obj.producto?.key_modelo]
            obj.marca = this.marcas[obj.modelo?.key_marca]
            obj.tipo_producto = this.tipo_productos[obj.modelo?.key_tipo_producto]
        })
        return this.productos;
    }
    $item(data, opt) {
        const { key, descripcion, modelo, marca, tipo_producto } = data;

        return <SView card col={"xs-12"} style={{
            padding: 8
        }} onPress={() => {
            SNavigation.navigate("/productos/producto/profile", { pk: key })
        }} row>
            <SView col={"xs-12"} center row>
                <SView width={60} height={60} style={{ padding: 4 }}>
                    <SView flex height card>
                        <SImage src={Model.producto._get_image_download_path(SSocket.api, key)} />
                    </SView>
                </SView>
                <SView flex >
                    <SText fontSize={18}>{descripcion}</SText>
                    {/* {this} */}
                </SView>
            </SView>
            <SHr />
        </SView>
    }
}
export default connect(index);