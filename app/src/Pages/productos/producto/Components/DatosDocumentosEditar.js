import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SOrdenador, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../Model';
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };


    }

    async onSubmit(data, ref, key_producto) {
        var arr = Object.keys(data);
        for (let i = 0; i < arr.length; i++) {
            const key_dato = arr[i];
            console.log(arr[i])
            var dto = Object.values(this.producto_inventario_dato).find(o => o.key_inventario_dato == key_dato);
            var dato_str = data[key_dato];
            if (!dato_str) {
                if (dto) {
                    if (dto.descripcion == dato_str) continue;
                } else {
                    continue;
                }
            }
            if (typeof dato_str != "string") {
                dato_str = JSON.stringify(dato_str);
            }
            if (!dto) {
                var resp = await Model.producto_inventario_dato.Action.registro({
                    data: {
                        key_producto: key_producto ?? this.props.key_producto,
                        descripcion: dato_str,
                        key_inventario_dato: key_dato
                    },
                    key_usuario: Model.usuario.Action.getKey()
                })

            } else {
                if (dto?.descripcion != dato_str) {
                    var resp = await Model.producto_inventario_dato.Action.editar({
                        data: {
                            ...dto,
                            descripcion: dato_str,
                        },
                        key_usuario: Model.usuario.Action.getKey()
                    })

                }

            }

        }
    }
    
    getDatos() {
        var datos;
        if (this.props?.key_producto) {
            datos = Model.inventario_dato.Action.getAllByKeyProducto(this.props.key_producto);
            this.producto_inventario_dato = Model.producto_inventario_dato.Action.getAllBy({
                key_producto: this.props.key_producto
            })
            if (!this.producto_inventario_dato) return null;

        } else if (this.props.key_tipo_producto) {
            this.producto_inventario_dato = {};
            datos = Model.inventario_dato.Action.getAllByKeyTipoProducto(this.props?.key_tipo_producto)
        }
        if (!datos) return null;
        var inputs = {};
        // console.log( new SOrdenador([{ key: "tipo", order: "desc", peso: 1 }]).ordernarObject(datos))
        new SOrdenador([{ key: "tipo", order: "desc", peso: 1 }]).ordernarObject(datos).map((key) => {
            var obj = datos[key];
            var dto = Object.values(this.producto_inventario_dato).find(o => o.key_inventario_dato == obj.key);
            var defaultValue = dto?.descripcion;
            var filePath = SSocket.api.root + "producto_inventario_dato/" + this.props.key_producto;
            inputs[obj.key] = { label: obj.descripcion, icon: <SText>{obj.observacion}</SText>, type: obj.tipo, required: true, defaultValue: defaultValue, filePath: filePath }
        })
        return <SForm inputs={inputs} onSubmitName={"Confirmar"} onSubmit={(data, ref) => {
            // console.log("subir")
            // console.log(data);
            // var files = ref.getFiles()
            // console.log(files);
            if (this.props.onSubmit) {
                this.props.onSubmit().then(key_producto => {
                    this.onSubmit(data, ref, key_producto);
                    ref.uploadFiles2(
                        SSocket.api.root + "upload/producto_inventario_dato/" + key_producto,
                    );
                })
                return;
            }

        }} />
    }
    render() {
        return (
            <SView col={"xs-12"}>
                {/* <SHr /> */}
                {/* <SHr /> */}
                {/* <SText fontSize={14} color={STheme.color.gray}>Recuerde precionar el boton "Confirmar" para guardar los cambios.</SText> */}
                {/* <SHr /> */}
                {this.getDatos()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);