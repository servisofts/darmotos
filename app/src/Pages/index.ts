import { SPage, SPageListProps } from 'servisofts-component';

import Root from './root';
import login from './login';
import profile from './profile';
import usuario from './usuario';
import test from './test';
import empresa from './empresa';
import rol from './rol';
import sucursal from './sucursal';
import inventario from './inventario';
import ajustes from './ajustes';
export default SPage.combinePages("/", {
    "": Root,
    "login": login,
    "profile": profile,
    ...usuario,
    ...test,
    ...empresa,
    ...rol,
    ...sucursal,
    ...inventario,
    ...ajustes
});