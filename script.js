// 获取表单和各输入框元素
const form = document.getElementById('register-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// 邮箱格式正则
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 显示错误：加红色边框，并在输入框下方显示错误文字
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('valid');
    formGroup.classList.add('invalid');
    formGroup.querySelector('.error-message').textContent = message;
}

// 显示通过：加绿色边框，清空错误文字
function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('invalid');
    formGroup.classList.add('valid');
    formGroup.querySelector('.error-message').textContent = '';
}

// 必填项检查：内容为空则报 xxx is required
function checkRequired(input) {
    if (input.value.trim() === '') {
        const label = input.closest('.form-group').querySelector('label').textContent;
        showError(input, label + ' is required');
        return false;
    }
    return true;
}

// 邮箱格式检查
function checkEmail(input) {
    if (!emailPattern.test(input.value.trim())) {
        showError(input, 'Invalid email format');
        return false;
    }
    return true;
}

// 校验单个输入框（空值 -> 必填提示；邮箱 -> 格式提示）
function validateField(input) {
    if (!checkRequired(input)) {
        return false;
    }
    if (input === email && !checkEmail(input)) {
        return false;
    }
    showSuccess(input);
    return true;
}

// 提交表单：阻止默认行为，逐项校验
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isUsernameValid = validateField(username);
    const isEmailValid = validateField(email);
    const isPasswordValid = validateField(password);
    const isConfirmValid = validateField(confirmPassword);

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
        alert('Registration successful!');
    }
});
