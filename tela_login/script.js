document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const botao = document.querySelector('#password-toggle');
    botao.addEventListener('click', () => togglePassword());
    botao.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            event.preventDefault();
            togglePassword();
        } else if (event.key === 'Enter') {
            const form = botao.closest('form');
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.click();
        }
    });

    document.querySelector('#remember').addEventListener('keydown', function (event) {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this.checked = !this.checked;
        }
    });

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const form = document.querySelector('form');

    // Function to show an error
    function showError(input, message) {
        input.style.borderColor = 'red';
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.classList.add('error-message');
            input.insertAdjacentElement('afterend', error);
        }
        error.textContent = message;
    }

    // Function to clear error
    function clearError(input) {
        input.style.borderColor = '';
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.remove();
        }
    }

    // Validate email
    function validateEmail() {
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'O campo de e-mail é obrigatório.');
        } else {
            clearError(emailInput);
        }
    }

    // Validate password
    function validatePassword() {
        const simbolo_password = document.querySelector('#password-toggle');
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'O campo de senha é obrigatório.');
            simbolo_password.style.top = '50%';
        } else {
            clearError(passwordInput);
            simbolo_password.style.top = '65%';
        }
    }

    // Add blur event listeners for validation
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    // Form submission validation
    form.addEventListener('submit', (event) => {
        validateEmail();
        validatePassword();

        const hasErrors = form.querySelectorAll('.error-message').length > 0;
        if (hasErrors) {
            event.preventDefault();
        }
    });
});

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = "../images/esconde_senha.svg";
        toggleIcon.setAttribute('data-bs-title', 'Esconder senha');
        toggleIcon.setAttribute('aria-label', 'Esconder senha');
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = "../images/mostra_senha.svg";
        toggleIcon.setAttribute('data-bs-title', 'Mostrar senha');
        toggleIcon.setAttribute('aria-label', 'Mostrar senha');
    }

    const tooltipInstance = bootstrap.Tooltip.getInstance(toggleIcon);
    tooltipInstance.dispose();
    new bootstrap.Tooltip(toggleIcon);
}
