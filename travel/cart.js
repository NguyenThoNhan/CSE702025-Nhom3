// cart.js (PHIÊN BẢN HOÀN CHỈNH VỚI CHỨC NĂNG THANH TOÁN)

// Hàm trợ giúp để định dạng số thành tiền tệ VNĐ
function formatCurrency(number) {
    if (isNaN(number)) return "0đ";
    return new Intl.NumberFormat('vi-VN').format(number) + 'đ';
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Lấy các phần tử trên trang ---
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    const cartTitle = document.getElementById('cart-title');
    const checkoutBtn = document.querySelector('.btn-checkout');

    // --- Lấy các phần tử của Modal ---
    const modalOverlay = document.getElementById('checkout-modal-overlay');
    const closeModalBtn = document.getElementById('close-checkout-modal');
    const checkoutForm = document.getElementById('checkout-form');

    const cartIds = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartTitle.textContent = `GIỎ HÀNG (${cartIds.length} tour)`;

    if (cartIds.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Giỏ hàng của bạn đang trống.</p>';
        if (cartSummaryContainer) cartSummaryContainer.style.display = 'none';
        return;
    }

    let totalPrice = 0;
    cartItemsContainer.innerHTML = '';
    
    cartIds.forEach(id => {
        const tour = toursDB[id];
        if (tour) {
            totalPrice += tour.price_adult_num;
            const cartItem = `
                <div class="cart-item">
                    <img src="${tour.image}" alt="${tour.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <a href="tour-detail.html?id=${tour.id}" class="cart-item-title">${tour.name}</a>
                        <p class="cart-item-info">- Người lớn (x1)</p>
                        <a href="#" class="cart-item-remove" data-id="${tour.id}">Xóa</a>
                    </div>
                    <div class="cart-item-price">${tour.price_adult_str}</div>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItem;
        }
    });

    // Cập nhật tổng tiền
    document.getElementById('subtotal-price').textContent = formatCurrency(totalPrice);
    document.getElementById('total-price').textContent = formatCurrency(totalPrice);

    // --- LOGIC MỞ/ĐÓNG MODAL ---
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (modalOverlay) modalOverlay.style.display = 'flex';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (modalOverlay) modalOverlay.style.display = 'none';
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            // Chỉ đóng modal khi click vào vùng nền mờ, không phải nội dung modal
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });
    }

// Trong file cart.js, sửa lại hàm xử lý sự kiện submit của checkoutForm

if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => { // Thêm async
        e.preventDefault();

        // 1. Thu thập thông tin
        const customerInfo = {
            name: document.getElementById('customer-name').value,
            phone: document.getElementById('customer-phone').value,
            email: document.getElementById('customer-email').value,
            address: document.getElementById('customer-address').value,
        };

        // Giả sử bạn có cartIds và totalPrice từ logic trước đó
        const orderData = {
            customerInfo: customerInfo,
            items: cartIds, // Danh sách ID các tour
            totalAmount: totalPrice,
        };

        // 2. Gửi dữ liệu đến server để tạo đơn hàng
        try {
            const response = await fetch('http://localhost:3000/api/orders', { // API tạo đơn hàng
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể tạo đơn hàng.');
            }

            const result = await response.json();

            // 3. Xóa giỏ hàng ở client (localStorage)
            localStorage.removeItem('cart');

            // 4. Thông báo và làm mới
            if(modalOverlay) modalOverlay.style.display = 'none';
            alert(result.message);
            location.reload();

        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            alert('Lỗi: ' + error.message);
        }
    });
}

    // --- LOGIC XÓA SẢN PHẨM (giữ nguyên) ---
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tourIdToRemove = e.currentTarget.getAttribute('data-id');
            let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            currentCart = currentCart.filter(id => id !== tourIdToRemove);
            localStorage.setItem('cart', JSON.stringify(currentCart));
            location.reload();
        });
    });
});