// =======================================================
// KHỞI TẠO KHI TRANG TẢI XONG
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    // Gắn tất cả các sự kiện cần thiết cho trang
    setupAuthEvents();
    setupUIEvents(); // Giữ lại nếu các trang khác có dùng
});


// =======================================================
// HÀM GẮN SỰ KIỆN CHO CÁC NÚT XÁC THỰC
// =======================================================
function setupAuthEvents() {
    // Tìm các nút bấm trên trang hiện tại
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const faceSignupBtn = document.getElementById('face-signup-btn');
    const faceSigninBtn = document.getElementById('face-signin-btn');

    // Gắn sự kiện 'click' cho các nút nếu chúng tồn tại
    if (signupBtn) {
        signupBtn.addEventListener('click', handleSignup);
        console.log("Sự kiện đã được gắn cho nút Đăng Ký.");
    }
    if (signinBtn) {
        signinBtn.addEventListener('click', handleSignin);
        console.log("Sự kiện đã được gắn cho nút Đăng Nhập.");
    }
    if (faceSignupBtn) {
        // Đảm bảo hàm handleFaceSignup tồn tại trước khi gắn
        if (typeof handleFaceSignup === 'function') {
            faceSignupBtn.addEventListener('click', handleFaceSignup);
            console.log("Sự kiện đã được gắn cho nút Đăng Ký Khuôn mặt.");
        } else {
            console.error("Hàm handleFaceSignup không tồn tại. Kiểm tra file faceRecognition.js.");
        }
    }
    if (faceSigninBtn) {
        // Đảm bảo hàm handleFaceSignin tồn tại trước khi gắn
        if (typeof handleFaceSignin === 'function') {
            faceSigninBtn.addEventListener('click', handleFaceSignin);
            console.log("Sự kiện đã được gắn cho nút Đăng Nhập Khuôn mặt.");
        } else {
             console.error("Hàm handleFaceSignin không tồn tại. Kiểm tra file faceRecognition.js.");
        }
    }
}


// =======================================================
// HÀM XỬ LÝ ĐĂNG KÝ
// =======================================================
async function handleSignup() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!email || !username || !password) {
        alert('Vui lòng điền đầy đủ các trường.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', {
            email,
            username,
            password
        });
        alert(response.data.message);
        window.location.reload();
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Lỗi khi đăng ký.';
        alert('Lỗi: ' + errorMessage);
    }
}

// =======================================================
// HÀM XỬ LÝ ĐĂNG NHẬP
// =======================================================
async function handleSignin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Vui lòng điền đầy đủ các trường.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/api/auth/signin', {
            username,
            password
        });
        
        alert(response.data.message);

        if (response.data.user) {
            localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
            const redirectPath = response.data.user.role === 'admin' ? '/travel/admin/admin.html' : '/travel/main.html';
            window.location.href = redirectPath;
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Lỗi khi đăng nhập.';
        alert('Lỗi: ' + errorMessage);
    }
}


// =======================================================
// CÁC HÀM XỬ LÝ GIAO DIỆN (GIỮ NGUYÊN)
// =======================================================

const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('.search-bar-container');
const menu = document.querySelector('#menu-bar');
const navbar = document.querySelector('.navbar');
const videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () => {
    // Thêm kiểm tra null để tránh lỗi trên các trang không có phần tử này
    if(searchBtn) searchBtn.classList.remove('fa-times');
    if(searchBar) searchBar.classList.remove('active');
    if(menu) menu.classList.remove('fa-times');
    if(navbar) navbar.classList.remove('active');
};

if(menu) {
    menu.addEventListener('click', () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });
}

if(searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchBtn.classList.toggle('fa-times');
        searchBar.classList.toggle('active');
    });
}

if(videoBtn.length > 0) {
    videoBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeControl = document.querySelector('.controls .active');
            if(activeControl) activeControl.classList.remove('active');
            btn.classList.add('active');
            let src = btn.getAttribute('data-src');
            const videoSlider = document.querySelector('#video-slider');
            if(videoSlider) videoSlider.src = src;
        });
    });
}

// Kiểm tra sự tồn tại của thư viện Swiper trước khi khởi tạo
if (typeof Swiper !== 'undefined') {
    const swiperReview = new Swiper(".review-slider", {
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: { 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });

    const swiperBrand = new Swiper(".brand-slider", {
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: { 450: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 991: { slidesPerView: 4 }, 1200: { slidesPerView: 5 } },
    });
}