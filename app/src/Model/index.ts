import { SModel } from "servisofts-model";
import usuario from "./usuario";
import empresa from "./empresa";

const Model = {
    usuario,
    empresa
}

export default {
    ...Model,
    ...SModel.declare(Model)
}