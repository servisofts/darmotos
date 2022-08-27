import { SPage } from "servisofts-component";

import root from "./root";
import gestion from "./gestion";
import cuenta_contable from "./cuenta_contable";
import centro_costo from "./centro_costo";
export const Parent = {
    title: "Contabilidad",
    name: "contabilidad",
    path: "/contabilidad"
}
export default SPage.combinePages(Parent.name,
    {
        "": root,
        ...gestion,
        ...cuenta_contable,
        ...centro_costo

    }
)