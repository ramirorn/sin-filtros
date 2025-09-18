// Funcionalidad básica para el calendario
document.addEventListener('DOMContentLoaded', function () {
	// Simular funcionalidad de los días con metas
	const daysWithGoals = document.querySelectorAll('.calendar-day.has-goal');

	daysWithGoals.forEach((day) => {
		day.addEventListener('click', function () {
			const dayNumber = this.querySelector('.day-number').textContent;
			alert(`Has hecho clic en el día ${dayNumber}. Aquí podrías editar tu meta.`);
		});
	});

	// Simular envío del formulario
	const form = document.querySelector('form');
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		alert('Meta guardada correctamente. Te notificaremos cuando se acerque la fecha.');
	});
});
document.addEventListener('DOMContentLoaded', function () {
	// Elementos del DOM
	const loginTab = document.getElementById('login-tab');
	const registerTab = document.getElementById('register-tab');
	const loginForm = document.getElementById('login-form');
	const registerForm = document.getElementById('register-form');
	const authFooterText = document.getElementById('auth-footer-text');
	const switchToRegister = document.getElementById('switch-to-register');
	const switchToLogin = document.createElement('a');

	// Configurar el texto del pie de página
	authFooterText.innerHTML =
		'¿No tienes una cuenta? <a href="#" id="switch-to-register">Regístrate ahora</a>';
	switchToRegister.addEventListener('click', function (e) {
		e.preventDefault();
		showRegisterForm();
	});

	// Crear enlace para cambiar a inicio de sesión
	switchToLogin.href = '#';
	switchToLogin.innerHTML = 'Inicia sesión aquí';
	switchToLogin.addEventListener('click', function (e) {
		e.preventDefault();
		showLoginForm();
	});

	// Funciones para cambiar entre formularios
	function showLoginForm() {
		loginTab.classList.add('active');
		registerTab.classList.remove('active');
		loginForm.classList.add('active');
		registerForm.classList.remove('active');
		authFooterText.innerHTML =
			'¿No tienes una cuenta? <a href="#" id="switch-to-register">Regístrate ahora</a>';
		document.getElementById('switch-to-register').addEventListener('click', function (e) {
			e.preventDefault();
			showRegisterForm();
		});
	}

	function showRegisterForm() {
		loginTab.classList.remove('active');
		registerTab.classList.add('active');
		loginForm.classList.remove('active');
		registerForm.classList.add('active');
		authFooterText.innerHTML =
			'¿Ya tienes una cuenta? <a href="#" id="switch-to-login">Inicia sesión aquí</a>';
		document.getElementById('switch-to-login').addEventListener('click', function (e) {
			e.preventDefault();
			showLoginForm();
		});
	}

	// Event listeners para las pestañas
	loginTab.addEventListener('click', showLoginForm);
	registerTab.addEventListener('click', showRegisterForm);

	// Alternar visibilidad de contraseña
	document.getElementById('toggle-login-password').addEventListener('click', function () {
		const passwordInput = document.getElementById('login-password');
		togglePasswordVisibility(passwordInput, this);
	});

	document
		.getElementById('toggle-register-password')
		.addEventListener('click', function () {
			const passwordInput = document.getElementById('register-password');
			togglePasswordVisibility(passwordInput, this);
		});

	function togglePasswordVisibility(input, toggle) {
		if (input.type === 'password') {
			input.type = 'text';
			toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
		} else {
			input.type = 'password';
			toggle.innerHTML = '<i class="fas fa-eye"></i>';
		}
	}

	// Validar formulario de inicio de sesión
	loginForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const email = document.getElementById('login-email').value;
		const password = document.getElementById('login-password').value;
		const rememberMe = document.getElementById('remember').checked;

		// Simulación de validación
		if (email === 'usuario@ejemplo.com' && password === 'password123') {
			// Credenciales correctas
			document.getElementById('login-error-message').style.display = 'none';

			// Simular inicio de sesión exitoso
			alert('¡Inicio de sesión exitoso! Redirigiendo...');

			// Si el usuario seleccionó "Mantenerme conectado"
			if (rememberMe) {
				localStorage.setItem('rememberMe', 'true');
				localStorage.setItem('userEmail', email);
			} else {
				localStorage.removeItem('rememberMe');
				localStorage.removeItem('userEmail');
			}
		} else {
			// Credenciales incorrectas
			const errorMessage = document.getElementById('login-error-message');
			errorMessage.style.display = 'block';

			// Efecto de sacudida para el formulario
			loginForm.classList.add('animate__animated', 'animate__headShake');
			setTimeout(() => {
				loginForm.classList.remove('animate__animated', 'animate__headShake');
			}, 1000);
		}
	});

	// Validar formulario de registro
	registerForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const name = document.getElementById('register-name').value;
		const lastname = document.getElementById('register-lastname').value;
		const email = document.getElementById('register-email').value;
		const password = document.getElementById('register-password').value;
		const confirmPassword = document.getElementById('register-confirm-password').value;

		// Validaciones básicas
		if (password !== confirmPassword) {
			document.getElementById('register-error-text').textContent =
				'Las contraseñas no coinciden.';
			document.getElementById('register-error-message').style.display = 'block';
			document.getElementById('register-success-message').style.display = 'none';
			return;
		}

		if (password.length < 8) {
			document.getElementById('register-error-text').textContent =
				'La contraseña debe tener al menos 8 caracteres.';
			document.getElementById('register-error-message').style.display = 'block';
			document.getElementById('register-success-message').style.display = 'none';
			return;
		}

		// Simular registro exitoso
		document.getElementById('register-error-message').style.display = 'none';
		document.getElementById('register-success-message').style.display = 'block';

		// Limpiar formulario después de 2 segundos y cambiar a login
		setTimeout(() => {
			registerForm.reset();
			showLoginForm();
			document.getElementById('login-email').value = email;
		}, 2000);
	});

	// Recuperar contraseña
	document.getElementById('forgot-password').addEventListener('click', function (e) {
		e.preventDefault();
		const email = prompt(
			'Por favor, introduce tu correo electrónico para recuperar tu contraseña:',
		);

		if (email) {
			alert(`Se ha enviado un enlace de recuperación a: ${email}`);
		}
	});

	// Comprobar si hay credenciales guardadas
	if (localStorage.getItem('rememberMe') === 'true') {
		const savedEmail = localStorage.getItem('userEmail');
		if (savedEmail) {
			document.getElementById('login-email').value = savedEmail;
			document.getElementById('remember').checked = true;
		}
	}
});
