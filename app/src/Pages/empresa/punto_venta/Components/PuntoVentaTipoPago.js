import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SHr, SList, SLoad, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../Model';

export default class PuntoVentaTipoPago extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render_data() {
        if (!this.props.key_punto_venta) return <SText>Not Found! key_punto_venta</SText>
        var punto_venta_tipo_pago = Model.punto_venta_tipo_pago.Action.getAll({ key_punto_venta: this.props.key_punto_venta });
        var tipos_pago = Model.tipo_pago.Action.getAll();
        if (!tipos_pago) return <SLoad />
        if (!punto_venta_tipo_pago) return <SLoad />
        return <SList
            data={tipos_pago}
            render={(obj) => {
                var select = Object.values(punto_venta_tipo_pago).find(o => o.key_punto_venta == this.props.key_punto_venta && o.key_tipo_pago == obj.key && o.estado != 0)
                return <SView col={"xs-12"} card style={{ padding: 4, opacity: !select ? 0.6 : 1 }} row center onPress={() => {
                    if (select) {
                        Model.punto_venta_tipo_pago.Action.editar({
                            data: {
                                ...select,
                                estado: 0,
                            },
                            key_usuario: Model.usuario.Action.getKey()
                        })
                    } else {
                        Model.punto_venta_tipo_pago.Action.registro({
                            data: {
                                key_punto_venta: this.props.key_punto_venta,
                                key_tipo_pago: obj.key,
                            },
                            key_usuario: Model.usuario.Action.getKey()
                        })
                    }

                }}>
                    <SView style={{ padding: 4 }}>
                        <SView width={40} height={40} card ></SView>
                    </SView>
                    <SView flex>
                        <SText>{obj.descripcion}</SText>
                        <SText fontSize={10} color={STheme.color.lightGray}>{obj.observacion}</SText>
                    </SView>
                </SView>
            }}
        />
    }

    render() {
        return (
            <SView col={"xs-12"} center >
                <SHr />
                <SText>Tipos de pagos activos para este punto de venta</SText>
                <SHr />
                {this.render_data()}
            </SView>
        );
    }
}
