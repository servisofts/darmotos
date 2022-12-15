import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, STheme, SView } from 'servisofts-component'

export default class RContent extends Component {
    render() {
        return (
            <SView col={"xs-12"} height backgroundColor={STheme.color.secondary}
                center
                style={{
                    borderBottomLeftRadius: 8
                }}>
                <SView style={{
                    padding: 2
                }}>
                    <SIcon name={"logoCompleto"} fill={STheme.color.primary} />
                </SView>
            </SView>
        )
    }
}