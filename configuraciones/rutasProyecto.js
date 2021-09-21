

import { Inicio } from "../componentes/inicio/inicio.js";
import { BalanceGeneral } from "../componentes/balanceGeneral/balanceGeneral.js";
import { EstadoDeResultadoComponent } from "../componentes/estadoDeResultado/estadoDeResultado.js";


export const rutasProyecto = [
    {nombre: "inicio", componente: Inicio, default: true},
    {nombre: "balanceGeneral", componente: BalanceGeneral},
    {nombre: "estadoDeResultado", componente: EstadoDeResultadoComponent}
];






