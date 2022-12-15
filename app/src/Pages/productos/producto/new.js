import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SInput, SLoad, SNavigation, SPopup, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import DatosDocumentosEditar from './Components/DatosDocumentosEditar';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado"]
        });
        this.onSelect = SNavigation.getParam("onSelect")
    }
    $inputs() {
        var inp = super.$inputs();

        // if (this.state?.modelo) {
        //     if (this.state?.modelo?.key_tipo_producto) {

        //         var modeloData = Model.tipo_producto_inventario_dato.Action.getAllBy({ key_tipo_producto: this.state?.modelo.key_tipo_producto });
        //         var inventario_dato = Model.inventario_dato.Action.getAll();
        //         if (!modeloData) return inp;
        //         if (!inventario_dato) return inp;
        //         this.extas = {};
        //         Object.values(modeloData).map(obj => {
        //             var dato = inventario_dato[obj.key_inventario_dato];
        //             inp[dato.descripcion] = { type: dato.tipo, label: dato.descripcion, required: true, icon: <SText>{dato.observacion}</SText> }
        //         })
        //     }
        // }
        inp["precio_compra"].type = "money"
        inp["key_modelo"] = {
            ...inp["key_modelo"],
            editable: false,
            value: this.state?.modelo?.key,
            render: (ref) => {
                var value = ref.getValue();
                if (!value) {
                    return null;
                }
                return <SView col={"xs-12"} height center style={{ padding: 8 }}>
                    <SText col={"xs-12"}>{this.state.modelo.descripcion}</SText>
                </SView>
            },
            onPress: () => {
                SNavigation.navigate("/productos/modelo", {
                    onSelect: (item) => {
                        this.setState({ modelo: item })
                    }
                })
            }
        }
        return inp;
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $submitName() {
        return "";
    }
    $onSubmit(data) {
        Parent.model.Action.registro({
            data: data,
            key_almacen: this._params.key_almacen,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            this.$submitFile(resp.data.key);

            if (this.presolve) {
                this.presolve(resp.data.key);
                // SNavigation.replace("/cliente/profile", { pk: resp.data.key })
            }
            if (this.onSelect) {
                this.onSelect(resp.data);
                return;
            }
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
    $footer() {
        return <DatosDocumentosEditar key_tipo_producto={this.state?.modelo?.key_tipo_producto} onSubmit={() => {
            return new Promise((resolve, reject) => {
                this.presolve = resolve;
                this.form.submit();
                // resolve("KEY_USUARIO");
            })
        }} />
    }
}

export default connect(index);