# ✈️ VistaNest Travels

> A travel website project created using **HTML, CSS and JavaScript, Python**.

🌐 **➡️ [Live Demo](https://nguyenthonhan.github.io/Service_Travel/client)

---

## 📋 Phân tích Yêu cầu

### a. 🎯 Đặt vấn đề bài toán

Hệ thống **quản lý tour du lịch** giúp người dùng:
- Tìm kiếm tour du lịch
- Đăng ký và thanh toán trực tuyến một cách tiện lợi

Tích hợp thêm:
- 🤖 **Chatbot AI** hỗ trợ tư vấn, giải đáp thắc mắc
- 🧠 **Đăng nhập bằng nhận diện khuôn mặt** giúp tăng cường bảo mật và cá nhân hóa trải nghiệm

---

### b. 👥 Tác nhân (Actors)

- **👤 User (Khách hàng)**: sử dụng hệ thống để tra cứu, đăng ký tour
- **🛠️ Admin (Quản trị viên)**: quản lý hệ thống và tương tác với chatbot

---

### c. ⚙️ Phân tích chức năng theo tác nhân

#### 👉 User:
- Đăng nhập bằng khuôn mặt
- Tìm kiếm tour
- Xem thông tin chi tiết tour
- Đăng ký tour
- Thanh toán trực tuyến
- Hỏi đáp, nhận tư vấn từ chatbot AI

#### 👉 Admin:
- Quản lý danh sách tour (thêm/sửa/xoá)
- Quản lý người dùng
- Quản lý giao dịch, thống kê
- Cập nhật và quản lý chatbot AI
- Hỗ trợ tư vấn người dùng qua hệ thống chatbot

---

## 🛠️ Đặc tả và Thiết kế

### a. 📌 Use Case Diagram & Mô tả

Hệ thống gồm hai tác nhân chính: **User** và **Admin**.  
- **User**: có thể tìm kiếm tour, xem thông tin, đăng ký, thanh toán, và sử dụng chatbot.  
- **Admin**: có quyền quản lý tour, người dùng, chatbot, giao dịch và tư vấn khách hàng.

#### 🧩 Use Case Diagram

![Use Case Diagram](images/usecase-diagram.png.png)

---

### b. 🔁 Flow (Activity Flow)

Sử dụng **Activity Diagram** để mô tả luồng xử lý đặt tour:

![Flow Activity Flow](images/tuần_tự.drawio.png).

### c. 🧠 Class Diagram

Biểu đồ Lớp của hệ thống VistaNest:

![Class Diagram](images/Class.drawio.png).

## 🚀 Hướng Dẫn Chạy Chương Trình

📦 Khởi tạo Dự án và Cài đặt Thư viện: 

Mở terminal tại thư mục gốc của dự án. 

Chạy lệnh npm install . 

🗃️ Thiết lập Cơ sở dữ liệu: 

Bước 2.1: Đảm bảo dịch vụ MySQL đang hoạt động. 

Bước 2.2: node setupDatabase.js 

🚀 Khởi chạy các Dịch vụ Backend: 

Bước 3.1: Khởi chạy Core Service (Node.js): Mở một terminal mới, di chuyển vào thư mục server và chạy lệnh: 

node index.js 

Kết quả mong đợi: Server chính lắng nghe trên cổng 3000 và kết nối thành công tới CSDL. 

Bước 3.2: Khởi chạy AI Service (Python): Mở một terminal khác, di chuyển vào thư mục chat và chạy lệnh: 

python chat.py 

Kết quả mong đợi: Service chatbot lắng nghe trên cổng 5000, sẵn sàng nhận yêu cầu từ Core Service. 

🌐 Khởi chạy Giao diện Người dùng (Frontend): 

Mở một terminal cuối cùng, di chuyển vào thư mục client (hoặc travel) và sử dụng live-server để phục vụ các file tĩnh. 

live-server 
