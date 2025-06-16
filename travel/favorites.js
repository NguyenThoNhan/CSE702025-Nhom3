// favorites.js
document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favoriteIds.length === 0) {
        favoritesContainer.innerHTML = '<p class="empty-message">Bạn chưa có tour yêu thích nào.</p>';
        return;
    }

    favoritesContainer.innerHTML = ''; // Xóa nội dung cũ

    favoriteIds.forEach(id => {
        const tour = toursDB[id];
        if (tour) {
            const tourCard = `
                <div class="box">
                    <div class="image">
                        <img src="${tour.image}" alt="${tour.name}">
                        <button class="fav-icon-in-card active" data-id="${tour.id}"><i class="fas fa-heart"></i></button>
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
            `;
            favoritesContainer.innerHTML += tourCard;
        }
    });

    // Thêm sự kiện click cho các nút trái tim để xóa khỏi danh sách yêu thích
    document.querySelectorAll('.fav-icon-in-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const tourIdToRemove = e.currentTarget.getAttribute('data-id');
            
            // Cập nhật lại localStorage
            let currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            currentFavorites = currentFavorites.filter(id => id !== tourIdToRemove);
            localStorage.setItem('favorites', JSON.stringify(currentFavorites));
            
            // Cập nhật lại giao diện
            alert('Đã xóa tour khỏi danh sách yêu thích!');
            location.reload(); // Tải lại trang để cập nhật danh sách
        });
    });
});