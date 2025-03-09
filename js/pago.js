class Pago {
    constructor() {
        this.totalPagar = JSON.parse(localStorage.getItem('totalPagar')) || 0;
        this.mostrarTotal();
        this.agregarEventos();
    }

    mostrarTotal() {
        document.getElementById('total-amount').value = `s/. ${this.totalPagar}`;
    }

    agregarEventos() {
        document.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();

            
            const nombreTitular = document.getElementById('cardholder-name').value;
            const numeroTarjeta = document.getElementById('card-number').value;
            const fechaExpiracion = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            
            console.log('Pago procesado localmente:');
            console.log('Nombre del Titular:', nombreTitular);
            console.log('Número de Tarjeta:', numeroTarjeta);
            console.log('Fecha de Expiración:', fechaExpiracion);
            console.log('CVV:', cvv);
            console.log('Total a Pagar:', this.totalPagar);

            
            alert('Pago procesado con éxito (localmente).');
            
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Pago();
});


const botonCancelar = document.createElement('button');
botonCancelar.textContent = 'Cancelar';
botonCancelar.style.display = 'block';
botonCancelar.style.marginTop = '1em';
botonCancelar.style.borderRadius = '2em'
botonCancelar.style.backgroundColor = '#000'
botonCancelar.style.color = '#ffff'
botonCancelar.style.cursor = 'pointer'


botonCancelar.addEventListener('click', () => {
    window.location.href = 'carrito.html';
});


document.getElementById('total-amount').parentNode.appendChild(botonCancelar);