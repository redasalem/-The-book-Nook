async function handleLogin(event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorMsg = document.getElementById('error-msg');

    try {
        const response = await fetch('../account/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            window.location.href = '../index.html'; // Redirect to home page after successful login
        } else {
            errorMsg.textContent = data.message;
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        errorMsg.textContent = 'حدث خطأ في الاتصال';
        errorMsg.style.display = 'block';
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