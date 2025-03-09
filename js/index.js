class Index {
    constructor() {
        this.mostrarBienvenida();
        this.manejarCierreSesion(); 
    }

    mostrarBienvenida() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        if (usuarioActual) {
            const mensajeBienvenida = `Bienvenido ${usuarioActual.usuario}`;
            const bienvenidaElement = document.createElement('span');
            bienvenidaElement.textContent = mensajeBienvenida;
            bienvenidaElement.style.fontFamily = 'Poppins'; 
            bienvenidaElement.style.fontSize = '1.3125em'; 
            bienvenidaElement.style.color = '#fff';     

            const mediaQuery = window.matchMedia('(max-width: 600px)');
            const handleMediaQueryChange = (e) => {
                if (e.matches) {
                    bienvenidaElement.style.color = '#000';
                } else {
                    bienvenidaElement.style.color = '#fff';
                }
            };

            mediaQuery.addListener(handleMediaQueryChange);
            handleMediaQueryChange(mediaQuery);
            bienvenidaElement.style.fontWeight = 'bold'; 
            bienvenidaElement.style.position = 'absolute';
            bienvenidaElement.style.top = '0.625em'; 
            bienvenidaElement.style.right = '0.625em';
    
            document.body.appendChild(bienvenidaElement);
        }
    }

    manejarCierreSesion() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        const enlaceSesion = document.getElementById('enlaceSesion');

        if (usuarioActual) {
            enlaceSesion.textContent = 'Cerrar Sesión';
            enlaceSesion.addEventListener('click', (event) => {
                event.preventDefault();

                if (confirm('¿Seguro que quieres cerrar sesión?')) {
                    this.cerrarSesion();
                }
            });
        } else {
            enlaceSesion.textContent = 'Iniciar Sesión';
            enlaceSesion.href = '/sesion.html';
        }
    }

    cerrarSesion() {
        
        localStorage.removeItem('usuarioActual');

        
        window.location.href = '/sesion.html'; 

        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Index();
});