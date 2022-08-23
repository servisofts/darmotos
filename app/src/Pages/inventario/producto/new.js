import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SInput, SLoad, SNavigation, SPopup, SText } from 'servisofts-component';
import Model from '../../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado"]
        });
    }
    $inputs() {
        var inp = super.$inputs();

        if (this.state?.modelo) {
            var modeloData = Model.modelo_inventario_dato.Action.getAllByKeyModelo(this.state.modelo.key);
            var inventario_dato = Model.inventario_dato.Action.getAll();
            if (!modeloData) return inp;
            if (!inventario_dato) return inp;
            this.extas = {};
            Object.values(modeloData).map(obj => {
                var dato = inventario_dato[obj.key_inventario_dato];
                inp[dato.descripcion] = { type: dato.tipo, label: dato.descripcion, required: true, icon: <SText>{dato.observacion}</SText> }
                
                console.log(dato);
            })
        }
        inp["precio_compra"].type = "money"
        inp["key_modelo"] = {
            ...inp["key_modelo"],
            editable: false,
            value: this.state?.modelo?.key,
            onPress: () => {
                SNavigation.navigate("/inventario/modelo", {
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
    $onSubmit(data) {
        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            SNavigation.goBack();
        }).catch(e => {
            SPopup.alert("error")
        })
    }
}

export default connect(index);