import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
const barColor = "#220000"
const App = (props) => {
    return <View style={{
        width: "100%",
        flex: 1,
        backgroundColor: barColor
    }}>
        <SafeAreaView style={{
            flex: 1
        }}>
            <StatusBar barStyle={"light-content"} animated backgroundColor={barColor} />
            <View style={{
                width: "100%",
                flex: 1,
                backgroundColor: "#fff"
            }} onLayout={(evt) => {

            }}>
                <Text>Hola</Text>
            </View>
        </SafeAreaView>
    </View>
}
export default App;