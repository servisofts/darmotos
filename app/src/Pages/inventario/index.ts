import { SPage } from "servisofts-component";

import root from "./root";

import almacen from "./almacen";
import inventario from "./inventario";
export default SPage.combinePages("inventario",
    {
        "": root,
        ...almacen,
        ...inventario

    }
)