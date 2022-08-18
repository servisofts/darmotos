import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import root from "./root";
import datos from "./datos";
import permisos from "./permisos";


export default SPage.combinePages("profile", {
    "": root,
    "datos":datos,
    "permisos":permisos
})
