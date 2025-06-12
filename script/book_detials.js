// بيانات الكتب
const books = [
  {
    id: 1,
    title: " مع النبى",
    author: "ادهم شرقاوي",
    image: "../images/book_1.jpg",
    pdfUrl: "../books_pdf/1pLsqNJHRw9gTw7fOoBPnhRwmgetOF_4q.pdf",
    isFree: true,
    dateAdded: "2025-05-20",
     category: "الفلسفة",
  },
  {
    id: 2,
    title: "ليطمئن قلبى",
    author: "ادهم شرقاوي",
    image: "../images/book_2.jpg",
    pdfUrl: "../books_pdf/bnr141-1.pdf",
    isFree: true,
    dateAdded: "2025-05-27",
     category: "الروايات"
  },
  {
    id: 3,
    title: "ابق قويا",
    author: "ديمي لوفاتو",
    image: "../images/book_3.jpg",
    pdfUrl: "../books_pdf/bnr21-1.pdf",
    isFree: true,
    dateAdded: "2025-05-29",
      category: "تنمية ذاتية", // إضافة القسم

  },
  {
    id: 4,
    title: " كن لنفسك",
    author: "عمار الشمري",
    image: "../images/book_4.jpg",
    pdfUrl: "../books_pdf/bnr21-1.pdf",
    isFree: false,
    dateAdded: "2025-05-29",
      category: "الروايات", // إضافة القسم
  },
  {
    id: 5,
    title: " ما بين الوحده واحلام الهدر",
    author: "رغد نايف الحربي",
    image: "../images/book_5.jpg",
    pdfUrl: "../books_pdf/bnr21-1.pdf",
    isFree: true,
    dateAdded: "2025-05-29",
    category: "الشعر", // إضافة القسم
  },
  {
    id: 6,
    title: " السيدة التي حسبت نفسها سوسة",
    author: "شيماء هشام سعد",
    image: "../images/book_8.jpg",
    pdfUrl: "../books_pdf/bnr21-1.pdf",
    isFree: false,
    dateAdded: "2025-05-29",
    category: "الروايات", // إضافة القسم
  },
  {
    id: 7,
    title: " كبرت و نسيت ان انسى",
    author: "بثينه العيسي",
    image: "../images/book_7.jpg",
    pdfUrl: "../books_pdf/bnr21-1.pdf",
    isFree: true,
    dateAdded: "2025-05-29",
     category: "الروايات", // إضافة القسم
  },
  {
    id: 8,
    title: " مكتبة ساحة الاعشاب",
    author: "ايريك دو كيرميل",
    image: "../images/book_6.jpg",
    pdfUrl: "../books_pdf/bnr21-1.pdf",
    isFree: false,
    dateAdded: "2025-05-29",
     category: "الفلسفة", // إضافة القسم
  },
  // يمكنك إضافة المزيد من الكتب هنا
];

