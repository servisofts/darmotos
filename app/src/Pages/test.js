import React, { Component} from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText } from 'servisofts-component';
import Btn from '../Components/Btn';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'Test'} hidden>

                <Btn ref={ref => this._btn = ref} suma={[1, 5, 7, 10]} />
                <SHr />
                <SText onPress={() => {
                    this._btn.esconderse();
                  
                }}  >
                ENVIAR
            </SText>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Test);