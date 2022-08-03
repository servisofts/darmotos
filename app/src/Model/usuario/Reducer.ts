import { SStorage } from "servisofts-component";
import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    initialState() {
        var state = super.initialState();
        SStorage.getItem('usr_log', (resp: any) => {
            state.usuarioLog = JSON.parse(resp);
        });
        return state;
    }
    
    login(state, action) {
        if (action.estado != "exito") return;
        state.usuarioLog = action.data;
        SStorage.setItem('usr_log', JSON.stringify(action.data));
    }
}