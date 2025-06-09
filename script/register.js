function handleRegister(event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // في التطبيق الفعلي: إرسال البيانات إلى الخادم
      document.getElementById('success-msg').textContent = `تم إنشاء الحساب بنجاح، أهلاً ${username}!`;

      // إعادة التوجيه أو الحفظ حسب الحاجة لاحقًا
    }