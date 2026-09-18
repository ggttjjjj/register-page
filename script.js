// 获取表单和各输入框元素
const form = document.getElementById('register-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const successMessage = document.getElementById('success-message');

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

// 两次密码一致性检查
function checkPasswordsMatch(passwordInput, confirmInput) {
    if (passwordInput.value !== confirmInput.value) {
        showError(confirmInput, 'Passwords do not match');
        return false;
    }
    return true;
}

// 校验单个输入框（空值 -> 必填提示；邮箱 -> 格式提示；确认密码 -> 一致性提示）
function validateField(input) {
    if (!checkRequired(input)) {
        return false;
    }
    if (input === email && !checkEmail(input)) {
        return false;
    }
    if (input === confirmPassword && !checkPasswordsMatch(password, confirmPassword)) {
        return false;
    }
    showSuccess(input);
    return true;
}

// 失焦时立即校验当前输入框；已报错的框在输入过程中实时重新校验
const inputs = [username, email, password, confirmPassword];
inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
        validateField(input);
    });
    input.addEventListener('input', function () {
        const formGroup = input.closest('.form-group');
        if (formGroup.classList.contains('invalid')) {
            validateField(input);
        }
        // 密码修改后，如果确认密码已填写，同步重新校验一致性
        if (input === password && confirmPassword.value.trim() !== '') {
            validateField(confirmPassword);
        }
    });
});

// 提交表单：阻止默认行为，逐项校验
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isUsernameValid = validateField(username);
    const isEmailValid = validateField(email);
    const isPasswordValid = validateField(password);
    const isConfirmValid = validateField(confirmPassword);

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
        // 注册成功：页面上方显示成功提示，并弹出提示框
        successMessage.classList.add('show');
        alert('Registration successful!');
        form.reset();
        inputs.forEach(function (input) {
            input.closest('.form-group').classList.remove('valid', 'invalid');
        });
    } else {
        successMessage.classList.remove('show');
    }
});

// 点击眼睛图标切换密码的显示/隐藏
document.querySelectorAll('.toggle-password').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
        const target = document.getElementById(toggle.dataset.target);
        const isHidden = target.type === 'password';
        target.type = isHidden ? 'text' : 'password';
        toggle.textContent = isHidden ? '🙈' : '👁';
    });
});
