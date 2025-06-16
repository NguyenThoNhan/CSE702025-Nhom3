// server/routes/orders.js (PHIÊN BẢN BỎ QUA HOÀN TOÀN VIỆC CHECK TOUR)
const express = require('express');
const db = require('../config/db');

const router = express.Router();

// -----------------------------------------------------------------
// API [POST] /api/orders - TẠO MỘT ĐƠN HÀNG MỚI (Rất đơn giản)
// -----------------------------------------------------------------
router.post('/', async (req, res) => {
    const { customerInfo, items, totalAmount } = req.body;

    // Chỉ kiểm tra dữ liệu cơ bản nhất
    if (!customerInfo || !items || !Array.isArray(items) || typeof totalAmount !== 'number') {
        return res.status(400).json({ message: "Dữ liệu đơn hàng không hợp lệ." });
    }

    let connection;
    try {
        connection = await db.promise().getConnection();
        await connection.beginTransaction();

        const orderId = 'EVO-' + Date.now();
        
        // 1. Chèn thông tin vào bảng `orders`
        const orderQuery = `
            INSERT INTO orders (id, customer_name, customer_email, customer_phone, customer_address, total_amount, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await connection.execute(orderQuery, [
            orderId,
            customerInfo.name,
            customerInfo.email,
            customerInfo.phone || null,
            customerInfo.address || null,
            totalAmount,
            'Chờ xử lý'
        ]);

        // 2. Chèn thông tin vào bảng `order_items` MÀ KHÔNG CẦN KIỂM TRA
        if (items.length > 0) {
            const orderItemsData = items.map(tourId => {
                // [order_id, tour_id, quantity_adult, price_at_purchase]
                // Vì không check DB, chúng ta tạm ghi giá là 0 hoặc một giá trị mặc định.
                return [orderId, tourId, 1, 0]; 
            });

            const itemsQuery = `INSERT INTO order_items (order_id, tour_id, quantity_adult, price_at_purchase) VALUES ?`;
            await connection.query(itemsQuery, [orderItemsData]);
        }
        
        // 3. Commit transaction
        await connection.commit();
        res.status(201).json({ message: 'Đã nhận đơn hàng thành công!', orderId: orderId });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("LỖI GIAO DỊCH:", error);
        res.status(500).json({ message: 'Lỗi máy chủ khi xử lý đơn hàng.' });
    } finally {
        if (connection) connection.release();
    }
});

// -----------------------------------------------------------------
// API [GET] /api/orders - LẤY TẤT CẢ ĐƠN HÀNG (GIỮ NGUYÊN)
// -----------------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        // Câu lệnh SELECT này đã đúng với cấu trúc bảng của bạn
        const [orders] = await db.promise().query(
            `SELECT id, customer_name, customer_email, total_amount, status, order_date 
             FROM orders 
             ORDER BY order_date DESC`
        );
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Lỗi máy chủ khi lấy danh sách đơn hàng." });
    }
});

// -----------------------------------------------------------------
// API [PUT] /api/orders/:id/status - CẬP NHẬT TRẠNG THÁI (GIỮ NGUYÊN)
// -----------------------------------------------------------------
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Đã phê duyệt', 'Đã từ chối', 'Chờ xử lý'].includes(status)) {
        return res.status(400).json({ message: "Trạng thái không hợp lệ." });
    }
    try {
        const [result] = await db.promise().query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
        }
        res.status(200).json({ message: `Đã cập nhật trạng thái đơn hàng thành công.` });
    } catch (error) {
        console.error(`Error updating order ${id}:`, error);
        res.status(500).json({ message: "Lỗi máy chủ khi cập nhật đơn hàng." });
    }
});


module.exports = router;