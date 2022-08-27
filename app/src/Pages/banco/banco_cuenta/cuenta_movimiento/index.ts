import { SPage } from "servisofts-component";
import Model from "../../../../Model";
import list from "./list";
import table from "./table";
import _new from "./new";
import profile from "./profile";
import edit from "./edit";
import _delete from "./delete";

export const Parent = {
    name: "cuenta_movimiento",
    path: `/banco/banco_cuenta/cuenta_movimiento`,
    model: Model.cuenta_movimiento
}
export default SPage.combinePages(Parent.name, {
    "": list,
    "list": list,
    "table": table,
    "new": _new,
    "profile": profile,
    "edit": edit,
    "delete": _delete
})
