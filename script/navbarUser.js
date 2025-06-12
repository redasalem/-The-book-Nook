window.addEventListener('DOMContentLoaded', function() {
    showUserInfoNavbar();
});

async function showUserInfoNavbar() {
    const navbarDiv = document.getElementById('user-info-navbar');
    if (!navbarDiv) return;
    try {
        const response = await fetch('/book%202/account/getProfile.php');
        const data = await response.json();
        if (data.success && data.data && data.data.username) {
            navbarDiv.innerHTML = `
                <span class="me-2"><i class="fas fa-user-circle"></i> ${data.data.username}</span>
                <a href="/book%202/account/profilePage.html" class="btn btn-outline-primary ms-2">الملف الشخصي</a>
                <button onclick="logoutNavbar()" class="btn btn-danger ms-2">خروج</button>
            `;
        } else {
            navbarDiv.innerHTML = `<a href="/book%202/account/account.html" class="btn btn-primary text-white">الحساب</a>`;
        }
    } catch (error) {
        navbarDiv.innerHTML = `<a href="/book%202/account/account.html" class="btn btn-primary text-white">الحساب</a>`;
    }
}

async function logoutNavbar() {
    await fetch('/book%202/account/logout.php');
    window.location.reload();
}