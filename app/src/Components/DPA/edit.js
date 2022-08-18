import React from 'react'
import { SForm, SInput, SLoad, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import DPAContainer from './components/DPAContainer';
import SSocket from 'servisofts-socket'
class index extends React.Component {
    title;
    Parent
    excludes
    constructor(props, { title, Parent, excludes }) {
        super(props);
        this.Parent = Parent;
        this.title = title ?? `Edit ${Parent.name}`;
        this.excludes = excludes ?? [];
        this.pk = SNavigation.getParam("pk");
        if (!this.validateParams()) {
            SNavigation.goBack();
        }
    }
    validateParams() {
        return !!this.pk
    }
    $inputs() {
        var headers = {};
        const excludes = this.excludes ?? [];
        if (this.Parent.model.image) {
            headers["image_profile"] = {
                type: "image",
                defaultValue: this.Parent.model._get_image_download_path(SSocket.api, this.pk)
            }
        }
        Object.keys(this.Parent.model.Columns).map((key) => {
            if (excludes.indexOf(key) > -1) {
                return;
            }
            var col = this.Parent?.model?.Columns[key];
            if (!col.editable) {
                return;
            }
            var label = key;
            if (col) {
                label = col.label ?? key;
            }
            var typeImput = "default";
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
            headers[key] = { label: label, required: col["notNull"], type: typeImput, defaultValue: this.data[key] ?? "" }
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

    $getData() {
        return null;
    }
    $onSubmit(data) {
        return null;
    }
    $onSubmitFile() {
        this.form.uploadFiles(
            this.Parent.model._get_image_upload_path(SSocket.api, this.pk)
        );
        return null;
    }
    loadContent() {
        this.data = this.$getData();
        if (!this.data) return <SLoad />;
        return <SForm
            col={"xs-12"}
            ref={ref => this.form = ref}
            inputs={this._buildHeaders()}
            onSubmitName={"Aceptar"}
            onSubmit={(form) => {
                this.$onSubmit(form)
                this.$onSubmitFile()

            }}
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
            <SPage title={this.title}>
                <DPAContainer>
                    {this.loadContent()}
                </DPAContainer>
            </SPage >
        );
    }
}
export default index;