// server/config/db.js (PHIÊN BẢN SỬA LỖI BIẾN)
const mysql = require('mysql2');

// Khai báo biến 'pool' và gán kết quả của createPool vào nó
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '261080', // Thay bằng mật khẩu của bạn
    database: 'tourdb',
    waitForConnections: true,
connectionLimit: 10,
    queueLimit: 0
});

console.log('MySQL Connection Pool đã được tạo cho database "tourdb".');

// Bây giờ biến 'pool' đã tồn tại và có thể được export
module.exports = pool;