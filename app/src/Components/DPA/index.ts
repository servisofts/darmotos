import { connect as r_connect } from 'react-redux';

import list from "./list"
import table from "./table"
import _new from "./new"
import _delete from "./delete"
import profile from "./profile"
import edit from "./edit"
import item from './item';
export const connect = (elm) => {
    const initStates = (state) => {
        return { state }
    };
    return r_connect(initStates)(elm);
}
export default {
    list,
    table,
    edit,
    profile,
    new: _new,
    delete: _delete,
    item,
}