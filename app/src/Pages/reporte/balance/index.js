import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
    }

    componentDidMount() {
        Model.caja.Action.reporte_cuentas({ fecha_inicio: this.params.fecha_inicio, fecha_fin: this.params.fecha_fin }).then(resp => {
            this.setState({ data: resp.data });
        })
    }

    render_cuentas() {
        var cuentas = Model.cuenta_contable.Action.getAllOrder({});
        if (!cuentas) return <SLoad />
        if (!this.state.data) return <SLoad />
        return <SList data={cuentas}
            filter={obj => obj.codigo.startsWith("4") || obj.codigo.startsWith("5")}
            render={(obj) => {
                return <SView col={"xs-12"} >
                    <SView col={"xs-12"} row>
                        <SText width={60}>{obj.codigo}</SText>
                        <SView width={8} />
                        <SText flex fontSize={12}>{obj.descripcion}</SText>
                        <SView width={8} />
                        <SText>{this.state?.data[obj.key]?.monto ? SMath.formatMoney(this.state?.data[obj.key]?.monto) : null}</SText>
                    </SView>
                    <SHr h={4} />
                    <SHr height={1} color={STheme.color.card} />
                </SView>
            }} />
    }
    render() {
        return (
            <SPage title={'Balance'}>
                <SView col={"xs-12"} center>
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                        <SHr height={16} />
                        {this.render_cuentas()}
                        <SHr height={50} />
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