// auth.js (PHIÊN BẢN NÂNG CẤP VỚI PHÂN QUYỀN)
const express = require('express');
const crypto = require('crypto');
const db = require('../config/db'); // Đảm bảo đường dẫn này đúng

const router = express.Router();

// -----------------------------------------------------------------
// API ĐĂNG KÝ
// -----------------------------------------------------------------
router.post('/signup', (req, res) => {
    console.log('Received signup request:', req.body);
    const { email, username, password, face_descriptor } = req.body;

    if (!email || !username || !password) {
        console.log('Signup failed: Missing required fields');
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ email, tên đăng nhập và mật khẩu.' });
    }

    // Băm mật khẩu bằng SHA-256 - Luôn băm trước khi truy vấn DB
    const password_hash = crypto.createHash('sha256').update(password).digest('hex');

    // Kiểm tra xem email hoặc username đã tồn tại chưa
    const checkQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(checkQuery, [email, username], (err, results) => {
        if (err) {
            console.error('Database error during check:', err.message);
            return res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
        }

        if (results.length > 0) {
            console.log('Signup failed: Email or username already exists');
            return res.status(409).json({ message: 'Email hoặc tên đăng nhập đã được sử dụng.' });
        }

        // Nếu chưa tồn tại, tạo bản ghi mới
        // Mặc định role là 'user' khi đăng ký
        const insertQuery = 'INSERT INTO users (email, username, password_hash, face_descriptor, role) VALUES (?, ?, ?, ?, ?)';
        const values = [email, username, password_hash, face_descriptor ? JSON.stringify(face_descriptor) : null, 'user'];

        db.query(insertQuery, values, (insertErr) => {
            if (insertErr) {
                console.error('Database error during insert:', insertErr.message);
                return res.status(500).json({ message: 'Lỗi máy chủ, không thể đăng ký.' });
            }
            console.log('User registered successfully:', username);
            res.status(201).json({ message: 'Đăng ký thành công!' });
        });
    });
});


// -----------------------------------------------------------------
// API ĐĂNG NHẬP (ĐÃ THÊM LOGIC PHÂN QUYỀN)
// -----------------------------------------------------------------
router.post('/signin', (req, res) => {
    console.log('Received signin request:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Login failed: Missing fields');
        return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
    }

    // Băm mật khẩu người dùng nhập để so sánh với hash trong DB
    const password_hash = crypto.createHash('sha256').update(password).digest('hex');

    // Truy vấn lấy người dùng theo username và password_hash đã băm
    // Quan trọng: Lấy cả cột `role`
    const query = 'SELECT id, username, email, role FROM users WHERE username = ? AND password_hash = ?';
    
    db.query(query, [username, password_hash], (err, results) => {
        if (err) {
            console.error('Database error during signin:', err.message);
            return res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
        }

        if (results.length === 0) {
            console.log('Login failed: Invalid credentials for user:', username);
            return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
        }

        // Đăng nhập thành công, lấy thông tin người dùng
        const user = results[0];
        console.log(`Login successful for user: ${user.username}, role: ${user.role}`);

        // **Đây là phần logic phân quyền quan trọng**
        // API trả về thông tin người dùng và quyền của họ
        res.status(200).json({
            message: 'Đăng nhập thành công!',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role // Trả về vai trò của người dùng
            }
        });
    });
});


// -----------------------------------------------------------------
// API LẤY FACE DESCRIPTORS (Không thay đổi nhiều)
// -----------------------------------------------------------------
router.get('/get-face-descriptors', (req, res) => {
    console.log('Received get-face-descriptors request');
    const query = 'SELECT username, face_descriptor FROM users WHERE face_descriptor IS NOT NULL';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        const descriptors = results.map(user => ({
            username: user.username,
            descriptor: user.face_descriptor ? JSON.parse(user.face_descriptor) : null
        }));
        console.log('Face descriptors retrieved:', descriptors.length);
        res.status(200).json(descriptors);
    });
});


module.exports = router;