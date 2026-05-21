async function loadContent() {
    const app = document.getElementById('app');
    
    // 1. Obtenemos el hash de la URL (ej: '#inicio'). Si no hay ninguno, forzamos '#inicio'
    let hash = window.location.hash;
    if (!hash) {
        hash = '#inicio';
    }
    
    // 2. Le quitamos el '#' para obtener solo el nombre de la sección
    const name = hash.substring(1); // Esto nos da 'inicio', 'servicio', etc.
    const folder = `${name}-component`;
    
    try {
        // 3. Cargar el HTML del componente
        const response = await fetch(`views/${folder}/${name}.html`);
        if (!response.ok) throw new Error(`No se pudo cargar: views/${folder}/${name}.html`);
        
        const html = await response.text();
        app.innerHTML = html;

        // 4. Manejo de CSS dinámico
        const oldLink = document.getElementById('dynamic-css');
        if (oldLink) oldLink.remove();

        const link = document.createElement('link');
        link.id = 'dynamic-css';
        link.rel = 'stylesheet';
        link.href = `views/${folder}/${name}.css`;
        document.head.appendChild(link);

        // 5. Actualizar la clase 'active' en el menú de navegación
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // 6. Regresar la barra de desplazamiento arriba al cambiar de página
        window.scrollTo(0, 0);

    } catch (error) {
        console.error("Error de enrutamiento:", error);
        // Si hay error, mostramos un mensaje para no dejar la pantalla en negro
        app.innerHTML = `<h1 style='color:white; text-align:center; padding-top: 150px;'>Error 404: Sección no encontrada</h1>`;
    }
}

// Escuchar cada vez que el hash cambie (cuando el usuario hace clic en el menú)
window.addEventListener('hashchange', loadContent);

// Carga inicial al refrescar o entrar a la página
window.onload = loadContent;