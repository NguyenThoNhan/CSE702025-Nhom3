// tours-international.js (PHIÊN BẢN SỬA LỖI)
document.addEventListener('DOMContentLoaded', () => {

    const toursContainer = document.getElementById('international-tours-container');
    const paginationContainer = document.getElementById('pagination');
    const sortBar = document.getElementById('sort-bar');

    // Lọc chính xác các tour có breadcrumb là "Tour Nước Ngoài"
    let allInternationalTours = Object.values(toursDB).filter(tour => 
        tour.breadcrumb === "Tour Nước Ngoài"
    );

    const toursPerPage = 12;
    let currentPage = 1;
    let currentSort = 'default';

    // Hàm hiển thị tour
    function displayTours() {
        if (!toursContainer) {
            console.error("Không tìm thấy container #international-tours-container");
            return;
        }

        let toursToDisplay = [...allInternationalTours];
        switch (currentSort) {
            case 'name-asc': toursToDisplay.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name-desc': toursToDisplay.sort((a, b) => b.name.localeCompare(a.name)); break;
            case 'price-asc': toursToDisplay.sort((a, b) => a.price_adult_num - b.price_adult_num); break;
            case 'price-desc': toursToDisplay.sort((a, b) => b.price_adult_num - a.price_adult_num); break;
        }

        const startIndex = (currentPage - 1) * toursPerPage;
        const pageTours = toursToDisplay.slice(startIndex, startIndex + toursPerPage);

        if (pageTours.length === 0) {
            toursContainer.innerHTML = '<p class="empty-message">Không tìm thấy tour quốc tế nào.</p>';
        } else {
            toursContainer.innerHTML = pageTours.map(tour => `
                <div class="box">
                    <div class="image"><img src="${tour.image}" alt="${tour.name}"></div>
                    <div class="content">
                        <h3>${tour.name}</h3>
                        <div class="details">
                            <p class="schedule"><i class="fas fa-plane"></i> Lịch khởi hành: <span>${tour.schedule}</span></p>
                            <p class="duration"><i class="fas fa-clock"></i> Thời gian: <span>${tour.duration}</span></p>
                        </div>
                        <div class="price-box">
                            ${tour.old_price_str ? `<span class="old-price">${tour.old_price_str}</span>` : ''}
                            <span class="price">${tour.price_adult_str}</span>
                            <a href="tour-detail.html?id=${tour.id}" class="btn">Đặt tour</a>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Hàm thiết lập phân trang
    function setupPagination() {
        if (!paginationContainer) return;
        const pageCount = Math.ceil(allInternationalTours.length / toursPerPage);
        paginationContainer.innerHTML = '';
        if (pageCount <= 1) return;

        paginationContainer.innerHTML += `<a href="#" class="page-link ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">«</a>`;
        for (let i = 1; i <= pageCount; i++) {
            paginationContainer.innerHTML += `<a href="#" class="page-link ${i === currentPage ? 'current' : ''}" data-page="${i}">${i}</a>`;
        }
        paginationContainer.innerHTML += `<a href="#" class="page-link ${currentPage === pageCount ? 'disabled' : ''}" data-page="${currentPage + 1}">»</a>`;
    }

    // Gắn sự kiện
    if (sortBar) {
        sortBar.addEventListener('change', e => {
            if (e.target.type === 'radio') {
                currentSort = e.target.value;
                currentPage = 1;
                displayTours();
                setupPagination();
            }
        });
    }

    if (paginationContainer) {
        paginationContainer.addEventListener('click', e => {
            e.preventDefault();
            const target = e.target.closest('.page-link');
            if (target && !target.classList.contains('disabled') && !target.classList.contains('current')) {
                currentPage = parseInt(target.getAttribute('data-page'));
                displayTours();
                setupPagination();
                window.scrollTo(0, 300);
            }
        });
    }

    // Khởi tạo
    displayTours();
    setupPagination();
});