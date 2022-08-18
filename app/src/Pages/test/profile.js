import DPA, { connect } from '../../Components/DPA';
import { Parent } from "."

class index extends DPA.profile {
    constructor(props) {
        super(props, { Parent: Parent, });
    }
    $allowEdit() {
        return true;
    }
    $allowDelete() {
        return true;
    }
    $allowAccess() {
        return true;
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
}
export default connect(index);