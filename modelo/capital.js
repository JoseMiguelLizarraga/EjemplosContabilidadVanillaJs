

export class Capital
{
    constructor()
    {
        this.capitalSocial = 0;
        this.resultadoEjercicio = 0;
        this.total = 0;
    }

    incrementarCapitalSocial(cantidad) { this.capitalSocial += cantidad; this.calcularTotal(); }
    incrementarResultadoEjercicio(cantidad) { this.resultadoEjercicio += cantidad; this.calcularTotal(); }
    calcularTotal() { this.total = this.capitalSocial + this.resultadoEjercicio; }
}