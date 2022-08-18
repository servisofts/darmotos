import React from 'react'
import { SButtom, SHr, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import DPAContainer from './components/DPAContainer';
import MenuItem from './components/MenuItem';

class index extends React.Component {
    title;
    Parent;
    pk;
    data;
    constructor(props, { title, Parent }) {
        super(props);
        this.Parent = Parent;
        this.title = title ?? `Delete ${Parent.name}`;
        this.pk = SNavigation.getParam("pk");
        if (!this.validateParams()) {
            SNavigation.goBack();
        }

    }
    validateParams() {
        return !!this.pk
    }
    $getData() {
        return null;
    }

    $onDelete() {
        return null;
    }
    loadContent() {
        this.data = this.$getData();
        if (!this.data) return <SLoad />;
        return <SView center>
            <SHr height={30} />
            <SText center fontSize={18}>Esta seguro que desea eliminar el elemento {this.Parent.name}?</SText>
            <SHr height={20} />
            <SText center fontSize={12} color={STheme.color.gray}>Por su seguridad esta accion quedara registrada.</SText>
            <SHr height={30} />
            <SButtom variant={"confirm"} type={"danger"}
                onPress={() => {
                    this.$onDelete();
                }}>ELIMINAR</SButtom>
            {/* <SText>{JSON.stringify(this.data)}</SText> */}
        </SView>
    }

    $allowAccess() {
        return true;
    }
    render() {
        if (this.$allowAccess() == "cargando") {
            return <SLoad />
        }
        if (!this.$allowAccess()) {
            SPopup.alert("Access denied to page "+this.Parent.name + " "+this.title)
            SNavigation.goBack();
            return null;
        }
        return (<SPage title={this.title} >
            <DPAContainer>
                {this.loadContent()}
            </DPAContainer>
        </SPage>);
    }
}
export default index;