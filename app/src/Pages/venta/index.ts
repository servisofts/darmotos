import { SPage } from "servisofts-component";

import root from "./root";
import Model from "../../Model";

import detalle from "./detalle";

import _delete from "./delete";
import _new from "./new";
import cotizacion from "./cotizacion";
import aprobado from "./aprobado";
import vendido from "./vendido";
import denegado from "./denegado";
import pendientes from "./pendientes";
import profile from "./profile";
import edit from "./edit";
const model = Model.compra_venta;

export const Parent = {
    name: "cotizacion",
    path: `/venta`,
    model
}
export default SPage.combinePages("venta",
    {
        "": root,
        "new": _new,
        "delete": _delete,
        "edit": edit,
        "cotizacion": cotizacion,
        "aprobado": aprobado,
        "vendido": vendido,
        "pendientes": pendientes,
        "denegado": denegado,
        "profile": profile,
        ...detalle,
    }
)