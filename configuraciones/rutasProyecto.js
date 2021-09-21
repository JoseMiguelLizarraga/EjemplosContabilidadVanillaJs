

import { Inicio } from "../componentes/inicio/inicio.js";
import { BalanceGeneral } from "../componentes/balanceGeneral/balanceGeneral.js";
import { EstadoDeResultadoComponent } from "../componentes/estadoDeResultado/estadoDeResultado.js";
import { AsientoContable1 } from "../componentes/asientoContable1/asientoContable1.js";
import { AsientoContable2 } from "../componentes/asientoContable1/asientoContable2.js";


export const rutasProyecto = [
    {nombre: "inicio", componente: Inicio, default: true},
    {nombre: "balanceGeneral", componente: BalanceGeneral},
    {nombre: "estadoDeResultado", componente: EstadoDeResultadoComponent},
    {nombre: "asientoContable1", componente: AsientoContable1},
    {nombre: "asientoContable2", componente: AsientoContable2}
];






