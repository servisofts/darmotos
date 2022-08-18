import { SPage } from "servisofts-component";

import login from "./login";
import profile from "./profile";

export default SPage.combinePages("user",
    {
        "login": login,
        "profile": profile
    }
)