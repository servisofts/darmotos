import { SAction } from "servisofts-model";
import Model from "../..";
export default class Action extends SAction {

    getAllByKeyUsuario(key_usuario) {
        var usuarioRol = Model.usuarioRol.Action.getAllByKeyUsuario(key_usuario);
        var datos = Model.dato.Action.getAll();
        if (!usuarioRol) return null;
        if (!datos) return null;
        var resp = {};
        Object.values(usuarioRol).map((obj: any) => {
            if (obj.estado == 0) return;
            var dato_rol = Model.rol_dato.Action.getAllBy({
                key_rol: obj.key_rol
            });
            if (!dato_rol) return null;
            Object.values(dato_rol).map((dr: any) => {
                var dato = datos[dr.key_dato]
                resp[dato.key] = dato;

            })
        });
        return resp;
    }
}