import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SPage, SText, STheme, SView } from 'servisofts-component';
import MenuButtom from '../../Components/MenuButtom';
import MenuPages from '../../Components/MenuPages';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <SPage title={'Ajustes'}>
                <SHr height={32} />
                <MenuPages path={"/ajustes/"} >
                    <MenuButtom label={STheme.getTheme() == "default" ? "Dark" : "Withe"} icon={STheme.getTheme() == "default" ? <SIcon name='Moon' /> : <SIcon name='Sun' fill={"#fff"} />} onPress={() => {
                        STheme.change()
                    }} />
                </MenuPages>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);