import React from 'react'
import { SDate, SImage, SLoad, SNavigation, SPage, SPopup, STable2, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'

class table extends React.Component {
    title;
    Parent;
    excludes;
    constructor(props, { title, Parent, excludes }) {
        super(props);
        this.Parent = Parent;
        this.title = title ?? `Table ${Parent.name}`;
        this.excludes = excludes ?? [];
    }
    $getData() {
        return null;
    }
    $headers() {
        const excludes = this.excludes ?? [];
        var headers = {};
        headers["index"] = { label: "#", width: 50 }
        if (this.Parent.model.image) {
            headers["key-image"] = {
                label: "Img",
                width: 50,
                center: true,
                render: (key_r) => {
                    return this.Parent.model._get_image_download_path(SSocket.api, key_r);
                },
                component: (src) => {
                    return <SView col={"xs-11"} height center card>
                        <SImage src={src} enablePreview />
                    </SView>
                }
            }
        }
        Object.keys(this.Parent.model.Columns).map((key) => {
            var col = this.Parent.model.Columns[key];
            if (excludes.indexOf(key) > -1) {
                return;
            }
            var render = null;
            if (col.type == "timestamp") {
                render = (obj) => { return new SDate(obj).toString() }
            }
            if (col.type == "date") {
                render = (obj) => { return new SDate(obj).toString("dd/MM/yyyy") }
            }
            if (col.type == "time") {
                render = (obj) => { return new SDate(obj).toString("hh:mm:ss") }
            }
            var label = key;
            if (col) {
                label = col.label ?? key;
            }
            headers[key] = ({
                key: key,
                label: label,
                width: 100,
                render: render
            })
        })
        return headers;
    }
    _formatHeaders() {
        var heads = this.$headers();
        var arr = [];
        Object.keys(heads).map((key, i) => {
            arr.push({
                key: key,
                index: i + 1,
                ...heads[key]
            })
        })

        arr = arr.sort((a, b) => a.index - b.index);
        return arr;
    }
    $filter(data) {
        return true;
    }
    getConten() {
        var data = this.$getData();
        if (!data) return <SLoad />
        return <STable2
            data={data}
            header={this._formatHeaders()}
            filter={this.$filter.bind(this)}
        />
    }
    $allowAccess() {
        return true;
    }
    render() {
        if (this.$allowAccess() == "cargando") {
            return <SLoad />
        }
        if (!this.$allowAccess()) {
            SPopup.alert("Access denied to page " + this.Parent.name + " " + this.title)
            SNavigation.goBack();
            return null;
        }
        return (
            <SPage disableScroll title={this.title}>
                {this.getConten()}
            </SPage>
        );
    }
}
export default table;