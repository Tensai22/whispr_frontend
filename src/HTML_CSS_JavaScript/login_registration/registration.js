function goBack() {
    window.history.back();
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают.');
        return;
    }
    alert('Регистрация успешна!');
});
