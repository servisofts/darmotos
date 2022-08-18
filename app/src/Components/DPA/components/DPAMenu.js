import React from 'react';
import { SHr, SList, SText, SView } from 'servisofts-component';
import MenuItem from './MenuItem';

class DPAMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"}>
                <SList
                    data={this.props.data} horizontal render={obj => {
                        return <MenuItem icon={obj.icon} onPress={obj.onPress} >{obj.label}</MenuItem>
                    }} />
                <SHr />
            </SView>
        );
    }
}
export default DPAMenu;