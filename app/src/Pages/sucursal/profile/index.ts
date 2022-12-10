import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import root from "./root";
import almacen from "./almacen";


export default SPage.combinePages("profile", {
    "": root,
    "almacen": almacen,
})
