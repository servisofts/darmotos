import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SImage, SInput, SList, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
import FileItem from './FileItem'
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    type_text() {
        const { obj, dto } = this.props
        return <SText flex fontSize={18} >{dto?.descripcion}</SText>
    }
    type_number() {
        const { obj, dto } = this.props
        return <SText flex fontSize={18}>{dto?.descripcion}</SText>
    }
    type_money() {
        const { obj, dto } = this.props
        return <SText flex fontSize={18}>Bs. {SMath.formatMoney(dto?.descripcion ?? 0)}</SText>
    }
    type_date() {
        const { obj, dto } = this.props
        return <SText flex fontSize={18}>{dto?.descripcion}</SText>
    }
    type_image() {
        const { obj, dto } = this.props
        if (!dto) return;
        var filePath = SSocket.api.root + "usuario_dato/" + dto.key_usuario_perfil + "/" + obj.key + "/";
        return <SView col={"xs-12"} >
            <SView width={100} height={100} card>
                <SImage src={filePath + dto.descripcion} enablePreview />
            </SView>
        </SView>
    }

    type_file() {
        const { obj, dto } = this.props
        if (!dto) return;
        var filePath = SSocket.api.root + "usuario_dato/" + dto.key_usuario_perfil + "/" + obj.key + "/";
        return <SView col={"xs-12"}>
            <FileItem name={dto.descripcion} path={filePath} />
        </SView>
    }
    type_files() {
        const { obj, dto } = this.props
        if (!dto) return;
        var arr = JSON.parse(dto.descripcion);
        if (!arr) return;
        var filePath = SSocket.api.root + "usuario_dato/" + dto.key_usuario_perfil + "/" + obj.key + "/";
        return <SList
            horizontal
            data={arr}
            render={(fil) => {
                return <FileItem name={fil} path={filePath} />
            }} />

    }
    type_checkBox() {
        const { obj, dto } = this.props
        return <SView>
            <SInput type={"checkBox"} value={dto?.descripcion} disabled={true} />
        </SView>
    }
    type_default() {
        const { obj, dto } = this.props
        return <SText >{dto?.descripcion}</SText>
    }
    getData() {
        switch (this.props.obj.tipo) {
            case "text":
                return this.type_text();
            case "number":
                return this.type_number();
            case "money":
                return this.type_money();
            case "date":
                return this.type_date();
            case "image":
                return this.type_image();
            case "file":
                return this.type_file();
            case "files":
                return this.type_files();
            case "checkBox":
                return this.type_checkBox();
            default:
                return this.type_default();
        }

    }
    render() {
        const { obj, dto } = this.props
        return (
            <SView col={"xs-12"} card style={{
                padding: 8
            }}>
                <SView row col={"xs-12"} style={{
                    overflow: "hidden"
                }}>
                    <SText col={"xs-4 sm-3 md-2"} fontSize={12} color={STheme.color.gray}>{obj.descripcion} {obj.required ? "*" : ""}</SText>
                    {this.getData()}

                </SView>
                {/* <SText>{obj.tipo}</SText> */}
            </SView>
        );
    }
}
export default (index);