// database.js (PHIÊN BẢN HOÀN CHỈNH)

const toursDB = {
    // ========== TOUR TRONG NƯỚC ==========

    "tour-phan-thiet": {
        id: "tour-phan-thiet",
        name: "Tour Phan Thiết Mũi Né Resort 3,4* - 3 ngày 2 đêm",
        price_adult_num: 2000000,
        price_child_num: 1700000,
        price_baby_num: 590000,
        price_adult_str: "2.000.000đ",
        price_child_str: "1.700.000đ",
        price_baby_str: "590.000đ",
        old_price_str: null,
        image: "images/g-2.jpg",
        itinerary_image: "images/g-7.jpg",
        breadcrumb: "Tour Trong Nước",
        schedule: "Thứ 7 hàng tuần",
        duration: "3 ngày 2 đêm",
        transport: "Di chuyển bằng Ô tô",
        start_location: "Sài Gòn - Phan Thiết",
        highlights: [
            "Khám phá đồi cát trắng và đồi cát đỏ tại Mũi Né.",
            "Thư giãn tại Trung tâm Bùn khoáng Mũi Né, trải nghiệm cảm giác mới lạ.",
            "Thưởng thức hải sản tươi sống tại làng chài địa phương."
        ],
        full_itinerary: `
            <h4>NGÀY 1: TP. HCM - PHAN THIẾT (Ăn sáng, trưa, chiều)</h4>
            <p>Đón quý khách tại văn phòng Saigontourist, khởi hành đi Bình Thuận. Đến Phan Thiết, vào khu resort Hàm Tiến - Mũi Né nhận phòng. Buổi chiều, quý khách đi <strong>Hòn Rơm</strong> tham quan đồi cát vàng dưới tác động của gió biển đã tạo nên những hình dạng rất tuyệt vời. Nghỉ đêm tại Mũi Né.</p>
            <br>
            <img src="images/g-7.jpg" alt="Itinerary Image">
            <br><br>
            <h4>NGÀY 2: THAM QUAN PHAN THIẾT (Ăn sáng, chiều / Ăn trưa tự túc)</h4>
            <p>Buổi sáng, quý khách tự do nghỉ dưỡng tại resort. Tự túc ăn trưa. Buổi chiều, xe đưa quý khách đến tham quan <strong>Trung tâm Bùn khoáng Mũi Né</strong>. Quý khách tắm khoáng (tự túc chi phí tắm bùn các loại). Tham quan <strong>Lâu Đài Rượu Vang</strong>. Nghỉ đêm tại Mũi Né.</p>
            <br>
            <h4>NGÀY 3: PHAN THIẾT - TP. HCM (Ăn sáng, trưa)</h4>
            <p>Buổi sáng, quý khách tự do nghỉ dưỡng, tắm biển đến giờ trả phòng. Khởi hành về Tp. HCM. Trên đường về ghé mua sắm đặc sản Phan Thiết. Kết thúc chương trình.</p>
        `,
        isPromotion: true
    },

    "tour-da-nang": {
        id: "tour-da-nang",
        name: "Du lịch Đà Nẵng - KDL Bà Nà - Hội An - Cố Đô Huế",
        price_adult_num: 6300000,
        price_child_num: 4800000,
        price_baby_num: 2000000,
        price_adult_str: "6.300.000đ",
        price_child_str: "4.800.000đ",
        price_baby_str: "2.000.000đ",
        old_price_str: "6.900.000đ",
        image: "images/p-4.jpg",
        itinerary_image: "images/g-6.jpg",
        breadcrumb: "Tour Giờ Chót",
        schedule: "Thứ 7 hàng tuần",
        duration: "4 ngày 3 đêm",
        transport: "Máy bay & Ô tô",
        start_location: "Hà Nội/TP.HCM - Đà Nẵng",
        highlights: [
            "Chinh phục đỉnh Bà Nà Hills, dạo bước trên Cầu Vàng.",
            "Dạo phố cổ Hội An về đêm, thả đèn hoa đăng.",
            "Tham quan Đại Nội Huế, lăng tẩm các vị vua triều Nguyễn."
        ],
        full_itinerary: `
            <h4>NGÀY 1: ĐẾN ĐÀ NẴNG - HỘI AN</h4>
            <p>Xe và HDV đón quý khách tại sân bay Đà Nẵng, khởi hành đi Hội An. Nhận phòng khách sạn. Buổi chiều, tham quan Phố cổ Hội An với Chùa Cầu, nhà cổ, hội quán. Ăn tối và tự do khám phá Hội An về đêm.</p>
            <br>
            <h4>NGÀY 2: BÀ NÀ HILLS - CẦU VÀNG</h4>
            <p>Sau bữa sáng, khởi hành đi khu du lịch Bà Nà Hills. Quý khách trải nghiệm cáp treo đạt nhiều kỷ lục thế giới. Tham quan Cầu Vàng, vườn hoa Le Jardin D'Amour, hầm rượu Debay, khu Làng Pháp. Ăn trưa buffet tại nhà hàng trên đỉnh Bà Nà. Buổi chiều quay về Đà Nẵng, tự do tắm biển Mỹ Khê.</p>
            <br><br>
            <img src="images/g-6.jpg" alt="Cầu Vàng Bà Nà Hills">
            <br><br>
            <h4>NGÀY 3: ĐÀ NẴNG - CỐ ĐÔ HUẾ</h4>
            <p>Khởi hành đi Huế, đi ngang hầm đường bộ Hải Vân. Đến Huế, tham quan Đại Nội (Hoàng Cung của 13 vị vua triều Nguyễn). Ăn trưa đặc sản Huế. Buổi chiều tham quan Lăng Khải Định. Tối du thuyền trên sông Hương và nghe ca Huế.</p>
            <br>
            <h4>NGÀY 4: HUẾ - TIỄN KHÁCH</h4>
            <p>Sau bữa sáng, tham quan Chùa Thiên Mụ. Tự do mua sắm đặc sản Huế. Xe tiễn quý khách ra sân bay Phú Bài (Huế) hoặc sân bay Đà Nẵng. Kết thúc chương trình.</p>
        `,
        isPromotion: true
    },
    
    "tour-phu-quoc": {
        id: "tour-phu-quoc",
        name: "Du lịch Phú Quốc Câu cá - Ngắm san hô",
        price_adult_num: 3500000,
        price_child_num: 2800000,
        price_baby_num: 1000000,
        price_adult_str: "3.500.000đ",
        price_child_str: "2.800.000đ",
        price_baby_str: "1.000.000đ",
        old_price_str: null,
        image: "images/g-5.jpg",
        itinerary_image: "images/g-3.jpg",
        breadcrumb: "Tour Trong Nước",
        schedule: "Hàng ngày",
        duration: "3 ngày 2 đêm",
        transport: "Máy bay & Ô tô",
        start_location: "Toàn quốc - Phú Quốc",
        highlights: [
            "Trải nghiệm câu cá, lặn ngắm san hô tại quần đảo An Thới.",
            "Tham quan nhà tù Phú Quốc, Dinh Cậu.",
            "Thưởng thức đặc sản gỏi cá trích, bún quậy."
        ],
        full_itinerary: `
            <h4>NGÀY 1: KHÁM PHÁ ĐÔNG ĐẢO</h4>
            <p>Đón khách tại sân bay Phú Quốc, về khách sạn nhận phòng. Chiều tham quan phía Đông đảo: Vườn tiêu, nhà thùng nước mắm, Dinh Cậu. Tự do tắm biển, ăn tối.</p>
            <br>
            <h4>NGÀY 2: NAM ĐẢO - CÂU CÁ & LẶN NGẮM SAN HÔ</h4>
            <p>Sáng tham quan cơ sở nuôi cấy ngọc trai. Lên tàu du lịch tại cảng An Thới, bắt đầu hành trình câu cá, lặn biển ngắm san hô. Ăn trưa trên tàu với các món hải sản tươi sống. Chiều tàu đưa về cảng, tham quan nhà tù Phú Quốc, bãi Sao. Tối tự do khám phá chợ đêm Dinh Cậu.</p>
            <br>
            <h4>NGÀY 3: TẠM BIỆT PHÚ QUỐC</h4>
            <p>Sáng tự do nghỉ dưỡng hoặc mua sắm. Xe tiễn khách ra sân bay Phú Quốc. Kết thúc chuyến đi.</p>
        `,
        isPromotion: true
    },
        "tour-ninh-chu": {
        id: "tour-ninh-chu",
        name: "Du lịch Ninh Chữ - Vịnh Vĩnh Hy",
        breadcrumb: "Tour Trong Nước",
        price_adult_num: 3200000, price_child_num: 2500000, price_baby_num: 900000,
        price_adult_str: "3.200.000đ", price_child_str: "2.500.000đ", price_baby_str: "900.000đ",
        old_price_str: null, image: "images/g-7.jpg", schedule: "Thứ 6 hàng tuần", duration: "2 ngày 1 đêm", transport: "Ô tô",
        highlights: [], full_itinerary: ""
    },
     "tour-mien-tay": {
        id: "tour-mien-tay",
        name: "Du lịch Mỹ Tho - Cần Thơ - Cà Mau - Bạc Liêu",
        breadcrumb: "Tour Trong Nước",
        price_adult_num: 2000000, price_child_num: 1600000, price_baby_num: 500000,
        price_adult_str: "2.000.000đ", price_child_str: "1.600.000đ", price_baby_str: "500.000đ",
        old_price_str: null, image: "images/p-6.jpg", schedule: "Thứ 4 hàng tuần", duration: "3 ngày 2 đêm", transport: "Ô tô",
        highlights: [], full_itinerary: ""
    },
    
    // ========== TOUR NƯỚC NGOÀI ==========

    "tour-y": {
        id: "tour-y",
        name: "Du lịch Ý [Rome - Pisa - Florence - Venice - Milan]",
        price_adult_num: 46900000,
        price_child_num: 42000000,
        price_baby_num: 15000000,
        price_adult_str: "46.900.000đ",
        price_child_str: "42.000.000đ",
        price_baby_str: "15.000.000đ",
        old_price_str: null,
        image: "images/p-1.jpg",
        itinerary_image: "images/g-8.jpg",
        breadcrumb: "Tour Nước Ngoài",
        schedule: "Thứ 2 hàng tuần",
        duration: "6 ngày 5 đêm",
        transport: "Máy bay",
        start_location: "TP.HCM - Rome",
        highlights: [
            "Chiêm ngưỡng đấu trường Colosseum tại Rome.",
            "Check-in cùng tháp nghiêng Pisa huyền thoại.",
            "Du ngoạn trên những con kênh thơ mộng tại Venice.",
            "Khám phá kinh đô thời trang Milan."
        ],
        full_itinerary: `
            <h4>NGÀY 1: ROME - ĐẤU TRƯỜNG LA MÃ</h4>
            <p>Đáp chuyến bay đến Rome. Xe đón đoàn tham quan Đấu trường Colosseum, đài phun nước Trevi. Nhận phòng khách sạn nghỉ ngơi.</p>
            <br>
            <h4>NGÀY 2: PISA - FLORENCE</h4>
            <p>Khởi hành đi Pisa, tham quan và chụp ảnh với Tháp nghiêng Pisa. Di chuyển đến Florence, tham quan nhà thờ Duomo, cầu Ponte Vecchio. Nghỉ đêm tại Florence.</p>
            <br>
            <h4>NGÀY 3: VENICE - THÀNH PHỐ TÌNH YÊU</h4>
            <p>Di chuyển đến Venice. Đoàn trải nghiệm đi thuyền Gondola (chi phí tự túc) trên các kênh đào, tham quan quảng trường St. Mark, xưởng thổi thủy tinh Murano. Nghỉ đêm tại Venice.</p>
            <br>
            <h4>NGÀY 4-5: MILAN - KINH ĐÔ THỜI TRANG</h4>
            <p>Khởi hành đến Milan. Tham quan nhà thờ Duomo Milan, tự do mua sắm tại khu phố thời trang sầm uất. Ngày 5, ra sân bay đáp chuyến bay về Việt Nam.</p>
            <br>
            <h4>NGÀY 6: VỀ ĐẾN VIỆT NAM</h4>
            <p>Đoàn về đến sân bay Tân Sơn Nhất, kết thúc chương trình.</p>
        `,
        isPromotion: true
    },

    "tour-nam-phi": {
        id: "tour-nam-phi",
        name: "Du lịch Nam Phi [Johannesburg - Pretoria - Soweto - Cape Town]",
        price_adult_num: 61990000,
        price_child_num: 55000000,
        price_baby_num: 20000000,
        price_adult_str: "61.990.000đ",
        price_child_str: "55.000.000đ",
        price_baby_str: "20.000.000đ",
        old_price_str: "75.000.000đ",
        image: "images/p-2.jpg",
        itinerary_image: "images/p-2.jpg",
        breadcrumb: "Tour Nước Ngoài",
        schedule: "Thứ 7 hàng tuần",
        duration: "7 ngày 6 đêm",
        transport: "Máy bay",
        start_location: "Hà Nội/TP.HCM - Johannesburg",
        highlights: [
            "Khám phá thế giới hoang dã tại công viên quốc gia Pilanesberg.",
            "Lên đỉnh Núi Bàn bằng cáp treo, ngắm toàn cảnh Cape Town.",
            "Tham quan Mũi Hảo Vọng - điểm cực Nam của châu Phi.",
            "Gặp gỡ những chú chim cánh cụt đáng yêu tại bãi biển Boulders."
        ],
        full_itinerary: `
            <h4>NGÀY 1-2: JOHANNESBURG - PRETORIA</h4>
            <p>Bay đến Johannesburg. Tham quan Pretoria - thủ đô hành chính của Nam Phi. Khám phá Gold Reef City - thành phố tái hiện cơn sốt vàng.</p>
            <br>
            <h4>NGÀY 3: PILANESBERG SAFARI</h4>
            <p>Cả ngày khám phá công viên quốc gia Pilanesberg bằng xe chuyên dụng. Cơ hội chiêm ngưỡng Big Five (Sư tử, Báo, Voi, Tê giác, Trâu rừng) trong môi trường tự nhiên.</p>
            <br>
            <h4>NGÀY 4: CAPE TOWN - NÚI BÀN</h4>
            <p>Đáp chuyến bay nội địa đến Cape Town. Lên đỉnh Núi Bàn bằng cáp treo xoay 360 độ, ngắm nhìn toàn cảnh thành phố và đại dương.</p>
            <br>
            <h4>NGÀY 5: BÁN ĐẢO CAPE</h4>
            <p>Tham quan bán đảo Cape, du thuyền trên vịnh Hout đến đảo Hải Cẩu, khám phá Mũi Hảo Vọng và bãi biển Boulders với hàng ngàn chú chim cánh cụt.</p>
            <br>
            <h4>NGÀY 6-7: TRỞ VỀ VIỆT NAM</h4>
            <p>Tự do mua sắm trước khi ra sân bay đáp chuyến bay về Việt Nam. Kết thúc hành trình đáng nhớ.</p>
        `,
        isPromotion: true
    },
    
    "tour-anh-scotland": {
        id: "tour-anh-scotland",
        name: "Du lịch Anh - Scotland [Lễ hội hoa Chelsea]",
        price_adult_num: 89990000,
        price_child_num: 81000000,
        price_baby_num: 30000000,
        price_adult_str: "89.990.000đ",
        price_child_str: "81.000.000đ",
        price_baby_str: "30.000.000đ",
        old_price_str: null,
        image: "images/g-4.jpg",
        itinerary_image: "images/g-4.jpg",
        breadcrumb: "Tour Nước Ngoài",
        schedule: "Khởi hành tháng 5",
        duration: "8 ngày 7 đêm",
        transport: "Máy bay & Tàu hỏa",
        start_location: "TP.HCM - London",
        highlights: [
            "Tham gia Lễ hội hoa Chelsea - triển lãm hoa lớn nhất thế giới.",
            "Khám phá các biểu tượng của London: Tháp đồng hồ Big Ben, Cung điện Buckingham.",
            "Du hành đến Scotland, khám phá lâu đài Edinburgh cổ kính.",
            "Ghé thăm quê hương của Shakespeare tại Stratford-upon-Avon."
        ],
        full_itinerary: `
            <h4>NGÀY 1-2: LONDON - CÁC BIỂU TƯỢNG</h4>
            <p>Đến London, tham quan Tháp London, Cầu Tháp, vòng quay London Eye, cung điện Buckingham.</p>
            <br>
            <h4>NGÀY 3: LỄ HỘI HOA CHELSEA</h4>
            <p>Dành cả ngày để đắm mình trong sắc màu và hương thơm tại Lễ hội hoa Chelsea, một trải nghiệm không thể quên cho người yêu thiên nhiên và nghệ thuật.</p>
            <br>
            <h4>NGÀY 4: STRATFORD-UPON-AVON & BATH</h4>
            <p>Tham quan quê hương của đại văn hào Shakespeare và thành phố cổ Bath với những nhà tắm La Mã cổ đại.</p>
            <br>
            <h4>NGÀY 5-6: EDINBURGH - SCOTLAND</h4>
            <p>Đi tàu cao tốc đến Edinburgh, thủ đô của Scotland. Tham quan lâu đài Edinburgh, dạo bước trên Royal Mile và khám phá những câu chuyện ma mị của thành phố.</p>
            <br>
            <h4>NGÀY 7-8: VỀ VIỆT NAM</h4>
            <p>Tự do mua sắm trước khi bay từ Edinburgh về Việt Nam. Kết thúc chuyến đi.</p>
        `,
        isPromotion: true
    },
        "tour-phap-ha-lan": {
        id: "tour-phap-ha-lan",
        name: "Du lịch Pháp - Bỉ - Hà Lan [Hội Hoa Tulip Keukenhof]",
        breadcrumb: "Tour Nước Ngoài",
        price_adult_num: 49990000, price_child_num: 45000000, price_baby_num: 18000000,
        price_adult_str: "49.990.000đ", price_child_str: "45.000.000đ", price_baby_str: "18.000.000đ",
        old_price_str: "55.000.000đ", image: "images/g-1.jpg", schedule: "Thứ 4 hàng tuần", duration: "7 ngày 6 đêm", transport: "Máy bay",
        highlights: [], full_itinerary: ""
    },
    "tour-chau-au": {
        id: "tour-chau-au",
        name: "Du lịch Châu Âu Pháp - Thụy Sỹ - Núi Jungfrau - Ý",
        breadcrumb: "Tour Nước Ngoài",
        price_adult_num: 85990000, price_child_num: 80000000, price_baby_num: 30000000,
        price_adult_str: "85.990.000đ", price_child_str: "80.000.000đ", price_baby_str: "30.000.000đ",
        old_price_str: null, image: "images/g-3.jpg", schedule: "Thứ 4 hàng tuần", duration: "10 ngày 9 đêm", transport: "Máy bay",
        highlights: [], full_itinerary: ""
    },
    "tour-uc": {
        id: "tour-uc",
        name: "Du lịch Úc [Melbourne - Canberra - Sydney]",
        breadcrumb: "Tour Nước Ngoài",
        price_adult_num: 52500000, price_child_num: 48000000, price_baby_num: 19000000,
        price_adult_str: "52.500.000đ", price_child_str: "48.000.000đ", price_baby_str: "19.000.000đ",
        old_price_str: null, image: "images/g-4.jpg", schedule: "Thứ 6 hàng tuần", duration: "7 ngày 6 đêm", transport: "Máy bay",
        highlights: [], full_itinerary: ""
    },
    "tour-canada": {
        id: "tour-canada",
        name: "Du lịch Canada - Cuba [Vancouver - Victoria]",
        breadcrumb: "Tour Nước Ngoài",
        price_adult_num: 95000000, price_child_num: 88000000, price_baby_num: 35000000,
        price_adult_str: "95.000.000đ", price_child_str: "88.000.000đ", price_baby_str: "35.000.000đ",
        old_price_str: "120.000.000đ", image: "images/g-8.jpg", schedule: "Thứ 3 hàng tuần", duration: "11 ngày 10 đêm", transport: "Máy bay",
        highlights: [], full_itinerary: ""
    },
    "tour-my": {
        id: "tour-my",
        name: "Du lịch Mỹ [Los Angeles - Las Vegas - Universal Studios]",
        breadcrumb: "Tour Nước Ngoài",
        price_adult_num: 78000000, price_child_num: 72000000, price_baby_num: 28000000,
        price_adult_str: "78.000.000đ", price_child_str: "72.000.000đ", price_baby_str: "28.000.000đ",
        old_price_str: null, image: "images/g-9.jpg", schedule: "Thứ 5 hàng tuần", duration: "8 ngày 7 đêm", transport: "Máy bay",
        highlights: [], full_itinerary: ""
    },
     "tour-malay-sing": {
        id: "tour-malay-sing",
        name: "Du lịch Malaysia - Singapore [Thủy cung S.E.A]",
        breadcrumb: "Tour Nước Ngoài",
        price_adult_num: 12990000, price_child_num: 11500000, price_baby_num: 4000000,
        price_adult_str: "12.990.000đ", price_child_str: "11.500.000đ", price_baby_str: "4.000.000đ",
        old_price_str: null, image: "images/g-6.jpg", schedule: "Thứ 2, 7 hàng tuần", duration: "4 ngày 3 đêm", transport: "Máy bay",
        highlights: [], full_itinerary: ""
    }
}; // <-- Đóng toursDB object tại đây

