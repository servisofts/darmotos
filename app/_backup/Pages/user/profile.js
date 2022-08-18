import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SInput, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import Model from '../../Model';

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var user = Model.usuario.Action.getUsuarioLog();
        if (!user) {
            SNavigation.replace("/user/login");
            return null;
        }
        return (
            <SPage title={'Profile'}  >
                <SHr />
                <SHr />
                <SText>{JSON.stringify(user)}</SText>
                <SHr />
                <SHr />
                <SButtom type={'outline'} onPress={() => {
                    Model.usuario.Action.unlogin();
                }}>UnLogin</SButtom>
                <SHr />
                <SHr />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(profile);