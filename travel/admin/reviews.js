// admin/reviews.js
document.addEventListener('DOMContentLoaded', () => {
    const reviewsTableBody = document.getElementById('reviews-table-body');
    let allReviews = JSON.parse(localStorage.getItem('tourReviews')) || [];

    function renderReviewsTable() {
        if (!reviewsTableBody) return;
        
        reviewsTableBody.innerHTML = '';
        if (allReviews.length === 0) {
            reviewsTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Chưa có đánh giá nào.</td></tr>';
            return;
        }

        // Sắp xếp để hiển thị cái mới nhất lên đầu
        allReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        allReviews.forEach((review, index) => {
            const row = document.createElement('tr');
            const reviewDate = new Date(review.date).toLocaleString('vi-VN');
            
            // Tạo chuỗi HTML cho các ngôi sao
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                starsHTML += `<i class="fas fa-star" style="color: ${i <= review.rating ? '#ffc107' : '#e4e5e9'};"></i>`;
            }

            row.innerHTML = `
                <td>${review.tourId}</td>
                <td>
                    <div>${review.name}</div>
                    <small style="color: var(--text-secondary);">${review.email}</small>
                </td>
                <td>${starsHTML}</td>
                <td style="white-space: pre-wrap; word-break: break-word;">${review.comment}</td>
                <td>${reviewDate}</td>
                <td class="action-buttons">
                    <button class="btn-reject delete-review-btn" data-index="${index}" title="Xóa"><i class="fas fa-trash"></i></button>
                </td>
            `;
            reviewsTableBody.appendChild(row);
        });
    }

    // Gắn sự kiện xóa
    if (reviewsTableBody) {
        reviewsTableBody.addEventListener('click', e => {
            const button = e.target.closest('.delete-review-btn');
            if (!button) return;

            const index = parseInt(button.dataset.index);
            if (confirm(`Bạn có chắc chắn muốn xóa đánh giá này?`)) {
                // Xóa phần tử khỏi mảng
                allReviews.splice(index, 1);
                // Cập nhật lại localStorage
                localStorage.setItem('tourReviews', JSON.stringify(allReviews));
                // Vẽ lại bảng
                renderReviewsTable();
                alert('Đã xóa đánh giá thành công.');
            }
        });
    }

    // Khởi tạo
    renderReviewsTable();
});