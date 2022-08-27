import { SModel } from "servisofts-model";
import Contabilidad from "servisofts-rn-contabilidad";
import Usuario from "servisofts-rn-usuario";
import Roles_permisos from "servisofts-rn-roles_permisos";
import empresa from './empresa'
import inventario from "./inventario";
import darmotos from "./darmotos";


const Model = {
    ...Usuario.Model,
    ...Roles_permisos.Model,
    ...empresa,
    ...inventario,
    ...Contabilidad.Model,
    ...darmotos
}

Usuario.init({
    cabecera: "usuario_app",
    Columns: {
        "key": { type: "text", pk: true },
        "Nombres": { type: "text", notNull: true, editable: true },
        "Apellidos": { type: "text", notNull: true, editable: true },
        "CI": { type: "text", notNull: true, editable: true },
        "Correo": { type: "text", notNull: true, editable: true },
        "Telefono": { type: "text", notNull: true, editable: true },
        "Password": { type: "text", notNull: true, editable: true },
    },
});
Roles_permisos.init({});

export default {
    ...Model,
    ...SModel.declare(Model)
}