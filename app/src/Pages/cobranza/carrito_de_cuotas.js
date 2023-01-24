import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../Model';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onSelect = SNavigation.getParam("onSelect");
    }

    componentDidMount() {
        Model.cuota.Action.getPendientes().then(e => {
            this.setState({ data: e.data })
        })
    }

    render_data() {
        var cuotas = this.state.data
        if (!cuotas) return <SLoad />
        var cuotas_aux = {};
        Object.values(cuotas).map(cuota => {
            if (cuota.tipo === "compra") {
                if (cuota.proveedor.nit == this.props.route.params.nit) {
                    cuotas_aux[cuota.key] = cuota;
                }
            } else {
                if (cuota.cliente.nit == this.props.route.params.nit) {
                    cuotas_aux[cuota.key] = cuota;
                }
            }
        });

        cuotas = cuotas_aux;
        return <SList
            order={[{ key: "fecha", type: "date", order: "asc" }]}
            data={cuotas}
            space={0}
            limit={10}
            render={(obj) => {
                var compra_venta = Model.compra_venta.Action.getByKey(obj.key_compra_venta);
                if (!compra_venta) return <SLoad />
                var isRetrasada = new SDate(obj.fecha).isBefore(new SDate())
                return <SView col={"xs-12"} style={{
                    padding: 8
                }} onPress={() => {
                    if (this.onSelect) {
                        SNavigation.goBack();
                        this.onSelect(obj);
                        return;
                    }
                }}>
                    <SView col={"xs-12"} row>
                        <SView flex>
                            <SText flex color={STheme.color.lightGray} fontSize={14}>{compra_venta.descripcion}</SText>
                            <SText flex color={STheme.color.lightGray} fontSize={10}>{compra_venta.tipo_pago}</SText>
                            <SHr />
                            <SText bold flex fontSize={14}># {obj.codigo} - {obj.descripcion}</SText>
                            <SText flex fontSize={10} color={STheme.color.lightGray} >{new SDate(obj.fecha, "yyyy-MM-dd").toString("dd de MONTH, yyyy")}</SText>

                        </SView>
                        <SView width={8} />
                        <SView>
                            <SText style={{ alignItems: 'end', textAlign: "end" }} fontSize={14}>{SMath.formatMoney(obj.monto)}</SText>
                            {!obj.amortizaciones ? "" : <SText style={{ alignItems: 'end', textAlign: "end" }} color={STheme.color.danger} fontSize={12}>-{SMath.formatMoney(obj.amortizaciones ?? 0)}</SText>}
                            <SText color={STheme.color.danger} fontSize={10}>{isRetrasada ? "Pendiente de pago" : ""}</SText>
                        </SView>
                        <SHr />
                        {/* <SView col={"xs-12"}>
                            <SText flex fontSize={10} color={STheme.color.lightGray} >Capital: {capital ?? 0}</SText>
                            <SText flex fontSize={10} color={STheme.color.lightGray} >Interes: {interes ?? 0}</SText>
                            <SText flex fontSize={10} color={STheme.color.lightGray} >Saldo capital: {saldo_capital ?? 0}</SText>
                            <SText flex fontSize={10} color={STheme.color.lightGray} >Pagos acumulados: {pagos_acumulados ?? 0}</SText>
                        </SView> */}
                        {/* <SHr /> */}
                        <SHr height={1} color={STheme.color.card} />
                    </SView>
                    {/* <SText>{obj.codigo}</SText>
                    <SText>{obj.descripcion}</SText>
                    <SText>{obj.tipo}</SText>
                    <SText>{obj.monto}</SText>
                    <SText>{obj.amortizaciones}</SText>
                    <SText>{obj.fecha}</SText>
                    <SText>{obj.key_compra_venta}</SText> */}
                </SView>
            }}
        />

    }
    render() {
        return (
            <SPage title={'Carrito de cuotas'}>
                <SView col={"xs-12"} center>
                    <SHr />
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center card>
                        <SHr />
                        {this.render_data()}
                    </SView>
                </SView>
                <SHr height={150} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);