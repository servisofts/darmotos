import { SPage } from "servisofts-component";
import Model from "../../../../Model/";
import recepcion_compra from "./recepcion_compra";
import productos from "./productos";
import root from "./root";


export default SPage.combinePages("profile", {
    "": root,
    "recepcion_compra": recepcion_compra,
    "productos": productos
})
