import React from 'react'
import { SButtom, SHr, SImage, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import DPAContainer from './components/DPAContainer';
import DPAMenu from './components/DPAMenu';
import SSocket from 'servisofts-socket'
import Item from './item';

class list extends React.Component {
    title;
    Parent
    excludes
    item;
    page;
    onSelect;
    constructor(props, { title, Parent, excludes, item, page = true }) {
        super(props);
        this.Parent = Parent;
        this.item = item;
        this.page = page;
        this.title = title ?? `List ${Parent.name}`;
        this.excludes = excludes ?? [];
       
    }

    $getData() {
        return null;
    }
    $onSelect(obj) {
        this.onSelect = SNavigation.getParam("onSelect");
        if(this.onSelect){
            this.onSelect(obj);
            SNavigation.goBack();
            return;
        }
        SNavigation.navigate(this.Parent?.path + "/profile", { pk: obj[this.Parent.model.pk] })
    }
    $item(obj) {
        const ItemNew = this.item;
        if (ItemNew) {
            return <ItemNew data={obj} Parent={this.Parent} excludes={this.excludes} row onPress={() => {
                this.$onSelect(obj)
            }} />
        }
        return <Item data={obj} Parent={this.Parent} excludes={this.excludes} row onPress={() => {
            this.$onSelect(obj)
        }} />
    }
    $filter(data) {
        return true;
    }
    loadContent() {
        var data = this.$getData();
        if (!data) return <SLoad />;
        return (<SList
            buscador
            data={data}
            filter={this.$filter.bind(this)}
            render={obj => { return this.$item(obj) }}
        />)
    }

    onTable(params) {
        SNavigation.navigate(this.Parent?.path + "/table", params);
    }
    onNew(params) {
        SNavigation.navigate(this.Parent?.path + "/new", params);
    }

    $allowNew() {
        return false;
    }
    $allowTable() {
        return false;
    }
    $menu() {
        var arr = [];
        if (this.$allowNew()) {
            arr.push({ label: "+ new", onPress: () => this.onNew() });
        }
        if (this.$allowTable()) {
            arr.push({ label: "table", onPress: () => this.onTable() });
        }
        return arr;
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
        if (!this.page) {
            return (
                <SView col={"xs-12"}>
                    <SHr height={16} />
                    <SText fontSize={16} bold>{this.title}</SText>
                    <SHr height={8} />
                    <DPAMenu data={this.$menu()} />
                    {this.loadContent()}
                    <SHr height={50}/>
                </SView>
            );
        }
        return (
            <SPage title={this.title} >
                <DPAContainer>
                    <DPAMenu data={this.$menu()} />
                    {this.loadContent()}
                    <SHr height={50}/>
                </DPAContainer>
            </SPage>
        );
    }
}
export default list;