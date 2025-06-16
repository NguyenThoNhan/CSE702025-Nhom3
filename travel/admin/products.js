// products.js
document.addEventListener('DOMContentLoaded', () => {

    const productsTableBody = document.getElementById('products-table-body');
    const modalOverlay = document.getElementById('product-modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const productForm = document.getElementById('product-form');
    const addNewBtn = document.getElementById('add-new-tour-btn');
    const closeModalBtn = document.getElementById('close-product-modal');

    // Các trường trong form
    const tourIdInput = document.getElementById('tour-id');
    const tourNameInput = document.getElementById('tour-name');
    const tourBreadcrumbInput = document.getElementById('tour-breadcrumb');
    const tourPriceNumInput = document.getElementById('tour-price-num');
    const tourScheduleInput = document.getElementById('tour-schedule');
    const tourDurationInput = document.getElementById('tour-duration');
    const tourImageUpload = document.getElementById('tour-image-upload');
    const tourImagePreview = document.getElementById('tour-image-preview');
    const tourImagePath = document.getElementById('tour-image-path');


    let currentToursDB = toursDB; // Làm việc trên một bản sao

    // Hàm render bảng sản phẩm
    function renderProductsTable() {
        if (!productsTableBody) return;
        productsTableBody.innerHTML = '';
        
        Object.values(currentToursDB).forEach(tour => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="../${tour.image}" alt="${tour.name}"></td>
                <td>${tour.name}</td>
                <td>${tour.breadcrumb}</td>
                <td>${tour.price_adult_str}</td>
                <td class="action-buttons">
                    <button class="btn-approve" data-id="${tour.id}" title="Sửa"><i class="fas fa-edit"></i></button>
                    <button class="btn-reject" data-id="${tour.id}" title="Xóa"><i class="fas fa-trash"></i></button>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
    }

    // Hàm mở/đóng modal
    function openModal() { modalOverlay.style.display = 'flex'; }
    function closeModal() { modalOverlay.style.display = 'none'; }

    // Sự kiện cho nút "Thêm mới"
    if (addNewBtn) {
        addNewBtn.addEventListener('click', () => {
            modalTitle.textContent = 'Thêm Tour Mới';
            productForm.reset();
            tourIdInput.value = ''; // Đảm bảo ID trống cho việc thêm mới
            tourImagePreview.src = '';
            tourImagePreview.classList.remove('visible');
            openModal();
        });
    }
    
    // Sự kiện đóng modal
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });

    // Sự kiện cho nút Sửa và Xóa trong bảng
    if (productsTableBody) {
        productsTableBody.addEventListener('click', e => {
            const button = e.target.closest('button');
            if (!button) return;

            const tourId = button.dataset.id;

            // Xử lý nút Xóa
            if (button.classList.contains('btn-reject')) {
                if (confirm(`Bạn có chắc chắn muốn xóa tour "${currentToursDB[tourId].name}"?`)) {
                    delete currentToursDB[tourId];
                    // Ở đây, bạn cần một cách để lưu lại sự thay đổi này. 
                    // Vì không có server, chúng ta sẽ giả lập bằng cách render lại bảng.
                    // Trong một ứng dụng thật, bạn sẽ gửi yêu cầu API đến server.
                    console.log("Đã xóa (giả lập):", tourId);
                    renderProductsTable();
                    alert('Đã xóa tour thành công (giả lập)!');
                }
            }

            // Xử lý nút Sửa
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
                tourImagePath.value = tourData.image; // Lưu đường dẫn ảnh cũ

                openModal();
            }
        });
    }

    // Xử lý xem trước ảnh upload
    if (tourImageUpload) {
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
    }

    // Xử lý submit form (Thêm mới hoặc Cập nhật)
    if (productForm) {
        productForm.addEventListener('submit', e => {
            e.preventDefault();
            const id = tourIdInput.value;
            const newImageFile = tourImageUpload.files[0];
            let imagePath = tourImagePath.value;

            // Nếu có ảnh mới được upload, chỉ lưu tên file (giả lập)
            if (newImageFile) {
                imagePath = `images/${newImageFile.name}`;
            }

            const tourData = {
                id: id || 'tour-' + Date.now(),
                name: tourNameInput.value,
                breadcrumb: tourBreadcrumbInput.value,
                price_adult_num: parseInt(tourPriceNumInput.value),
                price_adult_str: new Intl.NumberFormat('vi-VN').format(tourPriceNumInput.value) + 'đ',
                schedule: tourScheduleInput.value,
                duration: tourDurationInput.value,
                image: imagePath,
                // Thêm các trường giá khác nếu cần
                price_child_num: Math.round(parseInt(tourPriceNumInput.value) * 0.8),
                price_baby_num: Math.round(parseInt(tourPriceNumInput.value) * 0.3),
            };

            // Cập nhật hoặc thêm mới vào DB giả
            currentToursDB[tourData.id] = tourData;
            
            console.log("Đã lưu (giả lập):", tourData);
            alert('Lưu thay đổi thành công (giả lập)!');

            closeModal();
            renderProductsTable();
        });
    }

    // Khởi tạo
    renderProductsTable();
});