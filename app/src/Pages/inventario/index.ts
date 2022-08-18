import { SPage } from "servisofts-component";

import root from "./root";
import marca from "./marca";
import modelo from "./modelo";
import almacen from "./almacen";
import producto from "./producto";
import inventario_dato from "./inventario_dato";
export default SPage.combinePages("inventario",
    {
        "": root,
        ...marca,
        ...modelo,
        ...almacen,
        ...producto,
        ...inventario_dato

    }
)