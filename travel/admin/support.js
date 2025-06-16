// admin/support.js
document.addEventListener('DOMContentLoaded', () => {
    // Dữ liệu giả lập cho các ticket
    const supportTickets = [
        {
            id: 1, name: 'Trần Văn An', email: 'an.tran@example.com', avatar: '../images/g-2.jpg', status: 'pending',
            messages: [
                { sender: 'customer', text: 'Chào shop, tôi muốn hỏi về tour Đà Nẵng. Tour có bao gồm vé máy bay không?' },
                { sender: 'customer', text: 'Và lịch trình có thể thay đổi được không?' }
            ]
        },
        {
            id: 2, name: 'Lê Thị Bình', email: 'binh.le@example.com', avatar: '../images/g-3.jpg', status: 'answered',
            messages: [
                { sender: 'customer', text: 'Tôi đã đặt tour Nam Phi nhưng chưa nhận được email xác nhận.' },
                { sender: 'admin', text: 'Chào chị Bình, chúng tôi đã kiểm tra và gửi lại email xác nhận. Chị vui lòng kiểm tra hộp thư spam nhé.' }
            ]
        },
        {
            id: 3, name: 'Phạm Hùng', email: 'hung.pham@example.com', avatar: '../images/g-4.jpg', status: 'pending',
            messages: [
                { sender: 'customer', text: 'Tôi muốn hủy tour Phú Quốc đã đặt tuần trước, thủ tục như thế nào?' }
            ]
        }
    ];

    const ticketListEl = document.getElementById('ticket-list');
    const chatPlaceholderEl = document.getElementById('chat-placeholder');
    const chatBoxEl = document.getElementById('chat-box');
    const chatCustomerNameEl = document.getElementById('chat-customer-name');
    const chatMessagesEl = document.getElementById('chat-messages');
    const replyForm = document.querySelector('.chat-reply-form');
    let currentTicketId = null;

    // Hiển thị danh sách ticket
    function renderTicketList() {
        ticketListEl.innerHTML = supportTickets.map(ticket => `
            <div class="ticket-item" data-id="${ticket.id}">
                <img src="${ticket.avatar}" alt="avatar" class="ticket-avatar">
                <div class="ticket-info">
                    <div class="name">${ticket.name}</div>
                    <div class="preview">${ticket.messages[ticket.messages.length - 1].text}</div>
                </div>
                <div class="ticket-time">10:30 AM</div>
            </div>
        `).join('');
    }

    // Hiển thị chi tiết một ticket
    function renderTicketDetail(ticketId) {
        currentTicketId = ticketId;
        const ticket = supportTickets.find(t => t.id === ticketId);
        if (!ticket) return;

        // Cập nhật trạng thái active cho danh sách
        document.querySelectorAll('.ticket-item').forEach(item => {
            item.classList.toggle('active', item.dataset.id == ticketId);
        });

        chatPlaceholderEl.style.display = 'none';
        chatBoxEl.style.display = 'flex';
        
        chatCustomerNameEl.textContent = ticket.name;
        chatMessagesEl.innerHTML = ticket.messages.map(msg => `
            <div class="message ${msg.sender}">${msg.text}</div>
        `).join('');
        
        // Cuộn xuống tin nhắn cuối cùng
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
    }

    // Gắn sự kiện click cho danh sách ticket
    ticketListEl.addEventListener('click', e => {
        const ticketItem = e.target.closest('.ticket-item');
        if (ticketItem) {
            renderTicketDetail(parseInt(ticketItem.dataset.id));
        }
    });

    // Gắn sự kiện gửi trả lời
    replyForm.addEventListener('click', e => {
        if(e.target.id !== 'send-reply-btn' || !currentTicketId) return;

        const replyText = document.getElementById('reply-message').value.trim();
        if(replyText === '') return;

        // Thêm tin nhắn mới vào dữ liệu giả lập
        const ticket = supportTickets.find(t => t.id === currentTicketId);
        ticket.messages.push({ sender: 'admin', text: replyText });

        // Cập nhật giao diện
        renderTicketDetail(currentTicketId);
        renderTicketList(); // Cập nhật preview
        document.getElementById('reply-message').value = '';
    });
    
    // Khởi tạo
    renderTicketList();
});