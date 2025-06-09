function handleLogin(event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      const errorMsg = document.getElementById('error-msg');

      if (email === 'example@mail.com' && password === '123456') {
        if (remember) {
          localStorage.setItem('userEmail', email);
        } else {
          localStorage.removeItem('userEmail');
        }
        window.location.href = 'account.html'; // صفحة الحساب
      } else {
        errorMsg.textContent = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      }
    }

    // تعبئة البريد إذا تم حفظه سابقًا
    window.onload = function () {
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
      }
    }