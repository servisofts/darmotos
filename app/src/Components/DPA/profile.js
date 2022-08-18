import React from 'react'
import { SButtom, SHr, SImage, SList, SLoad, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import DPAContainer from './components/DPAContainer';
import DPAMenu from './components/DPAMenu';
import SSocket from 'servisofts-socket'
import Item from './item';


class profile extends React.Component {
    title;
    Parent;
    pk;
    data;
    excludes;
    item;
    constructor(props, { title, Parent, excludes, item, pk }) {
        super(props);
        this.Parent = Parent;
        this.item = item;
        this.excludes = excludes ?? [];
        this.title = title ?? `Profile ${Parent.name}`;
        this.pk = SNavigation.getParam("pk") ?? pk;
        if (!this.validateParams()) {
            SNavigation.goBack();
        }

    }
    validateParams() {
        return !!this.pk
    }
    $getData() {
        return null;
    }

    loadContent() {
        this.data = this.$getData();
        if (!this.data) return <SLoad />;
        return <SView col={"xs-12"} center>
            {this.$item(this.data)}
        </SView>
    }
    $item(obj) {
        const ItemNew = this.item;
        if (ItemNew) {
            return <ItemNew data={obj} Parent={this.Parent} excludes={this.excludes} row={false} onPress={() => {
                this.$onSelect(obj)
            }} />
        }
        return <Item data={obj} Parent={this.Parent} excludes={this.excludes} row={false} />
    }
    onEdit() {
        SNavigation.navigate(this.Parent?.path + "/edit", { pk: this.data[this.Parent.model.pk] });
    }
    onDelete() {
        SNavigation.navigate(this.Parent?.path + "/delete", { pk: this.data[this.Parent.model.pk] });
    }
    $menu() {
        var arr = [];
        if (this.$allowEdit()) {
            arr.push({ icon: "Pencil", label: "edit", onPress: this.onEdit.bind(this) });
        }
        if (this.$allowDelete()) {
            arr.push({ icon: "Close", label: "delete", onPress: this.onDelete.bind(this) });
        }
        return arr;
    }
    $header() {
        return null;
    }
    $footer() {
        return null;
    }
    $allowEdit() {
        return false;
    }
    $allowDelete() {
        return false;
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
            <SPage title={this.title} >
                <DPAContainer>
                    {this.$header()}
                    <DPAMenu data={this.$menu()} />
                    {this.loadContent()}
                    {this.$footer()}
                </DPAContainer>
            </SPage>
        );
    }
}
export default profile;