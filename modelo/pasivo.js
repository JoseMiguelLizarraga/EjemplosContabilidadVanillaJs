

export class Pasivo
{
    constructor()
    {
        this.proveedores = 0;
        this.creditoBancario = 0;
        this.total = 0;
    }

    incrementarCreditoBancario(cantidad) { this.creditoBancario += cantidad; this.calcularTotal(); }
    incrementarProveedores(cantidad) { this.proveedores += cantidad; this.calcularTotal(); }
    calcularTotal() { this.total = this.proveedores + this.creditoBancario; }
}