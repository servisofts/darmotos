import { SPage } from "servisofts-component";
import Model from "../../../Model";
import list from "./list";
import table from "./table";
import _new from "./new";
import profile from "./profile";
import edit from "./edit";
import _delete from "./delete";
import cuenta_movimiento from "./cuenta_movimiento";
export const Parent = {
    name: "banco_cuenta",
    path: `/banco/banco_cuenta`,
    model: Model.banco_cuenta
}
export default SPage.combinePages(Parent.name, {
    "": list,
    "list": list,
    "table": table,
    "new": _new,
    "profile": profile,
    "edit": edit,
    "delete": _delete,
    ...cuenta_movimiento
})
