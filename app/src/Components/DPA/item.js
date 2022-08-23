import React from 'react'
import { SDate, SHr, SImage, SList, SLoad, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'

class item extends React.Component {
    Parent;
    excludes;
    row;

    constructor(props, { Parent, excludes, row }) {
        super(props);
        this.Parent = Parent ?? props.Parent;
        this.row = row ?? props.row;
        this.excludes = excludes ?? (props.excludes ?? []);
    }
    $getData() {
        return this.props.data;
    }
    loadImage(pk) {
        var src = this.Parent.model._get_image_download_path(SSocket.api, pk);
        if (!src) return null;
        return <SView center row>
            <SView width={8} />
            <SView width={60} height={60} card style={{
                overflow: 'hidden',
            }}>
                <SImage src={src} style={{
                    position: "absolute",
                    resizeMode: "cover"
                }} />
                <SImage style={{
                    resizeMode: "cover"
                }} src={src + "?time=" + (new Date().getTime() / 1000)} enablePreview />
            </SView>
            <SView width={8} />
        </SView>
    }
    buildLabel({ label, value }) {
        return <SView col={"xs-12"} row style={{
            alignItems: 'center',
        }}>
            <SHr/>
            <SText color={STheme.color.gray} fontSize={12} >{`${label}: `} </SText>
            <SText fontSize={14}>{value}</SText>
        </SView>
    }
    $renderContent() {
        var arr = Object.keys(this.Parent?.model?.Columns)
        return <SList data={arr}
            filter={(x) => { return this.excludes.indexOf(x) <= -1 }}
            space={0}
            render={(key) => {
                var col = this.Parent?.model?.Columns[key];
                var label = key;
                var value = this.data[key];
                if (col) {
                    label = col.label ?? key;
                    if (col.type == "timestamp") {
                        value = new SDate(value).toString('yyyy-MM-dd hh:mm')
                    }
                    if (col.type == "boolean") {
                        value = value?"SI":"NO"
                    }
                }
                return this.buildLabel({ label, value })
            }} />
    }
    renderContent() {
        this.data = this.$getData();
        if (!this.data) return <SLoad />
        return <SView col={"xs-12"} row={this.row} center={!this.row} >

            {this.loadImage(this.data[this.Parent.model.pk])}
            {!this.row ? <SHr /> : null}
            <SView flex center>
                {this.$renderContent()}
            </SView>
        </SView>
    }

    render() {
        return (<SView card col={"xs-12"} style={{
            padding: 8
        }} onPress={this.props.onPress}>
            {this.renderContent()}
        </SView>);
    }
}
export default item;