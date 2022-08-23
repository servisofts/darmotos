import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText, SView } from 'servisofts-component';
import Model from '../../Model';
import MenuButtom from '../MenuButtom';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getPages() {
        var dataPage = Model.usuarioPage.Action.getPages(this.props.path);
        if (!dataPage) return null;
        return Object.values(dataPage).map((obj) => {
            return <MenuButtom url={obj.url} permiso={this.props.permiso ?? "ver"} params={this.props.params} />
        })
    }
    render() {
        return (
            <SView col={"xs-12"} row center>
                {this.getPages()}
                {this.props.children}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);