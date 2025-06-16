// faceRecognition.js
let stream = null;

// Tải các mô hình Face-api.js từ CDN để tăng tốc độ
async function loadFaceApiModels() {
    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights'),
            faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights'),
            faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights')
        ]);
        console.log('Face-api models loaded successfully');
    } catch (error) {
        console.error('Error loading Face-api models:', error);
        alert('Failed to load face recognition models. Please try again.');
        throw error;
    }
}

// Khởi động webcam
async function startWebcam() {
    const video = document.getElementById('video');
    const faceRecognitionSection = document.getElementById('face-recognition-section');
    const loading = document.getElementById('loading');

    if (!video || !faceRecognitionSection || !loading) {
        console.error('Required DOM elements not found');
        alert('Required elements for face recognition are missing.');
        return false;
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } }); // Giảm độ phân giải để tăng tốc
        video.srcObject = stream;
        faceRecognitionSection.style.display = 'block';
        loading.style.display = 'block';
        return true;
    } catch (error) {
        console.error('Error accessing webcam:', error);
        alert('Cannot access webcam. Please ensure you have granted permission.');
        return false;
    }
}

// Dừng webcam
function stopWebcam() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    const faceRecognitionSection = document.getElementById('face-recognition-section');
    const loading = document.getElementById('loading');
    if (faceRecognitionSection) faceRecognitionSection.style.display = 'none';
    if (loading) loading.style.display = 'none';
}

// Tính khoảng cách Euclidean giữa hai descriptor
function computeDistance(descriptor1, descriptor2) {
    if (descriptor1.length !== descriptor2.length) return Infinity;
    return Math.sqrt(
        descriptor1.reduce((sum, val, i) => sum + (val - descriptor2[i]) ** 2, 0)
    );
}

// Phát hiện khuôn mặt với tối ưu hóa tốc độ
async function detectFaceWithRetries(video, maxAttempts = 1, interval = 200) { // Giảm maxAttempts và interval
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.6 }); // Giảm inputSize và tăng scoreThreshold
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(`Detecting face - Attempt ${attempt}/${maxAttempts}`);
        try {
            const detection = await faceapi
                .detectSingleFace(video, options)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (detection) {
                console.log('Face detected successfully');
                return detection;
            }
        } catch (error) {
            console.error(`Detection attempt ${attempt} failed:`, error);
        }
        await new Promise(resolve => setTimeout(resolve, interval));
    }
    console.log('Failed to detect face after all attempts');
    return null;
}

// Đăng ký bằng khuôn mặt
async function handleFaceSignup() {
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!emailInput || !usernameInput || !passwordInput) {
        console.error('Form fields not found');
        alert('Form fields are missing. Please check the form structure.');
        return;
    }

    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !username || !password) {
        console.log('Validation failed: Missing fields');
        alert('Please fill in all fields before using face recognition');
        return;
    }

    try {
        // Tải mô hình và khởi động webcam
        await loadFaceApiModels();
        const webcamStarted = await startWebcam();
        if (!webcamStarted) return;

        const video = document.getElementById('video');

        // Chờ 500ms để video ổn định (giảm thời gian chờ)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Phát hiện khuôn mặt
        const detection = await detectFaceWithRetries(video);

        stopWebcam();

        if (!detection) {
            alert('No face detected. Please try again with better lighting and ensure your face is fully in the frame.');
            return;
        }

        const descriptor = Array.from(detection.descriptor);

        // Gửi dữ liệu đến API signup
        const response = await axios.post('http://localhost:3000/api/auth/signup', {
            email,
            username,
            password,
            face_descriptor: descriptor
        });
        console.log('Face signup response:', response.data);
        alert(response.data.message);
        window.location.href = '/travel/index.html';
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during face signup';
        console.error('Face signup error:', errorMessage);
        alert(errorMessage);
    }
}

// Đăng nhập bằng khuôn mặt
async function handleFaceSignin() {
    try {
        // Tải mô hình và khởi động webcam
        await loadFaceApiModels();
        const webcamStarted = await startWebcam();
        if (!webcamStarted) return;

        const video = document.getElementById('video');

        // Chờ 500ms để video ổn định
        await new Promise(resolve => setTimeout(resolve, 500));

        // Phát hiện khuôn mặt
        const detection = await detectFaceWithRetries(video);

        stopWebcam();

        if (!detection) {
            alert('No face detected. Please try again with better lighting and ensure your face is fully in the frame.');
            return;
        }

        const newDescriptor = Array.from(detection.descriptor);

        // Lấy danh sách descriptor từ database
        const response = await axios.get('http://localhost:3000/api/auth/get-face-descriptors');
        const users = response.data;

        if (!users || users.length === 0) {
            alert('No face data found in the database. Please sign up with face recognition first.');
            return;
        }

        // So sánh descriptor mới với các descriptor trong database
        let matchedUser = null;
        const threshold = 0.6; // Ngưỡng so sánh

        for (const user of users) {
            const storedDescriptor = user.descriptor;
            const distance = computeDistance(newDescriptor, storedDescriptor);
            console.log(`Distance for user ${user.username}: ${distance}`);
            if (distance < threshold) {
                matchedUser = user;
                break;
            }
        }

        if (matchedUser) {
            alert(`Login successful with face recognition! Welcome, ${matchedUser.username}!`);
            localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
            window.location.href = matchedUser.role === 'admin' ? '/travel/admin/admin.html' : '/travel/main.html';
        } else {
            alert('No matching face found. Please try again with the same lighting and angle as during signup.');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during face signin';
        console.error('Face signin error:', errorMessage);
        alert(errorMessage);
    }
}