// Thêm đoạn code này vào cuối file database.js

const newsDB = [
    {
        id: 'news-1',
        title: 'Cẩm nang du lịch Đà Nẵng một ngày cho hội bạn vui chơi "sập" Đà thành',
        image: 'images/p-4.jpg',
        category: 'Kinh nghiệm du lịch',
        excerpt: 'Đà Nẵng có cả núi, đồng bằng và biển, chỉ nằm cách Hội An 30 km. Bao quanh bởi hàng loạt điểm tham quan du lịch cũng như danh lam thắng c...'
    },
    {
        id: 'news-2',
        title: 'Bí quyết du lịch Đà Lạt tự túc giá rẻ để xách túi và đi ngay không cần suy nghĩ',
        image: 'images/g-4.jpg',
        category: 'Kinh nghiệm du lịch',
        excerpt: 'Với những kinh nghiệm du lịch Đà Lạt tự túc giá rẻ được chia sẻ dưới đây, bạn hoàn toàn có thể lên kế hoạch cho một chuyến đi tuyệt vời...'
    },
    {
        id: 'news-3',
        title: 'Vui chơi thả ga cùng bạn bè tại Phan Thiết với cẩm nang du lịch chi tiết này',
        image: 'images/g-2.jpg',
        category: 'Điểm đến',
        excerpt: 'Phan Thiết không chỉ có biển xanh, cát trắng, nắng vàng mà còn có những điểm đến hấp dẫn và ẩm thực phong phú...'
    },
    {
        id: 'news-4',
        title: 'Bỏ túi ngay 8 ứng dụng du lịch không thể thiếu nếu bạn là kẻ hay "xê dịch"',
        image: 'images/g-7.jpg',
        category: 'Mẹo hay',
        excerpt: 'Trong thời đại công nghệ số, những ứng dụng du lịch thông minh sẽ là trợ thủ đắc lực cho mọi chuyến đi của bạn.'
    },
    {
        id: 'news-5',
        title: 'Vạn vật phía Bắc sắp bừng tỉnh trong xuân mới, đi đâu để "mở hàng" năm mới thật may mắn đây?',
        image: 'images/g-9.jpg',
        category: 'Điểm đến',
        excerpt: 'Mùa xuân miền Bắc mang một vẻ đẹp rất riêng, là thời điểm lý tưởng để khám phá những vùng đất mới và cầu mong một năm an lành.'
    },
    {
        id: 'news-6',
        title: 'Khám phá Bình Biên - Cổ trấn bình yên ở Trung Quốc',
        image: 'images/p-5.jpg',
        category: 'Du lịch nước ngoài',
        excerpt: 'Bình Biên là một huyện dân tộc tự trị người Miêu, cách Hà Khẩu khoảng 100km thuộc Châu Hồng Hà, huyện Vân Nam, Trung Quốc...'
    },
     {
        id: 'news-7',
        title: 'Vẻ đẹp nơi đồng quê làm bối cảnh phim \'Mắt biếc\'',
        image: 'images/g-1.jpg',
        category: 'Điểm đến',
        excerpt: 'Những sắc mùa xanh tươi đang vào vụ xen lẫn là những thửa đã thu hoạch ở làng Hà Cảng, xã Quảng Phú, huyện Quảng Điền, Thừa Thiên - Huế...'
    },
     {
        id: 'news-8',
        title: 'Băng qua ngọn núi lửa thiêng ở Nhật Bản vào mùa thu',
        image: 'images/p-1.jpg',
        category: 'Du lịch nước ngoài',
        excerpt: 'Đoạn đường Hakusan Shirakawa-go chạy qua núi Hakusan, nối liền thành phố Hakusan và làng cổ Shirakawa (tỉnh Gifu). Đây là cung...'
    }
    // Thêm các bài viết khác nếu muốn...
];

module.exports = { toursDB, newsDB };