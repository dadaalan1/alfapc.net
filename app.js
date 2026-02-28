const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const anio = document.getElementById('anio');

if (menuBtn && navLinks) {
	menuBtn.setAttribute('aria-expanded', 'false');
	menuBtn.setAttribute('aria-controls', 'navLinks');
	menuBtn.setAttribute('aria-label', 'Abrir menú');
	menuBtn.innerHTML = '<span></span><span></span><span></span>';

	menuBtn.addEventListener('click', () => {
		navLinks.classList.toggle('activo');
		const menuAbierto = navLinks.classList.contains('activo');
		menuBtn.classList.toggle('abierto', menuAbierto);
		menuBtn.setAttribute('aria-expanded', menuAbierto ? 'true' : 'false');
		menuBtn.setAttribute('aria-label', menuAbierto ? 'Cerrar menú' : 'Abrir menú');
	});

	navLinks.querySelectorAll('a').forEach((enlace) => {
		enlace.addEventListener('click', () => {
			navLinks.classList.remove('activo');
			menuBtn.classList.remove('abierto');
			menuBtn.setAttribute('aria-expanded', 'false');
			menuBtn.setAttribute('aria-label', 'Abrir menú');
		});
	});
}

if (anio) {
	anio.textContent = new Date().getFullYear();
}

if (navLinks) {
	const rutaActual = window.location.pathname.split('/').pop() || 'index.html';

	navLinks.querySelectorAll('a').forEach((enlace) => {
		const href = enlace.getAttribute('href') || '';
		if (!href || href.startsWith('http') || href.startsWith('#')) {
			return;
		}

		if (href === rutaActual || (rutaActual === '' && href === 'index.html')) {
			enlace.classList.add('activo-pagina');
			enlace.setAttribute('aria-current', 'page');
		}
	});
}
