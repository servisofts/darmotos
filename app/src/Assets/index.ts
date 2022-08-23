import { SAssets } from 'servisofts-component';

import Logo, { ReactComponent as LogoW } from './svg/logo.svg';


const Assets: SAssets = {
    svg: {
        "Logo": { Native: Logo, Web: LogoW },
    }
}

export default Assets;