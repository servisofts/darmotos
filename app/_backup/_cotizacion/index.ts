import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import list from "./list";
import aprobado from "./aprobado";
import denegado from "./denegado";
import cotizacion from "./cotizacion";
import comprado from "./comprado";
import table from "./table";
import _new from "./new";
import profile from "./profile/index";
import edit from "./edit";
import _delete from "./delete";
const model = Model.compra_venta;

export const Parent = {
    name: "cotizacion",
    path: `/compra/cotizacion`,
    model
}
export default SPage.combinePages(Parent.name, {
    "": list,
    "list": list,
    "table": table,
    "new": _new,
    "profile": profile,
    "edit": edit,
    "delete": _delete,
    aprobado,
    denegado,
    cotizacion,
    comprado
})
