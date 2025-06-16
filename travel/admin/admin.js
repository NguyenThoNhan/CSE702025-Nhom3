// admin.js (PHIÊN BẢN ĐẦY ĐỦ)
document.addEventListener('DOMContentLoaded', () => {

     // ===============================================
    // BẢO VỆ TRANG ADMIN
    // ===============================================
    const loggedInUserData = localStorage.getItem('loggedInUser');
    let user = null;

    if (loggedInUserData) {
        try {
            user = JSON.parse(loggedInUserData);
        } catch(e) {
            // Lỗi parse JSON -> dữ liệu hỏng, coi như chưa đăng nhập
            user = null;
        }
    }

    // Nếu không có thông tin đăng nhập HOẶC role không phải là 'admin'
    if (!user || user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tư cách quản trị viên.');
        // Chuyển hướng về trang đăng nhập của client
        window.location.href = '/client/signin.html'; 
        return; // Dừng thực thi các script còn lại của trang admin
    }

    // ===============================================
    // LOGIC ĐĂNG XUẤT CHO ADMIN
    // ===============================================
    const userProfileLink = document.querySelector('.user-profile a');
    if (userProfileLink) {
        // Thay đổi link mặc định thành hành động đăng xuất
        userProfileLink.href = "#"; 
        userProfileLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Bạn có muốn đăng xuất khỏi trang quản trị?')) {
                localStorage.removeItem('loggedInUser');
                window.location.href = '/client/signin.html';
            }
        });
    }
    // ===================================================
    // CHỨC NĂNG CHUNG (Theme, Menu)
    // ===================================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'light') {
            html.classList.remove('dark');
            if (themeToggle) themeToggle.checked = false;
        } else {
            html.classList.add('dark');
            if (themeToggle) themeToggle.checked = true;
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ===================================================
    // LOGIC TRANG DASHBOARD (admin.html)
    // ===================================================
    if (document.getElementById('monthlyRevenueChart')) {
        const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const allTours = toursDB || {};

        function updateStatCards() {
            document.getElementById('total-orders').textContent = allOrders.length;

            let todaySales = 0;
            let totalRevenue = 0;
            const today = new Date().toISOString().slice(0, 10);

            allOrders.forEach(order => {
                if (order.orderDate.startsWith(today)) {
                    todaySales += order.totalAmount;
                }
                totalRevenue += order.totalAmount;
            });

            const formatCurrency = (num) => new Intl.NumberFormat('vi-VN').format(num) + 'đ';
            document.getElementById('today-sales').textContent = formatCurrency(todaySales);
            document.getElementById('total-revenue-stat').textContent = formatCurrency(totalRevenue);

            const uniqueCustomers = new Set(allOrders.map(order => order.customer.email));
            document.getElementById('total-customers').textContent = uniqueCustomers.size;
        }

        function renderCharts() {
            const monthlyRevenueCtx = document.getElementById('monthlyRevenueChart').getContext('2d');
            const monthlyData = {
                '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0,
                '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0
            };

            allOrders.forEach(order => {
                const month = order.orderDate.slice(5, 7);
                if (monthlyData.hasOwnProperty(month)) {
                    monthlyData[month] += order.totalAmount;
                }
            });

            new Chart(monthlyRevenueCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue',
                        data: Object.values(monthlyData),
                        backgroundColor: 'rgba(74, 77, 255, 0.8)',
                        borderColor: 'rgba(74, 77, 255, 1)',
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });

            const deviceTypeCtx = document.getElementById('deviceTypeChart').getContext('2d');
            new Chart(deviceTypeCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Desktop', 'Mobile', 'Tablet'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: ['#4a4dff', '#00e096', '#ffc107'],
                        borderWidth: 0
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }

        updateStatCards();
        renderCharts();
    }

    // ===================================================
    // LOGIC TRANG QUẢN LÝ TOUR (products.html)
    // ===================================================
    const productsTableBody = document.getElementById('products-table-body');
    if (productsTableBody) {
        const modalOverlay = document.getElementById('product-modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const productForm = document.getElementById('product-form');
        const addNewBtn = document.getElementById('add-new-tour-btn');
        const closeModalBtn = document.getElementById('close-product-modal');

        const tourIdInput = document.getElementById('tour-id');
        const tourNameInput = document.getElementById('tour-name');
        const tourBreadcrumbInput = document.getElementById('tour-breadcrumb');
        const tourPriceNumInput = document.getElementById('tour-price-num');
        const tourScheduleInput = document.getElementById('tour-schedule');
        const tourDurationInput = document.getElementById('tour-duration');
        const tourImageUpload = document.getElementById('tour-image-upload');
        const tourImagePreview = document.getElementById('tour-image-preview');
        const tourImagePath = document.getElementById('tour-image-path');

        let currentToursDB = toursDB;

        function renderProductsTable() {
            productsTableBody.innerHTML = '';
            Object.values(currentToursDB).forEach(tour => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="../${tour.image}" alt="${tour.name}"></td>
                    <td>${tour.name}</td>
                    <td>${tour.breadcrumb}</td>
                    <td>${tour.price_adult_str || ''}</td>
                    <td class="action-buttons">
                        <button class="btn-approve" data-id="${tour.id}" title="Sửa"><i class="fas fa-edit"></i></button>
                        <button class="btn-reject" data-id="${tour.id}" title="Xóa"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                productsTableBody.appendChild(row);
            });
        }

        function openModal() { modalOverlay.style.display = 'flex'; }
        function closeModal() { modalOverlay.style.display = 'none'; }

        addNewBtn.addEventListener('click', () => {
            modalTitle.textContent = 'Thêm Tour Mới';
            productForm.reset();
            tourIdInput.value = '';
            tourImagePreview.src = '';
            tourImagePreview.classList.remove('visible');
            openModal();
        });

        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', e => {
            if (e.target === modalOverlay) closeModal();
        });

        productsTableBody.addEventListener('click', e => {
            const button = e.target.closest('button');
            if (!button) return;
            const tourId = button.dataset.id;

            if (button.classList.contains('btn-reject')) {
                if (confirm(`Bạn có chắc chắn muốn xóa tour "${currentToursDB[tourId].name}"?`)) {
                    delete currentToursDB[tourId];
                    renderProductsTable();
                    alert('Đã xóa tour thành công (giả lập)!');
                }
            }

            if (button.classList.contains('btn-approve')) {
                const tourData = currentToursDB[tourId];
                modalTitle.textContent = 'Chỉnh Sửa Tour';
                tourIdInput.value = tourData.id;
                tourNameInput.value = tourData.name;
                tourBreadcrumbInput.value = tourData.breadcrumb;
                tourPriceNumInput.value = tourData.price_adult_num;
                tourScheduleInput.value = tourData.schedule;
                tourDurationInput.value = tourData.duration;
                tourImagePreview.src = `../${tourData.image}`;
                tourImagePreview.classList.add('visible');
                tourImagePath.value = tourData.image;
                openModal();
            }
        });

        tourImageUpload.addEventListener('change', () => {
            const file = tourImageUpload.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    tourImagePreview.src = e.target.result;
                    tourImagePreview.classList.add('visible');
                };
                reader.readAsDataURL(file);
            }
        });

        productForm.addEventListener('submit', e => {
            e.preventDefault();
            const id = tourIdInput.value;
            const newImageFile = tourImageUpload.files[0];
            let imagePath = tourImagePath.value;
            if (newImageFile) {
                imagePath = `images/${newImageFile.name}`;
            }

            const newPrice = parseInt(tourPriceNumInput.value);
            const tourData = {
                id: id || 'tour-' + Date.now(),
                name: tourNameInput.value,
                breadcrumb: tourBreadcrumbInput.value,
                price_adult_num: newPrice,
                price_adult_str: new Intl.NumberFormat('vi-VN').format(newPrice) + 'đ',
                schedule: tourScheduleInput.value,
                duration: tourDurationInput.value,
                image: imagePath,
                isPromotion: false,
            };

            currentToursDB[tourData.id] = tourData;
            alert('Lưu thay đổi thành công (giả lập)!');
            closeModal();
            renderProductsTable();
        });

        renderProductsTable();
    }
});
