// server/routes/customers.js
const express = require('express');
const db = require('../config/db'); // Đảm bảo đường dẫn này đúng
const router = express.Router();

// API [GET] /api/customers - Lấy danh sách tất cả khách hàng (role='user')
router.get('/', async (req, res) => {
    try {
        // Chỉ lấy những người dùng có vai trò là 'user'
        const [users] = await db.promise().query(
            `SELECT id, email, username, created_at FROM users WHERE role = 'user' ORDER BY created_at DESC`
        );
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ message: "Lỗi máy chủ khi lấy danh sách khách hàng." });
    }
});

// API [PUT] /api/customers/:id - Cập nhật thông tin khách hàng
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, username } = req.body;

    if (!email || !username) {
        return res.status(400).json({ message: "Email và username không được để trống." });
    }

    try {
        const [result] = await db.promise().query(
            'UPDATE users SET email = ?, username = ? WHERE id = ? AND role = "user"',
            [email, username, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng hoặc bạn không có quyền sửa." });
        }
        res.status(200).json({ message: "Cập nhật thông tin khách hàng thành công." });
    } catch (error) {
        // Xử lý lỗi trùng lặp email/username
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Email hoặc username đã được sử dụng.' });
        }
        console.error(`Error updating customer ${id}:`, error);
        res.status(500).json({ message: "Lỗi máy chủ khi cập nhật thông tin." });
    }
});

// API [DELETE] /api/customers/:id - Xóa khách hàng
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Trong một hệ thống thật, bạn có thể chỉ "vô hiệu hóa" người dùng thay vì xóa cứng
        // Ví dụ: UPDATE users SET is_active = false WHERE id = ?
        const [result] = await db.promise().query(
            'DELETE FROM users WHERE id = ? AND role = "user"', 
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng." });
        }
        res.status(200).json({ message: "Xóa khách hàng thành công." });
    } catch (error) {
        console.error(`Error deleting customer ${id}:`, error);
        res.status(500).json({ message: "Lỗi máy chủ khi xóa khách hàng." });
    }
});

module.exports = router;