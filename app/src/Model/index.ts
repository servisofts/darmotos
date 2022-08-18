import { SModel } from "servisofts-model";
import usuario from "./usuario";
import roles_permisos from "./roles_permisos";
import empresa from './empresa'
import inventario from "./inventario";
import darmotos from "./darmotos";
const Model = {
    ...usuario,
    ...roles_permisos,
    ...empresa,
    ...inventario,
    ...darmotos
}

export default {
    ...Model,
    ...SModel.declare(Model)
}