// دالة إنشاء بطاقة كتاب
function createBookCard(book) {
  return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card book-card">
                <div class="position-relative">
                <div class="card-image">
                    <img src="${book.image}" class="card-img-top" alt="${
    book.title
  }">
   </div>
                    <span class="position-absolute top-0 end-0 m-2 badge ${
                      book.isFree ? "bg-primary" : "bg-warning"
                    }">
                        ${book.isFree ? "مجاني" : "مدفوع"}
                    </span>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author}</p>
                    ${
                      book.isFree
                        ? `<a href="${book.pdfUrl}" class="btn btn-primary w-100" download>
                            <i class="fas fa-download ms-2"></i>
                            تحميل
                        </a>`
                        : `<button class="btn btn-secondary w-100" disabled>
                            <i class="fas fa-lock ms-2"></i>
                            يتطلب شراء
                        </button>`
                    }
                </div>
            </div>
        </div>
    `;
}

// Global variables
let currentCategory = null;
let currentAuthor = null;
let currentSearch = null;
let isNewOnly = false;

// Load books when page loads
// window.onload = function() {
//     loadBooks();
//     setupEventListeners();
// };

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(function() {
        currentSearch = this.value;
        loadBooks();
    }, 500));

    // Search button
    document.getElementById('searchBtn').addEventListener('click', function() {
        currentSearch = searchInput.value;
        loadBooks();
    });

    // Category filter
    document.querySelectorAll('[data-filter]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            if (this.closest('.dropdown-menu').previousElementSibling.textContent.includes('الأقسام')) {
                currentCategory = filter;
                currentAuthor = null;
            } else {
                currentAuthor = filter;
                currentCategory = null;
            }
            loadBooks();
        });
    });

    // New books link
    // document.getElementById('newBooksLink').addEventListener('click', function(e) {
    //     e.preventDefault();
    //     isNewOnly = true;
    //     loadBooks();
    // });
}

// Load books from server
async function loadBooks() {
    try {
        const response = await fetch('../bookDetials/getBooks.php');
        const data = await response.json();

        const container = document.getElementById('booksContainer');
        container.innerHTML = '';

        if (data.success && data.data.length > 0) {
            data.data.forEach(book => {
                container.innerHTML += `
                    <div class="col-md-4 col-lg-3">
                        <div class="card h-100">
                            <img src="${book.image_url || '/images/default-book.jpg'}" class="card-img-top" alt="${book.title}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">${book.author}</p>
                                <p class="card-text">${book.category}</p>
                                <p class="card-text"><strong>السعر: ${book.price || 'غير محدد'} ريال</strong></p>
                                ${book.pdf_url ? `
                                    <a href="${book.pdf_url}" class="btn btn-primary w-100" download>
                                        <i class="fas fa-download ms-2"></i>
                                        تحميل
                                    </a>
                                ` : `
                                    <button class="btn btn-secondary w-100" disabled>
                                        <i class="fas fa-lock ms-2"></i>
                                        يتطلب شراء
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            container.innerHTML = `<p class="text-danger">لا توجد كتب مسجلة.</p>`;
        }
    } catch (error) {
        document.getElementById('booksContainer').innerHTML = `<p class="text-danger">حدث خطأ في الاتصال.</p>`;
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add to cart function (to be implemented)
function addToCart(bookId) {
    alert('سيتم إضافة الكتاب إلى السلة قريباً');
}

// تفعيل الفلاتر
document.querySelectorAll(".filter-item").forEach((filter) => {
  filter.addEventListener("click", (e) => {
    const filterType = e.target.dataset.filter;
    let filteredBooks = books;

    if (filterType === "free") {
      filteredBooks = books.filter((book) => book.isFree);
    } else if (filterType === "recent") {
      filteredBooks = [...books].sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
      );
    } else if (filterType === "الفلسفة") {
      filteredBooks = books.filter((book) => book.category === "الفلسفة");
    }
     else if (filterType === "الروايات") {
      filteredBooks = books.filter((book) => book.category === "الروايات");
    }
     else if (filterType === "الشعر") {
      filteredBooks = books.filter((book) => book.category === "الشعر");
    }
     else if (filterType === "اللغات") {
      filteredBooks = books.filter((book) => book.category === "اللغات");
    }
     else if (filterType === "العلوم") {
      filteredBooks = books.filter((book) => book.category === "العلوم");
    }
     else if (filterType === "البرمجة") {
      filteredBooks = books.filter((book) => book.category === "البرمجة");
    }

    document
      .querySelectorAll(".filter-item")
      .forEach((f) => f.classList.remove("active"));
    e.target.classList.add("active");
    displayBooks(filteredBooks);
  });
});


// عرض الكتب عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => displayBooks());


// تفعيل البحث

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const booksContainer = document.getElementById("booksContainer");
const suggestionsList = document.getElementById("suggestionsList"); // إضافة هذا السطر

// ...existing code...

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().startsWith(searchTerm) ||
      book.author.toLowerCase().startsWith(searchTerm)
  );

  displaySuggestions(filteredBooks); // استبدال عرض الكتب بعرض الاقتراحات
}

function displaySuggestions(suggestions) {
  suggestionsList.innerHTML = ""; // مسح الاقتراحات السابقة

  if (suggestions.length > 0) {
    suggestions.forEach((book) => {
      const li = document.createElement("li");
      li.textContent = `${book.title} - ${book.author}`;
      li.addEventListener("click", () => {
        searchInput.value = book.title; // ملء حقل البحث بالعنوان
        displayBooks([book]); // عرض الكتاب المحدد
        suggestionsList.style.display = "none"; // إخفاء الاقتراحات
      });
      suggestionsList.appendChild(li);
    });
    suggestionsList.style.display = "block"; // إظهار القائمة
  } else {
    suggestionsList.style.display = "none"; // إخفاء القائمة إذا لم توجد اقتراحات
  }
}



// تعديل دالة عرض الكتب لإخفاء رسالة "لا توجد نتائج"
function displayBooks(booksToShow = books) {
  const container = document.getElementById("booksContainer");
  if (booksToShow.length === 0 && suggestionsList.style.display === "none") {
    container.innerHTML =
      `<p class="text-danger">لا توجد نتائج مطابقة لبحثك راجع الاسم واعد الادخال من جديد</p>`;
  } else {
    container.innerHTML = booksToShow
      .map((book) => createBookCard(book))
      .join("");
  }
}

// إخفاء قائمة الاقتراحات عند فقدان التركيز من حقل البحث
searchInput.addEventListener("blur", () => {
  setTimeout(() => {
    suggestionsList.style.display = "none";
  }, 200); // تأخير بسيط لإتاحة النقر على الاقتراحات
});

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("input", performSearch);

// ...existing code...