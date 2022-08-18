import { SPage, SPageListProps } from 'servisofts-component';

import Root from './Root';
import user from './user';
import usuario from './usuario';
import test from './test';
import empresa from './empresa';
import rol from './rol';
import sucursal from './sucursal';
export default SPage.combinePages("/", {
    "": Root,
    ...user,
    ...usuario,
    ...test,
    ...empresa,
    ...rol,
    ...sucursal
});