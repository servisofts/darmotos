import { STheme } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";
export default class Action extends SAction {
    // getAll() {
    //     var empresa: any = Model.empresa.Action.getSelect();
    //     if (!empresa) return null;
    //     return super.getAll({
    //         key_empresa: empresa.key,
    //         key_usuario: Model.usuario.Action.getKey()
    //     })
    // }

    getAllByKeyAlmacen(key_almacen) {
        let data = this.getAll();
        return Object.values(data).filter((obj: any) => obj.key_almacen == key_almacen);
    }
    getAllRecursive() {
        let modelos = Model.modelo.Action.getAllRecursive();
        let data = this.getAll();
        let ventas_sin_entregar = Model.compra_venta_detalle.Action.ventasSinEntregar({});
        let producto_inventario_dato = Model.producto_inventario_dato.Action.getAll();
        if (!modelos || !data || !ventas_sin_entregar || !producto_inventario_dato) return null;
        const arr_vse = Object.values(ventas_sin_entregar);
        const arr_pid = Object.values(producto_inventario_dato);
        Object.values(data).map((obj: any) => {
            obj.modelo = modelos[obj.key_modelo];
            obj.venta_sin_entregar = arr_vse.filter((o: any) => o.key_producto == obj.key)
            obj.datos = arr_pid.filter((o: any) => o.key_producto == obj.key)
            obj.state = this.getState(obj);
        })
        return data;
    }

    getState(obj) {
        if (obj.key_cliente) {
            return { key: "entregado", label: "Entregado", color: STheme.color.danger };
        }
        if (obj.venta_sin_entregar) {
            if (obj.venta_sin_entregar.length > 0) {
                return { key: "pendiente_entrega", label: "Pendiente de entrega", color: STheme.color.warning };
            }
        }
        return { key: "disponible", label: "Disponible", color: STheme.color.success };
    }

    registroExcel({ data }) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "registroExcel",
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        })
    }
    getQR({ key }) {
        
        var content = `https://darmotos.servisofts.com/productos/producto/profile?pk=${key}`;
        return SSocket.sendPromise({
            "service": "sqr",
            "component": "qr",
            "type": "registro",
            "estado": "cargando",
            "data": {
                "image": "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",
                "colorBackground": "#ffffff",
                "framework": "Rounded",
                "colorImageBackground": "#ffffff",
                "header": "Leaf",
                "colorHeader": "#B96122",
                "body": "Default",
                "content": content,
                "colorBody": "#B96122"
            }
        })
    }
}   