// script.js (PHIÊN BẢN HOÀN CHỈNH)

/**
 * Cập nhật số lượng hiển thị trên icon Yêu thích và Giỏ hàng trên Header.
 * Dữ liệu được lấy từ localStorage.
 * Hàm này được định nghĩa ở phạm vi toàn cục để tour-detail.js có thể gọi.
 */
function updateHeaderCounters() {
    // Lấy dữ liệu từ localStorage, nếu không có thì dùng mảng rỗng
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tìm các phần tử hiển thị số lượng
    const favCountEl = document.getElementById('fav-count');
    const cartCountEl = document.getElementById('cart-count');

    // Cập nhật text, chỉ cập nhật nếu phần tử tồn tại
    if (favCountEl) {
        favCountEl.textContent = favorites.length;
    }
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}

    // --- LOGIC CHO MEGA MENU ---
    const megaMenuCategories = document.querySelectorAll('.mega-menu-categories li');
    
    megaMenuCategories.forEach(category => {
        category.addEventListener('mouseover', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            if (!targetId) return; // Bỏ qua nếu không có data-target

            // 1. Xóa class 'active' khỏi tất cả các category
            megaMenuCategories.forEach(c => c.classList.remove('active'));
            // 2. Thêm class 'active' cho category đang được hover
            e.currentTarget.classList.add('active');

            // 3. Ẩn tất cả các panel nội dung
            document.querySelectorAll('.mega-menu-panel').forEach(panel => {
                panel.classList.remove('active');
            });

            // 4. Hiển thị panel nội dung tương ứng
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });


// Chạy các script sau khi toàn bộ nội dung HTML đã được tải
document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIC CHO MENU RESPONSIVE ---
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.header .navbar');

    if (menuBtn && navbar) {
        menuBtn.onclick = () => {
            menuBtn.classList.toggle('fa-times'); // Chuyển icon bars thành 'X' và ngược lại
            navbar.classList.toggle('active'); // Thêm/xóa class 'active' để hiện/ẩn menu
        };

        // Đóng menu khi cuộn trang
        window.onscroll = () => {
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('active');
        };
    }

    // --- LOGIC CHO HIỆU ỨNG GÕ CHỮ Ở THANH TÌM KIẾM ---
    const searchBox = document.querySelector('#search-box');
    
    if (searchBox) {
        const placeholderTexts = [
            "Nhập tên thành phố bạn muốn tới...",
            "Đà Nẵng...",
            "Nha Trang...",
            "Phú Quốc..."
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = placeholderTexts[textIndex];
            const currentPlaceholder = isDeleting 
                ? currentText.substring(0, charIndex - 1)
                : currentText.substring(0, charIndex + 1);

            searchBox.setAttribute('placeholder', currentPlaceholder);

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            // Chuyển trạng thái
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000); // Dừng 2 giây sau khi gõ xong
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % placeholderTexts.length;
                setTimeout(typeEffect, 500); // Dừng 0.5 giây trước khi gõ câu mới
            } else {
                const typingSpeed = isDeleting ? 50 : 100;
                setTimeout(typeEffect, typingSpeed);
            }
        }
        
        // Bắt đầu hiệu ứng
        setTimeout(typeEffect, 1000); // Bắt đầu sau 1 giây
    }

    // --- CẬP NHẬT SỐ LƯỢNG HEADER KHI TẢI TRANG ---
    // Gọi hàm này mỗi khi một trang được tải để đảm bảo số lượng luôn đúng
    updateHeaderCounters();
});