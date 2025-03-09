class DetalleProducto {
    constructor() {
        this.producto = JSON.parse(localStorage.getItem('productoSeleccionado'));
        if (!this.producto) {
            window.location.href = 'tienda.html'; 
            return;
        }
        this.mostrarDetalles();
        this.agregarEventos();
    }

    mostrarDetalles() {
        document.getElementById('imagentienda').src = this.producto.imagen;
        document.getElementById('nombretienda').textContent = this.producto.nombre;
        document.getElementById('descripcionPtienda').textContent = this.producto.descripcion;
        document.getElementById('categoriatienda').textContent = this.producto.categoria;
        document.getElementById('preciotienda').textContent = 's/.' + this.producto.precio;
        this.calcularTotal();
    }

    agregarEventos() {
        document.getElementById('cantidad').addEventListener('input', () => this.calcularTotal());
        document.getElementById('btnCancelar').addEventListener('click', () => window.location.href = 'tienda.html');
        document.getElementById('btnAgregar').addEventListener('click', () => this.agregarAlCarrito());
    }

    agregarAlCarrito() {
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const producto = { ...this.producto, cantidad };

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        window.location.href = 'carrito.html';
    }

    calcularTotal() {
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const precio = parseFloat(this.producto.precio);
        const total = cantidad * precio;
        document.getElementById('totaltienda').textContent = 's/.' + total.toFixed(2);
    }
}

    

document.addEventListener('DOMContentLoaded', () => {
    new DetalleProducto();
});