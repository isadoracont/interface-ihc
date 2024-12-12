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
            error.setAttribute('role', 'alert');
            error.setAttribute('aria-live', 'polite');
            input.insertAdjacentElement('afterend', error);
        }
        // Create the SVG icon
        const svgIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 16 16" width="13" height="13" data-icon="CircleXSmall" aria-hidden="true" class="default-ltr-cache-0 e1vkmu651">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor"></path>
            </svg>`;

        // Update the error message content
        error.innerHTML = `${svgIcon} <span>${message}</span>`;
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

        const errors = form.querySelectorAll('.error-message');
        if (errors.length > 0) {
            event.preventDefault();
            const firstError = errors[0];
            const inputAbove = firstError.previousElementSibling;
            if (inputAbove && inputAbove.tagName === 'INPUT') {
                inputAbove.focus();
            }
        }
    });
});

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const botao = document.querySelector('#password-toggle');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = "img/esconde_senha.svg";
        botao.setAttribute('data-bs-title', 'Esconder senha');
        botao.setAttribute('aria-label', 'Esconder senha');
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = "img/mostra_senha.svg";
        botao.setAttribute('data-bs-title', 'Mostrar senha');
        botao.setAttribute('aria-label', 'Mostrar senha');
    }

    const tooltipInstance = bootstrap.Tooltip.getInstance(botao);
    tooltipInstance.dispose();
    new bootstrap.Tooltip(botao);
}
