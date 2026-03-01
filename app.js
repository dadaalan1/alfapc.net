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
	const normalizarRuta = (ruta) => {
		let rutaLimpia = decodeURIComponent((ruta || '').trim()).toLowerCase();
		rutaLimpia = rutaLimpia.split('?')[0].split('#')[0];

		if (!rutaLimpia || rutaLimpia === '/') {
			return 'index';
		}

		const segmentos = rutaLimpia.split('/').filter(Boolean);
		let ultimoSegmento = segmentos[segmentos.length - 1] || 'index';

		if (!ultimoSegmento || ultimoSegmento === '/') {
			ultimoSegmento = 'index';
		}

		if (ultimoSegmento.endsWith('/')) {
			ultimoSegmento = ultimoSegmento.slice(0, -1);
		}

		if (!ultimoSegmento || ultimoSegmento === '') {
			ultimoSegmento = 'index';
		}

		return ultimoSegmento.replace(/\.html?$/, '') || 'index';
	};

	const rutaActual = normalizarRuta(window.location.pathname);

	navLinks.querySelectorAll('a').forEach((enlace) => {
		const href = enlace.getAttribute('href') || '';
		if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
			return;
		}

		let destino;
		try {
			destino = new URL(href, window.location.href);
		} catch {
			return;
		}

		if (destino.origin !== window.location.origin) {
			return;
		}

		const rutaEnlace = normalizarRuta(destino.pathname);

		if (rutaEnlace === rutaActual) {
			enlace.classList.add('activo-pagina');
			enlace.setAttribute('aria-current', 'page');
		}
	});
}
