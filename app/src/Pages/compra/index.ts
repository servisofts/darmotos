import { SPage } from "servisofts-component";

import root from "./root";
import producto from "./producto";
import cotizacion from "./cotizacion";
import detalle from "./detalle";
export default SPage.combinePages("compra",
    {
        "": root,
        ...producto,
        ...cotizacion,
        ...detalle
    }
)