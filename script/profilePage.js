   // نصوص الترحيب بالألماني والإيطالي مع إيموجي
    // رسائل الترحيب: ألماني، إسباني، فرنسي + إيموجي
const messages = [
  "Willkommen, Meister! 🚀✨\nLass uns mit den Büchern starten!",
  "¡Bienvenido, lector! 📚😄\n¡Hora de explorar historias nuevas!",
  "Bienvenue, ami! 🇫🇷📖\nPlongeons dans les livres magiques!"
];

    const welcomeEl = document.getElementById('welcomeMsg');
    let msgIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeAndDelete() {
      const currentMessage = messages[msgIndex];
      if (!deleting) {
        charIndex++;
        welcomeEl.textContent = currentMessage.slice(0, charIndex);
        if (charIndex === currentMessage.length) {
          deleting = true;
          setTimeout(typeAndDelete, 1500);
        } else {
          setTimeout(typeAndDelete, 120);
        }
      } else {
        charIndex--;
        welcomeEl.textContent = currentMessage.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          msgIndex = (msgIndex + 1) % messages.length;
          setTimeout(typeAndDelete, 800);
        } else {
          setTimeout(typeAndDelete, 60);
        }
      }
    }

    typeAndDelete();

    function logout() {
      localStorage.removeItem('userEmail');
      window.location.href = 'index.html';
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