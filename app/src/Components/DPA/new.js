import React from 'react'
import { SForm, SInput, SLoad, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import DPAContainer from './components/DPAContainer';
import SSocket from 'servisofts-socket'

class index extends React.Component {
    title;
    Parent;
    excludes;
    permiso;
    constructor(props, { title, Parent, excludes, permiso }) {
        super(props);
        this.Parent = Parent;
        this.title = title ?? `New ${Parent.name}`;
        this.permiso = permiso ?? "";
        this.excludes = excludes ?? [];
        this.params = SNavigation.getAllParams();
        console.log(this.params)
    }

    $allowAccess() {
        return true;
    }
    $inputs() {
        var headers = {};
        const excludes = this.excludes ?? [];
        if (this.Parent.model.image) {
            headers["image_profile"] = { type: "image" }
        }
        Object.keys(this.Parent.model.Columns).map((key) => {
            if (excludes.indexOf(key) > -1) {
                return;
            }


            var col = this.Parent?.model?.Columns[key];
            var label = key;
            if (col) {
                label = col.label ?? key;
            }
            var typeImput = "";
            switch (col["type"]) {
                case "text":
                    typeImput = "text"
                    break;
                case "date":
                    typeImput = "date"
                    break;
                case "integer":
                    typeImput = "number"
                    break;
            }

            headers[key] = { label: label, required: col["notNull"], type: typeImput }
            if (this.params[key]) {
                headers[key].defaultValue = this.params[key];
                headers[key].editable = false;
            }
            if (col.fk) {
                // headers[key] = { label: label, required: col["notNull"], type: "text", editable:false, onPress:()=>{
                //     alert("asd")
                // } }
            }
        })
        return headers;
    }
    _buildHeaders() {
        var heads = this.$inputs();
        var arr = [];
        Object.keys(heads).map((key, i) => {
            arr.push({
                key: key,
                index: i + 1,
                ...heads[key]
            })
        })
        arr = arr.sort((a, b) => a.index - b.index);
        var data = {}
        arr.map((obj) => {
            data[obj.key] = obj
        })
        return data;
    }
    $onSubmit(data) {
        return null;
    }
    $submitFile(pk) {
        console.log("entro al sumbut fil")
        this.form.uploadFiles(
            this.Parent.model._get_image_upload_path(SSocket.api, pk)
        );
        return null;
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
            <SPage title={this.title}>
                <DPAContainer>
                    <SForm
                        col={"xs-12"}
                        ref={ref => this.form = ref}
                        inputs={this._buildHeaders()}
                        onSubmitName={"Aceptar"}
                        onSubmit={this.$onSubmit.bind(this)}
                    />
                </DPAContainer>
            </SPage >
        );
    }
}
export default index;