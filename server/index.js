// server/index.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders'); // <-- THÊM DÒNG NÀY
const customerRoutes = require('./routes/customers');

const app = express();
const port = 3000;

// ===== CẤU HÌNH CORS NÂNG CAO =====
const corsOptions = {
    // Cho phép truy cập từ tất cả các origin của live-server
    // Hoặc bạn có thể chỉ định chính xác: 'http://127.0.0.1:8080'
    origin: '*', 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes); // <-- THÊM DÒNG NÀY

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});