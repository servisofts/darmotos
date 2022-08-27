import { Component } from 'react';
import { SPage, SView } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { PlanDeCuentas } from 'servisofts-rn-contabilidad'
import Model from '../../../Model';

class index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<SPage>
            <SView col={"xs-12"} center>
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"}>
                    <PlanDeCuentas />
                </SView>
            </SView>

        </SPage>)
    }
}
export default connect(index);