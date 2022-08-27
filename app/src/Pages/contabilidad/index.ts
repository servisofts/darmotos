import { SPage } from "servisofts-component";

import root from "./root";
import gestion from "./gestion";
import cuenta_contable from "./cuenta_contable";
import centro_costo from "./centro_costo";
import plan_unico_cuenta from "./plan_unico_cuenta";
import centro_costo_detalle from "./centro_costo_detalle";
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
        ...centro_costo,
        ...plan_unico_cuenta,
        ...centro_costo_detalle

    }
)