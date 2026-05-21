// Escucha el evento de scroll en toda la ventana
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    
    // Si el usuario baja más de 50 píxeles, aplica la clase del fondo oscuro
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        // Si vuelve arriba, regresa a la variante transparente
        nav.classList.remove('scrolled');
    }
});