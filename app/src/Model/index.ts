import { SModel } from "servisofts-model";
import usuario from "./usuario";
import roles_permisos from "./roles_permisos";
import empresa from './empresa'
import inventario from "./inventario";
import contabilidad from "./contabilidad";
import darmotos from "./darmotos";
const Model = {
    ...usuario,
    ...roles_permisos,
    ...empresa,
    ...inventario,
    ...contabilidad,
    ...darmotos
}

export default {
    ...Model,
    ...SModel.declare(Model)
}