import { SPage } from "servisofts-component";
import Model from "../../../../Model/";
import recepcion_compra from "./recepcion_compra";
import pendiente_entrega from "./pendiente_entrega";
import productos from "./productos";
import root from "./root";


export default SPage.combinePages("profile", {
    "": root,
    "pendiente_entrega": pendiente_entrega,
    "recepcion_compra": recepcion_compra,
    "productos": productos
})
