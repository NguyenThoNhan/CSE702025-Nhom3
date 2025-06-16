// customers.js
document.addEventListener('DOMContentLoaded', () => {
    const customersTableBody = document.getElementById('customers-table-body');
    const modalOverlay = document.getElementById('customer-modal-overlay');
    const closeModalBtn = document.getElementById('close-customer-modal');
    const customerForm = document.getElementById('customer-form');
    const customerIdInput = document.getElementById('customer-id');
    const customerUsernameInput = document.getElementById('customer-username');
    const customerEmailInput = document.getElementById('customer-email');

    const API_URL = 'http://localhost:3000/api/customers';

    // Hàm để tải và hiển thị danh sách khách hàng
    async function fetchAndRenderCustomers() {
        if (!customersTableBody) return;
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch customers');
            const customers = await response.json();
            
            customersTableBody.innerHTML = '';
            if (customers.length === 0) {
                customersTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Không có khách hàng nào.</td></tr>';
                return;
            }

            customers.forEach(customer => {
                const row = document.createElement('tr');
                const joinDate = new Date(customer.created_at).toLocaleDateString('vi-VN');
                row.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.username}</td>
                    <td>${customer.email}</td>
                    <td>${joinDate}</td>
                    <td class="action-buttons">
                        <button class="btn-approve edit-btn" data-id="${customer.id}" title="Sửa"><i class="fas fa-edit"></i></button>
                        <button class="btn-reject delete-btn" data-id="${customer.id}" title="Xóa"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                customersTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            customersTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Lỗi tải dữ liệu.</td></tr>`;
        }
    }

    // Hàm mở/đóng modal
    function openModal() { if(modalOverlay) modalOverlay.style.display = 'flex'; }
    function closeModal() { if(modalOverlay) modalOverlay.style.display = 'none'; }

    // Gắn sự kiện cho các nút trong bảng (Sửa, Xóa)
    if (customersTableBody) {
        customersTableBody.addEventListener('click', async e => {
            const button = e.target.closest('button');
            if (!button) return;

            const id = button.dataset.id;
            
            // Xử lý nút Xóa
            if (button.classList.contains('delete-btn')) {
                if (confirm(`Bạn có chắc chắn muốn xóa khách hàng ID: ${id}?`)) {
                    try {
                        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                        const result = await response.json();
                        alert(result.message);
                        if (response.ok) fetchAndRenderCustomers(); // Tải lại bảng
                    } catch (error) {
                        alert('Lỗi khi xóa khách hàng.');
                    }
                }
            }

            // Xử lý nút Sửa
            if (button.classList.contains('edit-btn')) {
                const row = button.closest('tr');
                const username = row.cells[1].textContent;
                const email = row.cells[2].textContent;

                customerIdInput.value = id;
                customerUsernameInput.value = username;
                customerEmailInput.value = email;
                
                openModal();
            }
        });
    }

    // Gắn sự kiện submit cho form trong modal
    if (customerForm) {
        customerForm.addEventListener('submit', async e => {
            e.preventDefault();
            const id = customerIdInput.value;
            const data = {
                username: customerUsernameInput.value,
                email: customerEmailInput.value
            };
            
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                alert(result.message);
                if (response.ok) {
                    closeModal();
                    fetchAndRenderCustomers();
                }
            } catch (error) {
                alert('Lỗi khi cập nhật thông tin.');
            }
        });
    }

    // Gắn sự kiện đóng modal
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });

    // Khởi tạo trang: tải danh sách khách hàng
    fetchAndRenderCustomers();
});