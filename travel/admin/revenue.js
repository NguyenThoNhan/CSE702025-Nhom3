// admin/revenue.js (Phiên bản chính xác hiện tại)
document.addEventListener('DOMContentLoaded', () => {
    const ordersTableBody = document.getElementById('orders-table-body');
    const totalRevenueEl = document.getElementById('total-revenue');
    const API_URL = 'http://localhost:3000/api/orders';

    async function fetchAndRenderOrders() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Không thể tải dữ liệu đơn hàng.');
            const allOrders = await response.json();

            if (!ordersTableBody) return;
            ordersTableBody.innerHTML = '';
            let totalRevenue = 0;

            if (allOrders.length === 0) {
                ordersTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Chưa có đơn hàng nào.</td></tr>';
                if(totalRevenueEl) totalRevenueEl.textContent = '0đ';
                return;
            }

            allOrders.forEach(order => {
                const row = document.createElement('tr');
                const orderDate = new Date(order.order_date).toLocaleString('vi-VN');
                const totalAmount = new Intl.NumberFormat('vi-VN').format(order.total_amount) + 'đ';
                
                let statusClass = '';
                switch(order.status) {
                    case 'Đã phê duyệt': statusClass = 'status-approved'; break;
                    case 'Đã từ chối': statusClass = 'status-rejected'; break;
                    default: statusClass = 'status-pending';
                }

                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${orderDate}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.customer_email}</td>
                    <td>${totalAmount}</td>
                    <td><span class="status ${statusClass}">${order.status}</span></td>
                    <td class="action-buttons">
                        <button class="btn-approve" data-id="${order.id}" title="Phê duyệt"><i class="fas fa-check-circle"></i></button>
                        <button class="btn-reject" data-id="${order.id}" title="Từ chối"><i class="fas fa-times-circle"></i></button>
                    </td>
                `;
                
                ordersTableBody.appendChild(row);
                
                if(order.status === 'Đã phê duyệt') {
                    totalRevenue += order.total_amount;
                }
            });

            if(totalRevenueEl) totalRevenueEl.textContent = new Intl.NumberFormat('vi-VN').format(totalRevenue) + 'đ';
        } catch (error) {
            console.error('Lỗi khi tải đơn hàng:', error);
            if(ordersTableBody) ordersTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Lỗi tải dữ liệu. Vui lòng kiểm tra server.</td></tr>`;
        }
    }
    
    // Logic cập nhật trạng thái qua API
    if (ordersTableBody) {
        ordersTableBody.addEventListener('click', async e => {
            const button = e.target.closest('button');
            if(!button) return;

            const orderId = button.dataset.id;
            let newStatus = '';

            if(button.classList.contains('btn-approve')) {
                newStatus = 'Đã phê duyệt';
            } else if (button.classList.contains('btn-reject')) {
                newStatus = 'Đã từ chối';
            } else {
                return;
            }
            
            try {
                const response = await fetch(`${API_URL}/${orderId}/status`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Lỗi khi cập nhật trạng thái.');
                }

                const result = await response.json();
                alert(result.message);

                // Tải lại dữ liệu mới nhất từ server
                fetchAndRenderOrders(); 

            } catch (error) {
                console.error('Lỗi cập nhật trạng thái:', error);
                alert('Lỗi: ' + error.message);
            }
        });
    }
    
    // Khởi tạo: Tải dữ liệu lần đầu
    fetchAndRenderOrders();
});