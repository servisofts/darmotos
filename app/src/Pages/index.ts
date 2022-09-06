import { SPage, SPageListProps } from 'servisofts-component';

import Root from './root';
import login from './login';
import profile from './profile';
import usuario from './usuario';
import empresa from './empresa';
import rol from './rol';
import contabilidad from './contabilidad';

import sucursal from './sucursal';
import inventario from './inventario';
import ajustes from './ajustes';
import banco from './banco';
import test from './test';
export default SPage.combinePages("/", {
    "": Root,
    "login": login,
    "profile": profile,
    "test":test,
    ...usuario,
    ...empresa,
    ...rol,
    ...sucursal,
    ...contabilidad,
    ...inventario,
    ...ajustes,
    ...banco,
    
});