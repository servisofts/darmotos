import { SAction } from "servisofts-model";
import Model from "../..";
export default class Action extends SAction {
    getAll() {
        var usr = Model.usuario.Action.getUsuarioLog();
        return super.getAll({
            key_usuario: usr.key,
        })
    }
    getPages() {
        var pages = this.getAll();
        if (!pages) return null;
        var resp = {};
        Object.keys(pages).map((key) => {
            var obj = pages[key];
            if (!obj.permisos["page"]) return;
            resp[key] = obj;
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
        return page.permisos[permiso];
    }
}