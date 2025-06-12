window.onload = async function() {
    try {
        const response = await fetch('../account/getProfile.php');
        const data = await response.json();
        if (data.success && data.data) {
            document.getElementById('username').value = data.data.username;
            document.getElementById('email').value = data.data.email;
            document.getElementById('welcomeMsg').textContent = `${data.data.username} Welocme to our library`;
        } else {
            // إذا لم يكن مسجلاً الدخول، إعادة التوجيه لصفحة الدخول
            window.location.href = '../account/account.html';
        }
    } catch (error) {
        window.location.href = '../account/account.html';
    }
};

function enableEdit() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    
    usernameInput.disabled = false;
    emailInput.disabled = false;
    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';
}

async function saveProfile() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const editMsg = document.getElementById('edit-msg');
    
    try {
        const response = await fetch('../account/updateProfile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            editMsg.textContent = 'تم تحديث الملف الشخصي بنجاح';
            editMsg.className = 'success';
            
            // تحديث رسالة الترحيب
            document.getElementById('welcomeMsg').textContent = `مرحباً ${username}!`;
            
            // إعادة تعطيل الحقول
            document.getElementById('username').disabled = true;
            document.getElementById('email').disabled = true;
            editBtn.style.display = 'block';
            saveBtn.style.display = 'none';
        } else {
            editMsg.textContent = data.message || 'حدث خطأ أثناء تحديث الملف الشخصي';
            editMsg.className = 'error';
        }
    } catch (error) {
        editMsg.textContent = 'حدث خطأ في الاتصال';
        editMsg.className = 'error';
    }
}

function logout() {
    localStorage.removeItem('userEmail');
    window.location.href = '../index.html';
}

function manageSubscriptions() {
    alert("لا توجد اشتراكات مفعلة حالياً.");
}

function viewCart() {
    alert("سلة المشتريات الخاصة بك فارغة حالياً.");
}

function showFavorites() {
    alert("لم تقم بإضافة مفضلات بعد.");
}

function showHistory() {
    alert("لا يوجد تاريخ طلبات.");
}

function showNotifications() {
    alert("لا توجد إشعارات جديدة.");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function support() {
    alert("يرجى التواصل معنا على support@yourbooksite.com.");
}

function deactivateAccount() {
    const confirmDeactivation = confirm("هل أنت متأكد من رغبتك في تعطيل الحساب مؤقتاً؟");
    if (confirmDeactivation) {
        alert("تم تعطيل الحساب مؤقتاً. يمكنك إعادة تفعيله بتسجيل الدخول مرة أخرى.");
    }
}