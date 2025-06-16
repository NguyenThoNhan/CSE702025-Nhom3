// promotions.js
document.addEventListener('DOMContentLoaded', () => {
    const promotionsContainer = document.getElementById('promotions-container');
    const sortBar = document.getElementById('sort-bar');
    
    // Lọc ra các tour có isPromotion: true từ database
    let promotionTours = Object.values(toursDB).filter(tour => tour.isPromotion === true).slice(0, 10);

    // Hàm để hiển thị các tour ra giao diện
    function displayTours(tours) {
        if (!promotionsContainer) return;

        if (tours.length === 0) {
            promotionsContainer.innerHTML = '<p class="empty-message">Hiện không có tour khuyến mãi nào.</p>';
            return;
        }

        promotionsContainer.innerHTML = tours.map(tour => `
            <div class="box">
                <div class="image">
                    <img src="${tour.image}" alt="${tour.name}">
                </div>
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

    // Hàm sắp xếp tour
    function sortTours(sortBy) {
        let sortedTours = [...promotionTours]; // Tạo một bản sao để không thay đổi mảng gốc

        switch(sortBy) {
            case 'name-asc':
                sortedTours.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedTours.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                sortedTours.sort((a, b) => a.price_adult_num - b.price_adult_num);
                break;
            case 'price-desc':
                sortedTours.sort((a, b) => b.price_adult_num - a.price_adult_num);
                break;
            case 'default':
            default:
                 // Không làm gì, giữ nguyên thứ tự mặc định
                break;
        }

        displayTours(sortedTours);
    }

    // Gắn sự kiện 'change' cho thanh sắp xếp
    if (sortBar) {
        sortBar.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                sortTours(e.target.value);
            }
        });
    }

    // Hiển thị các tour lần đầu tiên (theo thứ tự mặc định)
    displayTours(promotionTours);
});