import React, { Component } from 'react';
import { SDate, SHr, SImage, SInput, SList, SLoad, SMath, SNavigation, SOrdenador, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../../../Model';
import Separador from './Separador';

const PERIODICIDAD_DATA = {
    "day": { label: "Día", label_plural: "días" },
    "month": { label: "Mes", label_plural: "meses" },
    "year": { label: "Año", label_plural: "años" }
}
export default class PlanPagos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fecha_inicio: new SDate().toString("yyyy-MM-dd")
        };
    }
    componentDidMount() {


    }
    getCuotasArray() {
        return this.state.cuotas
    }
    data = {}
    totales_item({
        codigo,
        descripcion,
        monto,
        fecha
    }) {
        return <SView col={"xs-12"} row>
            <SView flex>
                <SText bold flex fontSize={16}># {codigo} - {descripcion}</SText>
                <SText flex fontSize={12} >{new SDate(fecha, "yyyy-MM-dd").toString("dd de MONTH, yyyy")}</SText>
            </SView>
            <SView width={8} />
            <SText style={{ alignItems: 'end', textAlign: "end" }}>{SMath.formatMoney(monto)}</SText>
        </SView>
    }

    getCuotas() {

        if (this.state.loading) return <SLoad />
        return <SList
            data={this.state.cuotas}
            render={(data, key, i) => {
                return this.totales_item({
                    codigo: data.codigo,
                    descripcion: data.descripcion,
                    monto: data.monto,
                    fecha: data.fecha
                })
            }}
        />
    }

    calcularCuotas(numero_cuotas = 1, fecha_inicio = new SDate().toString("yyyy-MM-dd")) {
        this.state.fecha_inicio = "";
        this.state.numero_cuotas = ""
        this.state.cant_aux = ""
        this.state.fecha_aux = ""
        if (this.inp_cant_cuotas) {
            numero_cuotas = this.inp_cant_cuotas.getValue();
        }
        if (this.inp_fecha) {
            fecha_inicio = this.inp_fecha.getValue();
        }



        var cuotas_arr = []
        new Array(parseInt(numero_cuotas ?? 1)).fill(0).map((obj, i) => {
            let initDate = new SDate(fecha_inicio, "yyyy-MM-dd");
            if (i != 0) {
                initDate.addMonth(i)
            }
            var cuota = {
                codigo: i + 1,
                descripcion: "Cuota",
                monto: (this.state.totales.subtotal / (numero_cuotas ?? 1)),
                fecha: initDate.toString("yyyy-MM-dd")
            }
            cuotas_arr[i] = cuota;
        })
        this.state.cuotas = null
        this.state.fecha_inicio = "";
        this.state.numero_cuotas = 1;
        this.state.loading = true;
        this.setState({ ...this.state })
        Model.cuota.Action.registroAll({
            key_compra_venta: this.data.key,
            key_usuario: Model.usuario.Action.getKey(),
            data: cuotas_arr
        }).then((e) => {
            this.setState({ loading: false })
        }).catch((e) => {
            this.setState({ loading: false })
        })
        // Model.compra_venta.Action.changeState({ data: this.data, state: "cotizacion" })
    }

    getRecalcular() {
        if (!this.state.cant_aux && !this.state.fecha_aux) return null;
        if ((parseInt(this.state.cant_aux) == parseInt(this.state.numero_cuotas)) && (this.state.fecha_aux == this.state.fecha_inicio)) return null
        console.log(this.state)
        return <SView card style={{ padding: 16 }} onPress={() => {
            this.calcularCuotas();
        }}>
            <SText bold color={STheme.color.danger}>RECALCULAR</SText>
        </SView>

    }
    editor() {
        if (this.props.disabled) return null;


        // this._cuotas_data = cuotas;
        return <SView col={"xs-12"} center>
            <SView col={"xs-12"} row center>
                <SView width={130}>
                    <SInput ref={ref => this.inp_cant_cuotas = ref} type={"number"} style={{ textAlign: "center", paddingRight: 8, }} label={"Cuantas cuotas?"}
                        defaultValue={this.state.numero_cuotas}
                        onChangeText={(val) => {
                            this.setState({ cant_aux: val })
                        }}
                    />
                </SView>
                <SView flex />

                <SView width={130}>
                    <SInput ref={ref => this.inp_fecha = ref} type={"date"} style={{ textAlign: "center" }} iconR={<SView width={8} />} label={"Fecha de inicio"} defaultValue={this.state.fecha_inicio}
                        onChangeText={(val) => {
                            this.setState({ fecha_aux: val })
                        }} />
                </SView>
            </SView>
            <SView col={"xs-12"} row center>
                <SView width={130}>
                    <SInput ref={ref => this.inp_periodicidad_medida = ref}
                        type={"select"}
                        options={[
                            ...Object.keys(PERIODICIDAD_DATA).map(k => { return { key: k, content: PERIODICIDAD_DATA[k].label } })
                        ]}
                        style={{ textAlign: "center", paddingRight: 8, }}
                        label={"Periodicidad"}
                        defaultValue={this.state.periodicidad_medida}
                        onChangeText={(val) => {
                            this.setState({ periodicidad_medida_aux: val })
                        }}
                    />
                </SView>
                <SView flex />
                <SView width={130}>
                    <SInput ref={ref => this.inp_periodicidad_valor = ref} type={"number"}
                        style={{ textAlign: "center", paddingRight: 8, }}
                        label={"Cada cuantos " + PERIODICIDAD_DATA[this.state.periodicidad_medida].label_plural + "?"}
                        defaultValue={this.state.periodicidad_valor}
                        onChangeText={(val) => {
                            this.setState({ periodicidad_valor_aux: val })
                        }}
                    />
                </SView>
            </SView>
            <SHr />
            {this.getRecalcular()}
            <Separador data={this.data} />
            {/* <SText>{this.state.numero_cuotas}</SText> */}
            {/* {this.getCuotas()} */}
            <SHr />
        </SView>
    }
    render() {
        this.data = this.props.data;

        var t = Model.compra_venta_detalle.Action.getTotales({
            key_compra_venta: this.data.key
        })

        var cuotas = Model.cuota.Action.getAllByKeyCompraVenta({
            key_compra_venta: this.data.key
        })
        if (!t) return null;
        if (!cuotas) {
            this.state.cuotas = null;
            return null;
        }
        this.state.totales = t;
        if (!this.state.cuotas) {
            var arr = new SOrdenador([{ key: "codigo", type: "number", order: "asc", peso: 1 }]).ordernarObjetoToLista(cuotas);
            this.state.cuotas = arr
            this.state.numero_cuotas = this.state.cuotas.length
            if (this.state.numero_cuotas > 0) {
                this.state.fecha_inicio = new SDate(this.state.cuotas[0].fecha).toString("yyyy-MM-dd")
            }
            if (!this.state.periodicidad_medida) {
                this.state.periodicidad_medida = "month"
            }
            if (!this.state.periodicidad_valor) {
                this.state.periodicidad_valor = 1
            }
            if (!this.state.numero_cuotas) {
                this.state.numero_cuotas = 1
            }
            if (this.state.loading) {
                return <SLoad />
            }
            if (this.state.cuotas) {
                if (this.state.cuotas.length == 0) {
                    this.calcularCuotas()
                } else {
                    var total = 0;
                    this.state.cuotas.map((obj) => {
                        total += parseFloat(obj.monto);
                    })
                    if (parseFloat(total).toFixed(2) != parseFloat(t.total_a_pagar).toFixed(2)) {
                        this.calcularCuotas(this.state.numero_cuotas, this.state.fecha_inicio)
                    }
                }
            }

        }
        return <SView col={"xs-12"}>
            {this.editor()}
            {this.getCuotas()}
        </SView>
    }
}
