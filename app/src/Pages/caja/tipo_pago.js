import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SHr, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Components from '../../Components';

type PropsType = {
    monto: any,
    detalle: any,
    key_caja: any,
    _type: any,
    onSelect: any

}
class index extends Component {
    params: PropsType;
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
    }

    getDetalle() {
        return <SView col={"xs-12"} card style={{
            padding: 8
        }}>
            <SHr height={8} />
            <SView col={"xs-12"} row center>
                <SText fontSize={10} color={STheme.color.lightGray}>{"Detalle"}</SText>
                <SView flex />
                <SText fontSize={10} color={STheme.color.lightGray}>Total</SText>
            </SView>
            <SHr />
            <SHr />
            <SView col={"xs-12"} row center>
                <SText fontSize={14}>{this.params?.detalle}</SText>
                <SView flex />
                <SText fontSize={18}>Bs. {SMath.formatMoney(this.params?.monto)}</SText>
            </SView>
            <SHr height={8} />
            <SHr h={1} color={STheme.color.card} />
        </SView>
    }
    render() {
        return (
            <SPage >
                <SView col={"xs-12"} center>
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                        <SHr height={16} />
                        <SText fontSize={18} bold>Seleeciona el metodo de pago</SText>
                        <SHr height={16} />
                        {this.getDetalle()}
                        <SHr height={16} />
                        <Components.empresa.tipo_pago.Select onSelect={(tp) => {
                            console.log(tp)
                            if (this.params.onSelect) {
                                this.params.onSelect(tp);
                                SNavigation.goBack();
                            }

                        }} />
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);