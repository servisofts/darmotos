import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SPage, SText, STheme, SView } from 'servisofts-component';
import MenuButtom from '../../Components/MenuButtom';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    buildIcon(label) {

        return <SView col={"xs-12"} height>
            <SIcon name={"Box"} fill={STheme.color.card} />
            <SView style={{
                position: "absolute",
            }} center col={"xs-12"} height>
                <SText color={STheme.color.gray} fontSize={12} bold>{label}</SText>
            </SView>
        </SView>
    }

    render() {
        return (
            <SPage title={'Ajustes'}>
                <SHr height={32} />
                <SView col={"xs-12"} row center>
                    <MenuButtom url={"/ajustes/dato"} permiso={"ver"} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);