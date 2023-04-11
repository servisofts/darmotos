import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { MenuButtom } from 'servisofts-rn-roles_permisos';
import Model from '../../Model';
import usuario from '../usuario';
import SSocket from 'servisofts-socket';
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
        var usuarios = Model.usuario.Action.getAll();
        if (!cuotas || !usuarios) return <SLoad />
        var data_final = {};
        Object.values(cuotas).map((cuota) => {
            if (cuota.tipo != "compra") return;
            if (!data_final[cuota.proveedor.key_usuario]) {
                data_final[cuota.proveedor.key_usuario] = usuarios[cuota.proveedor.key_usuario];
                data_final[cuota.proveedor.key_usuario].cuotas = {};
            }
            data_final[cuota.proveedor.key_usuario].cuotas[cuota.key] = cuota;
        })
        return <SList
            col={"xs-11 sm-10 md-8 lg-6 xl-4"}
            buscador
            data={data_final}
            render={(obj) => {
                var cuotas_retrasadas = Object.values(obj.cuotas).filter(a => new SDate(a.fecha).isBefore(new SDate()))
                return <SView col={"xs-12"} card style={{
                    padding: 8
                }} onPress={() => {
                    // SNavigation.navigate("/cobranza/pendientes", { nit: obj.CI });
                    // SNavigation.navigate("/cobranza/carrito_de_cuotas", { nit: obj.CI });
                    SNavigation.navigate("/cobranza/carrito_de_cuotas", {
                        nit: obj.CI, onSelect: (obj) => {
                            if (this.onSelect) {
                                SNavigation.goBack();
                                this.onSelect(obj);
                            }
                        }
                    });
                }}>
                    <SView col={"xs-12"} row>
                        <SView width={100} style={{
                            padding: 8
                        }}>
                            <SImage src={Model.usuario._get_image_download_path(SSocket.api, obj.key)} />
                        </SView>
                        <SView>
                            <SText fontSize={18}>{obj.Nombres} {obj.Apellidos}</SText>
                            <SHr />
                            <SView row>
                                <SText>Cuotas retrasadas: </SText>
                                <SText>{cuotas_retrasadas.length}</SText>
                            </SView>
                            <SHr height={4} />
                            <SView row>
                                <SText>Cuotas restantes: </SText>
                                <SText>{Object.values(obj.cuotas).length}</SText>
                            </SView>
                        </SView>
                    </SView>

                </SView>
            }}
        />
    }
    render() {
        return (
            <SPage title={'Deudas'}>
                <SView col={"xs-12"} center>
                    {this.render_data()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);