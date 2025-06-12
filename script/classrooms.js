window.onload = function() {
    loadClassrooms();
};

async function loadClassrooms() {
    try {
        const response = await fetch('../classrooms/getClassrooms.php');
        const data = await response.json();

        const container = document.getElementById('booksContainer');
        container.innerHTML = '';

        if (data.success && data.data.length > 0) {
            data.data.forEach(classroom => {
                container.innerHTML += `
                    <div class="col-md-4 col-lg-3">
                        <div class="card h-100 text-center p-4">
                            <h5 class="card-title">${classroom.name}</h5>
                        </div>
                    </div>
                `;
            });
        } else {
            container.innerHTML = `<p class="text-danger">لا توجد صفوف دراسية مسجلة.</p>`;
        }
    } catch (error) {
        document.getElementById('booksContainer').innerHTML = `<p class="text-danger">حدث خطأ في الاتصال.</p>`;
    }
} 