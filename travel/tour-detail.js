// tour-detail.js (PHIÊN BẢN HOÀN CHỈNH)

/**
 * Hàm trợ giúp để định dạng một số thành chuỗi tiền tệ Việt Nam.
 * @param {number} number - Số cần định dạng.
 * @returns {string} - Chuỗi đã định dạng (ví dụ: "2.000.000đ").
 */
function formatCurrency(number) {
    if (isNaN(number)) return "0đ";
    return new Intl.NumberFormat('vi-VN').format(number) + 'đ';
}

// Chạy các script sau khi toàn bộ nội dung HTML đã được tải
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LẤY DỮ LIỆU TOUR TỪ URL VÀ DATABASE ---
    const params = new URLSearchParams(window.location.search);
    const tourId = params.get('id');
    const tourData = toursDB[tourId];
    
    // Nếu không tìm thấy tour, hiển thị thông báo và dừng lại
    if (!tourData) {
        const container = document.querySelector('.tour-detail-container');
        if (container) {
            container.innerHTML = '<h1 style="text-align:center; width:100%; padding: 5rem 0;">Tour không tồn tại hoặc đã bị xóa.</h1>';
        }
        return;
    }

    // --- 2. ĐỔ DỮ LIỆU TOUR VÀO CÁC THÀNH PHẦN TRANG ---
    document.title = tourData.name;
    document.getElementById('breadcrumb-category').textContent = tourData.breadcrumb;
    document.getElementById('breadcrumb-tour-name').textContent = tourData.name;
    document.getElementById('tour-main-image').src = tourData.image;
    document.getElementById('tour-itinerary-content').innerHTML = tourData.full_itinerary;
    document.getElementById('tour-title').textContent = tourData.name;
    document.getElementById('tour-price').textContent = tourData.price_adult_str;
    document.getElementById('tour-start-location').textContent = tourData.start_location;
    document.getElementById('tour-transport').textContent = tourData.transport;
    document.getElementById('tour-schedule').textContent = tourData.schedule;
    document.getElementById('tour-duration').textContent = tourData.duration;
    
    const highlightsList = document.getElementById('tour-highlights-list');
    highlightsList.innerHTML = ''; // Xóa list cũ trước khi thêm mới
    tourData.highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        highlightsList.appendChild(li);
    });

    // --- 3. LOGIC CHO FORM ĐẶT TOUR (TÍNH GIÁ ĐỘNG) ---
    const adultQtyInput = document.getElementById('adult-qty');
    const childQtyInput = document.getElementById('child-qty');
    const babyQtyInput = document.getElementById('baby-qty');

    // Hiển thị đơn giá
    document.getElementById('adult-price').textContent = tourData.price_adult_str;
    document.getElementById('child-price').textContent = tourData.price_child_str;
    document.getElementById('baby-price').textContent = tourData.price_baby_str;

    function updateBookingTotal() {
        const adultQty = parseInt(adultQtyInput.value) || 0;
        const childQty = parseInt(childQtyInput.value) || 0;
        const babyQty = parseInt(babyQtyInput.value) || 0;

        const adultTotal = adultQty * tourData.price_adult_num;
        const childTotal = childQty * tourData.price_child_num;
        const babyTotal = babyQty * tourData.price_baby_num;

        document.getElementById('adult-total').textContent = formatCurrency(adultTotal);
        document.getElementById('child-total').textContent = formatCurrency(childTotal);
        document.getElementById('baby-total').textContent = formatCurrency(babyTotal);

        const grandTotal = adultTotal + childTotal + babyTotal;
        document.getElementById('grand-total').textContent = formatCurrency(grandTotal);
    }

    // Gắn sự kiện để tự động cập nhật khi thay đổi số lượng
    [adultQtyInput, childQtyInput, babyQtyInput].forEach(input => {
        input.addEventListener('input', updateBookingTotal);
    });
    updateBookingTotal(); // Chạy lần đầu để tính giá cho 1 người lớn

    // --- 4. LOGIC HIỂN THỊ CÁC TOUR TƯƠNG TỰ ---
    function displayRelatedTours() {
        const container = document.getElementById('related-tours-container');
        if (!container) return;

        const allTourIds = Object.keys(toursDB);
        const relatedTourIds = allTourIds.filter(id => id !== tourId);
        const randomTours = relatedTourIds.sort(() => 0.5 - Math.random()).slice(0, 4);

        container.innerHTML = randomTours.map(id => {
            const tour = toursDB[id];
            return `
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
            `;
        }).join('');
    }
    displayRelatedTours();

    // --- 5. LOGIC CHO NÚT YÊU THÍCH VÀ ĐẶT TOUR (TRÊN CỘT PHẢI) ---
    const favBtn = document.getElementById('add-to-fav-btn');
    const cartBtn = document.getElementById('add-to-cart-btn');

    function checkFavStatus() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(tourId)) {
            favBtn.classList.add('active');
            favBtn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            favBtn.classList.remove('active');
            favBtn.innerHTML = '<i class="far fa-heart"></i>';
        }
    }

    favBtn.addEventListener('click', () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.indexOf(tourId);
        if (index > -1) {
            favorites.splice(index, 1); // Xóa tour khỏi danh sách
        } else {
            favorites.push(tourId); // Thêm tour vào danh sách
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateHeaderCounters(); // Gọi hàm toàn cục từ script.js
        checkFavStatus();
    });

    cartBtn.addEventListener('click', () => {
         let cart = JSON.parse(localStorage.getItem('cart')) || [];
         if (!cart.includes(tourId)) {
            cart.push(tourId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateHeaderCounters(); // Gọi hàm toàn cục từ script.js
            alert('Đã thêm tour vào giỏ hàng!');
         } else {
            alert('Tour này đã có trong giỏ hàng của bạn.');
         }
    });
    const ratingStarsContainer = document.getElementById('rating-stars');
    const reviewForm = document.getElementById('review-form');
    const reviewList = document.getElementById('review-list');
    let currentRating = 0;

    // Xử lý hover và click chọn sao
    if (ratingStarsContainer) {
        const stars = ratingStarsContainer.querySelectorAll('i');
        
        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                resetStars();
                const value = parseInt(star.dataset.value);
                for(let i = 0; i < value; i++) {
                    stars[i].classList.add('hover');
                }
            });
            
            star.addEventListener('mouseout', resetStars);

            star.addEventListener('click', () => {
                currentRating = parseInt(star.dataset.value);
                resetStars();
                for(let i = 0; i < currentRating; i++) {
                    stars[i].classList.add('active');
                }
            });
        });

        function resetStars() {
            stars.forEach(star => {
                star.classList.remove('hover');
                // Chỉ xóa active nếu chưa có rating nào được click chọn
                if (currentRating === 0) {
                     star.classList.remove('active');
                }
            });
        }
    }

    // Xử lý gửi form
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const comment = document.getElementById('review-comment').value;
            const name = document.getElementById('reviewer-name').value;
            const email = document.getElementById('reviewer-email').value;

            if (currentRating === 0) {
                alert('Vui lòng chọn số sao đánh giá!');
                return;
            }

            // Tạo đối tượng review mới
            const newReview = {
                tourId: tourId, // tourId đã có từ đầu file
                rating: currentRating,
                comment: comment,
                name: name,
                email: email,
                date: new Date().toISOString()
            };

            // Lưu vào localStorage (giả lập)
            let reviews = JSON.parse(localStorage.getItem('tourReviews')) || [];
            reviews.push(newReview);
            localStorage.setItem('tourReviews', JSON.stringify(reviews));

            // Hiển thị review mới và reset form
            addReviewToDOM(newReview);
            reviewForm.reset();
            currentRating = 0;
            ratingStarsContainer.querySelectorAll('i').forEach(s => s.classList.remove('active'));

            alert('Cảm ơn bạn đã gửi đánh giá!');
        });
    }

    // Hàm để tạo HTML cho một review và thêm vào danh sách
    function addReviewToDOM(review) {
        if (!reviewList) return;

        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';

        let starsHTML = '';
        for(let i = 0; i < 5; i++) {
            starsHTML += `<i class="fa${i < review.rating ? 's' : 'r'} fa-star"></i>`;
        }

        reviewItem.innerHTML = `
            <div class="reviewer-info">
                <img src="images/g-2.jpg" alt="avatar" class="reviewer-avatar">
                <div>
                    <strong class="reviewer-name">${review.name}</strong>
                    <div class="review-stars">${starsHTML}</div>
                </div>
            </div>
            <p class="review-text">${review.comment}</p>
            <span class="review-date">${new Date(review.date).toLocaleDateString('vi-VN')}</span>
        `;
        // Chèn review mới lên đầu danh sách
        reviewList.prepend(reviewItem);
    }
    
    // Hàm tải và hiển thị các review đã lưu cho tour này
    function loadReviews() {
        if (!reviewList) return;
        const allReviews = JSON.parse(localStorage.getItem('tourReviews')) || [];
        const tourReviews = allReviews.filter(r => r.tourId === tourId);
        
        // Xóa các review mẫu (nếu có) trước khi tải
        const sampleReview = reviewList.querySelector('.review-item');
        if(sampleReview && sampleReview.parentElement === reviewList) {
            reviewList.innerHTML = '';
        }

        tourReviews.reverse().forEach(review => addReviewToDOM(review));
    }


    checkFavStatus(); // Chạy khi tải trang để kiểm tra trạng thái nút Yêu thích
});