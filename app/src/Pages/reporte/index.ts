import { SPage } from "servisofts-component";

import root from "./root";
import balance from "./balance";
import cajas_activas from "./cajas_activas";
import cajas_historico from "./cajas_historico";
export default SPage.combinePages("reporte",
    {
        "": root,
        "balance": balance,
        "cajas_activas":cajas_activas,
        "cajas_historico":cajas_historico,

    }
)