document.addEventListener('DOMContentLoaded', () => {
    const botao = document.querySelector('#password-toggle');
    botao.addEventListener('click', () => togglePassword());
});

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = "images/mostra_senha.png";
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = "images/esconde_senha.png";
    }
}