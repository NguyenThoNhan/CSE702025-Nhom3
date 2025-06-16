// news.js
document.addEventListener('DOMContentLoaded', () => {

    const articles = newsDB; // Lấy dữ liệu từ database.js
    const articlesPerPage = 4; // Số bài viết trên mỗi trang (1 lớn + 3 nhỏ)
    let currentPage = 1;

    const newsGrid = document.getElementById('news-grid');
    const paginationContainer = document.getElementById('pagination');
    const popularPostsContainer = document.getElementById('popular-posts');

    // Hàm hiển thị bài viết cho một trang cụ thể
    function displayPage(page) {
        if (!newsGrid) return;
        newsGrid.innerHTML = '';
        page = parseInt(page);
        currentPage = page;

        // Tính toán vị trí bắt đầu và kết thúc của các bài viết trên trang hiện tại
        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const pageArticles = articles.slice(startIndex, endIndex);

        pageArticles.forEach(article => {
            const articleHTML = `
                <a href="#" class="news-card">
                    <div class="news-card-image">
                        <img src="${article.image}" alt="${article.title}">
                    </div>
                    <div class="news-card-content">
                        <h3 class="news-card-title">${article.title}</h3>
                        <p class="news-card-excerpt">${article.excerpt}</p>
                    </div>
                </a>
            `;
            newsGrid.innerHTML += articleHTML;
        });
    }

    // Hàm thiết lập phân trang
    function setupPagination() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(articles.length / articlesPerPage);

        // Nút "Previous"
        paginationContainer.innerHTML += `<a href="#" class="page-link ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">«</a>`;

        // Các nút số trang
        for (let i = 1; i <= pageCount; i++) {
            paginationContainer.innerHTML += `<a href="#" class="page-link ${i === currentPage ? 'current' : ''}" data-page="${i}">${i}</a>`;
        }

        // Nút "Next"
        paginationContainer.innerHTML += `<a href="#" class="page-link ${currentPage === pageCount ? 'disabled' : ''}" data-page="${currentPage + 1}">»</a>`;
    }
    
    // Hàm hiển thị các bài viết phổ biến
    function displayPopularPosts() {
        if (!popularPostsContainer) return;
        // Lấy ngẫu nhiên 5 bài viết để làm ví dụ
        const popular = [...articles].sort(() => 0.5 - Math.random()).slice(0, 5);
        
        popularPostsContainer.innerHTML = popular.map(post => `
             <a href="#" class="post-item">
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <h4 class="post-title">${post.title}</h4>
            </a>
        `).join('');
    }

    // Gắn sự kiện click cho phân trang
    if (paginationContainer) {
         paginationContainer.addEventListener('click', e => {
            e.preventDefault();
            const target = e.target.closest('.page-link');
            if (target && !target.classList.contains('disabled') && !target.classList.contains('current')) {
                const page = target.getAttribute('data-page');
                displayPage(page);
                setupPagination();
            }
        });
    }
   
    // Khởi tạo trang
    displayPage(1);
    setupPagination();
    displayPopularPosts();
});