import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import Components from '../../Components';
import Model from '../../Model';
import CajaClose from './Components/CajaClose';
import CajaOpen from './Components/CajaOpen';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key_caja: SNavigation.getParam("key_caja", "")
        };
    }
    render_inputs({ disabled }) {
        // var key_usuario = Model.usuario.Action.getKey();
        // var isMyCaja = key_usuario == this.state?.caja?.key_usuario
        if (this.state.punto_venta && this.state.sucursal) {
            if (this.state?.punto_venta?.key_sucursal != this.state?.sucursal?.key) {
                delete this.state.punto_venta;
                delete this.state.caja;
                this.setState({ ...this.state })
                return <SLoad />
            }
        }
        return <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"}>
            <SHr />
            <Components.empresa.sucursal.Select value={this.state.sucursal} onChange={obj => this.setState({ sucursal: obj })} disabled={disabled} />
            <SHr />
            <Components.empresa.punto_venta.Select value={this.state.punto_venta} onChange={obj => this.setState({ punto_venta: obj })} key_sucursal={this.state.sucursal?.key} disabled={disabled} />
            <SHr />
        </SView>
    }

    render_activa() {
        var activa = Model.caja.Action.getActiva();
        if (!activa) return <SLoad />
        return <SText>{JSON.stringify(activa)}</SText>
    }
    getLast() {
        if (this.state?.last?.key_punto_venta != this.state?.punto_venta?.key) {
            this.state.last = null;
        }
        if (this.state.last) return this.state.last;
        if (this.state.loading) return null;
        this.setState({ loading: true })
        Model.caja.Action.getLast({ key_punto_venta: this.state.punto_venta.key }).then(resp => {
            this.state.last = {
                key_punto_venta: this.state.punto_venta.key,
                ...resp.data
            };
            this.setState({ loading: false })
        }).catch(e => {
            this.setState({ loading: false })
        })
    }
    renderCajaOpen(key_caja) {
        var data = Model.caja.Action.getByKey(key_caja)
        // var punto_venta = Model.punto_venta.Action.getByKey(caja.key_punto_venta, { key_sucursal: caja.key_sucursal }); //TODO
        // var sucursal = Model.sucursal.Action.getByKey(caja.key_sucursal);
        // if (!data || !sucursal || !punto_venta) return <SLoad />
        if (!data) return <SLoad />
        // this.state.sucursal = sucursal;
        // this.state.punto_venta = punto_venta;
        // this.state.caja = data;

        return <CajaOpen data={data} sucursal={this.state.sucursal} punto_venta={this.state.punto_venta} />
    }
    render_estado() {
        var caja = {};

        var activa = Model.caja.Action.getActiva();
        if (!activa) return <SLoad />
        if (activa.key) {
            caja = activa;
        }
        if (caja.key && !caja.fecha_cierre) {
            this.state.punto_venta = Model.punto_venta.Action.getByKey(caja.key_punto_venta, { key_sucursal: caja.key_sucursal }); //TODO
            this.state.sucursal = Model.sucursal.Action.getByKey(caja.key_sucursal);
            if (!this.state.sucursal || !this.state.punto_venta) return <SLoad />
            return <>
                {this.render_inputs({ disabled: true })}
                <SHr />
                {this.renderCajaOpen(caja.key)}
            </>
        }
        if (!this.state.sucursal) return this.render_inputs({})
        if (!this.state.punto_venta) return this.render_inputs({})

        var last = this.getLast();
        if (!last) return <SLoad />

        if (last.key && !last.fecha_cierre) {
            return <>
                {this.render_inputs({})}
                <SHr />
                {this.renderCajaOpen(last.key)}
            </>
        }
        return <>
            {this.render_inputs({})}
            <SHr />
            <CajaClose data={caja} sucursal={this.state.sucursal} punto_venta={this.state.punto_venta} />
        </>
    }
    render() {
        return (
            <SPage title={'Cajas'}>
                <SView col={"xs-12"} center>
                    {this.render_estado()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);