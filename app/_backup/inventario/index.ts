import { SPage } from "servisofts-component";
import Model from "../../src/Model";
import table from "./table";
import list from "./list";
const model = Model.inventario;

export const Parent = {
    name: "inventario",
    path: `/inventario/inventario`,
    model
}
export default SPage.combinePages(Parent.name, {
    "": list,
    "table": table,
    "list": list,
})
