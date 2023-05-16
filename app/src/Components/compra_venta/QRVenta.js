import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SImage, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
class QRVenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getQR() {
        var content = `https://darmotos.servisofts.com/venta/profile?pk=${this.props?.data?.key}`;
        return SSocket.sendPromise({
            "service": "sqr",
            "component": "qr",
            "type": "registro",
            "estado": "cargando",
            "data": {
                "image_src": "https://darmotos.servisofts.com/logo512.png",
                // "image_src": "https://rolespermisos.servisofts.com/http//page/18725a49-6a1e-41b0-ae4c-4ca9454b1436",
                "framework": "Rounded",
                "header": "Circle",
                // "colorHeader": "#ffffff",
                // "colorBackground":"#000000",
                "body": "Dot",
                "content": content,
                "colorBody2": "#80D034",
                "colorBody": "#80D034",
                "type_color": "solid",
            }
        })
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.getQR().then(e => {
            this.setState({ data: e.data, loading: false })
            console.log(e);
        }).catch(e => {
            this.setState({ loading: false, error: e.error })
            console.error(e);
        })
    }
    render() {
        return (
            <SView width={180} height={180} center {...this.props} card>
                <SImage enablePreview src={"data:image/jpg;base64, " + this.state?.data?.b64} />
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(QRVenta);


const IMG = `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`