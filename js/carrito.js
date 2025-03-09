class Carrito {
    constructor() {
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.mostrarCarrito();
        this.agregarEventos();
    }

    mostrarCarrito() {
        const carritoTienda = document.getElementById('carrito-tienda');
        carritoTienda.innerHTML = '';

        if (this.carrito.length === 0) {
            document.querySelector('.carrigo__vacio').style.display = 'block';
            return;
        }

        document.querySelector('.carrigo__vacio').style.display = 'none';

        this.carrito.forEach((producto, index) => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('carrito-producto');

            const totalProducto = producto.precio * producto.cantidad;

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-producto-imagen">
                <div class="carrito-producto-detalles">
                    <h3 class="carrito-producto-nombre">${producto.nombre}</h3>
                    <p class="carrito-producto-total">Total: s/. ${totalProducto.toFixed(2)}</p>
                    <p class="carrito-producto-cantidad">Cantidad: ${producto.cantidad}</p>
                    <button class="carrito-producto-eliminar" data-index="${index}">Eliminar</button>
                </div>
            `;
            carritoTienda.appendChild(productoDiv);
        });
    }

    agregarEventos() {
        const btnPagar = document.createElement('button');
        btnPagar.textContent = 'Ir a pagar';
        btnPagar.classList.add('carrito-tienda-data-button-pagar');
        document.querySelector('.carrito-cabecera').appendChild(btnPagar);
        const btnVaciar = document.createElement('button');
        btnVaciar.textContent = 'Vaciar carrito';
        btnVaciar.classList.add('carrito-tienda-data-button-vaciar');
        document.querySelector('.carrito-cabecera').appendChild(btnVaciar);

        btnVaciar.addEventListener('click', () => {
            this.carrito = [];
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.mostrarCarrito();
        });

        
        btnPagar.style.cssText = 'margin: 0.625em; padding: 0.625em 1.25em; background-color: #4CAF50; color: white; border: none; border-radius:2em; cursor: pointer;';
        btnVaciar.style.cssText = 'margin: 0.625em; padding: 0.625em 1.25em; background-color: #f44336; color: white; border: none; border-radius: 2em; cursor: pointer;';
        btnVaciar.style.cssText = 'margin: 0.625em; padding: 0.625em 1.25em; background-color: #f44336; color: white; border: none; border-radius: 2em; cursor: pointer;';

        btnPagar.addEventListener('click', () => {
            const totalPagar = this.calcularTotal();
            
            localStorage.setItem('totalPagar', JSON.stringify(totalPagar));
            
            window.location.href = 'pago.html';
        });

        
        const eliminarBtns = document.querySelectorAll('.carrito-producto-eliminar');
        eliminarBtns.forEach(btn => {
            btn.style.cssText = 'margin: 0.625em; padding: 0.625em 1.25em; background-color:rgb(78, 8, 3); color: white; border: none; border-radius: 2em; cursor: pointer;';
        });
        document.getElementById('carrito-tienda').addEventListener('click', (event) => {
            if (event.target.classList.contains('carrito-producto-eliminar')) {
                this.eliminarProducto(event.target.dataset.index);
            }
        });
    }

    eliminarProducto(index) {
        this.carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        this.mostrarCarrito();
    }

    calcularTotal() {
        let total = 0;
        this.carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        return total.toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carrito();
});
