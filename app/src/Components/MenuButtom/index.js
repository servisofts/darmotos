import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SNavigation, SText, SView } from 'servisofts-component'

export default class MenuButtom extends Component {
    render() {
        return <SView
            height={100}
            width={90}
            center
            onPress={() => {
                SNavigation.navigate(this.props.url)
            }}>
            <SView width={60} height={60}>
                {this.props.icon}
            </SView>
            <SView col={"xs-12"} flex>
                <SText center fontSize={14} col={"xs-12"}>{this.props.label}</SText>
            </SView>
        </SView>
    }
}