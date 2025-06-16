// setupDatabase.js (PHIÊN BẢN CHUẨN)
const mysql = require('mysql2/promise');
const crypto = require('crypto');
const { toursDB } = require('../../travel/database.js');

const dbConfig = { host: 'localhost', user: 'root', password: '261080' };
const DB_NAME = 'tourdb';

async function setupDatabase() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        
        // XÓA DATABASE CŨ ĐỂ ĐẢM BẢO LÀM LẠI TỪ ĐẦU
        await connection.query(`DROP DATABASE IF EXISTS \`${DB_NAME}\`;`);
        console.log(`Database '${DB_NAME}' dropped successfully.`);

        // TẠO LẠI DATABASE
        await connection.query(`CREATE DATABASE \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        console.log(`Database '${DB_NAME}' created successfully.`);

        await connection.end();

        // KẾT NỐI VÀO DATABASE MỚI
        connection = await mysql.createConnection({ ...dbConfig, database: DB_NAME });
        console.log(`Connected to new database '${DB_NAME}'.`);

        // TẠO CÁC BẢNG VỚI SCHEMA CHÍNH XÁC

        await connection.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, username VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL, role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
                face_descriptor TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table 'users' created.");

        await connection.query(`
            CREATE TABLE tours (
                id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, breadcrumb VARCHAR(100), price_adult_num INT NOT NULL,
                price_child_num INT, price_baby_num INT, old_price_str VARCHAR(50), image VARCHAR(255), schedule VARCHAR(255),
                duration VARCHAR(255), transport VARCHAR(100), is_promotion BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table 'tours' created.");

        // BẢNG ORDERS VỚI CÁC CỘT RIÊNG LẺ
        await connection.query(`
            CREATE TABLE orders (
                id VARCHAR(255) PRIMARY KEY,
                user_id INT,
                customer_name VARCHAR(255) NOT NULL,
                customer_email VARCHAR(255) NOT NULL,
                customer_phone VARCHAR(20),
                customer_address TEXT,
                total_amount INT NOT NULL,
                status ENUM('Chờ xử lý', 'Đã phê duyệt', 'Đã từ chối') NOT NULL DEFAULT 'Chờ xử lý',
                order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            );
        `);
        console.log("Table 'orders' created with individual customer columns.");

        await connection.query(`
            CREATE TABLE order_items (
                id INT AUTO_INCREMENT PRIMARY KEY, order_id VARCHAR(255) NOT NULL, tour_id VARCHAR(255) NOT NULL,
                quantity_adult INT DEFAULT 0, quantity_child INT DEFAULT 0, quantity_baby INT DEFAULT 0,
                price_at_purchase INT NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
            );
        `);
        console.log("Table 'order_items' created.");

        // SEEDER
        const adminPassword = 'adminpassword';
        const adminPasswordHash = crypto.createHash('sha256').update(adminPassword).digest('hex');
        await connection.query(`INSERT INTO users (email, username, password_hash, role) VALUES (?, ?, ?, ?);`, ['admin@evotour.com', 'admin', adminPasswordHash, 'admin']);
        console.log("Admin user seeded.");

        // 2. Seed Tours (PHẦN MỚI QUAN TRỌNG)
        console.log("Seeding tours into database...");
        const tourValues = Object.values(toursDB).map(tour => [
            tour.id, tour.name, tour.breadcrumb || null, tour.price_adult_num,
            tour.price_child_num || null, tour.price_baby_num || null,
            tour.old_price_str || null, tour.image, tour.schedule || null,
            tour.duration || null, tour.transport || null, tour.isPromotion || false
        ]);

        if (tourValues.length > 0) {
            const tourQuery = `
                INSERT INTO tours (id, name, breadcrumb, price_adult_num, price_child_num, 
                price_baby_num, old_price_str, image, schedule, duration, transport, is_promotion) 
                VALUES ?
            `;
            await connection.query(tourQuery, [tourValues]);
            console.log(`${tourValues.length} tours have been seeded successfully.`);
        } else {
            console.log("No tours to seed.");
        }

        console.log("\nDatabase and data seeding completed successfully!");

    } catch (err) {
        console.error("Error during database setup:", err); // In ra toàn bộ lỗi để dễ debug
    } finally {
        if (connection) await connection.end();
    }
}

setupDatabase();