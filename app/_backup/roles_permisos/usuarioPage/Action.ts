import { SAction } from "servisofts-model";
import Model from "../..";
export default class Action extends SAction {
    getAll() {
        var usr = Model.usuario.Action.getUsuarioLog();
        return super.getAll({
            key_usuario: usr.key,
        })
    }
    getPages(path = "/") {
        var pages = this.getAll();
        if (!pages) return null;
        var resp = {};
        var keys = Object.keys(pages);
        keys = keys.sort()
        keys.map((key) => {
            if (key.indexOf(path) == 0) {
                var obj = pages[key];
                resp[key] = obj;
            }
        })
        return resp;
    }

    getPermisos(url_page) {
        var pages = this.getAll();
        if (!pages) return null;
        var page = pages[url_page];
        if (!page) return null;
        if (!page.permisos) return null;
        return page.permisos;
    }
    getPermiso({ url, permiso, loading = "cargando" }) {
        var pages = this.getAll();
        if (!pages) return loading;
        var page = pages[url];
        if (!page) return null;
        if (!page.permisos) return null;
        if (!page.permisos[permiso]) return null;
        var obj = page.permisos[permiso];
        return page.permisos[permiso];
    }
    getPage({ url, loading = "cargando" }) {
        var pages = this.getAll();
        if (!pages) return loading;
        var page = pages[url];
        if (!page) return null;
        return page;
    }
}