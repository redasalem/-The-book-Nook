async function handleRegister(event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
    const successMsg = document.getElementById('success-msg');
    
    try {
        const response = await fetch('../account/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            successMsg.textContent = data.message;
            successMsg.style.display = 'block';
            successMsg.style.color = 'green';
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        } else {
            successMsg.textContent = data.message;
            successMsg.style.display = 'block';
            successMsg.style.color = 'red';
        }
    } catch (error) {
        successMsg.textContent = 'حدث خطأ في الاتصال';
        successMsg.style.display = 'block';
        successMsg.style.color = 'red';
    }
    }