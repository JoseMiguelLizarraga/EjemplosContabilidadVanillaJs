


export class Activo
{
    constructor() 
    {
        this.caja = 0;
        this.clientes = 0;
        this.almacen = 0;  // Esto se usa cuando se trata inventario de productos en bodega, etc. No de efectivo
        this.total = 0;
    }

    incrementarClientes(cantidad) { this.clientes += cantidad; this.calcularTotal(); }
    incrementarAlmacen(cantidad) { this.almacen += cantidad; this.calcularTotal(); }
    incrementarCaja(cantidad) { this.caja += cantidad; this.calcularTotal(); }
    retirarProductoAlmacen(precioComprado) { this.almacen = this.almacen - precioComprado; this.calcularTotal(); }
    calcularTotal() { this.total = this.caja + this.clientes + this.almacen; }
}