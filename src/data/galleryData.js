// src/data/galleryData.js
export const galleryImages = [
    {
        id: 1,
        src: 'https://ttdn.vn/Uploads/Images/2024/6/5/25/BacHo5.jpg',
        title: 'Học Trò Xa Xứ',
        description: 'Ho Chi Minh nghiên cứu tại Paris, Pháp - Thời kỳ tìm đường cứu nước',
        year: 1917,
        period: 'early',
        theme: 'intellectual'
    },
    {
        id: 2,
        src: 'https://imgnvsk.vnanet.vn/MediaUpload/Medium/2024/06/02/bac-di-tim-duong-cuu-nuoc12-15-11-422-9-5-1.jpg',
        title: 'Thuỷ Thủ Ra Khơi',
        description: 'Làm việc trên tàu biển - Khởi đầu hành trình tìm đường cứu nước',
        year: 1911,
        period: 'early',
        theme: 'daily-life'
    },
    {
        id: 3,
        src: 'https://file3.qdnd.vn/data/images/0/2021/11/20/thicuc_la/tuyentruyen.png',
        title: 'Tiếng Nói Cách Mạng',
        description: 'Diễn thuyết trước quần chúng - Truyền bá lý tưởng cách mạng',
        year: 1920,
        period: 'revolutionary',
        theme: 'leadership'
    },
    {
        id: 4,
        src: 'https://media.baobinhphuoc.com.vn/upload/news/1_2025/1738217032403_13035430012025.jpg',
        title: 'Hội Nghị Quốc Tế',
        description: 'Gặp gỡ các nhà lãnh đạo cách mạng tại Moscow',
        year: 1923,
        period: 'revolutionary',
        theme: 'international'
    },
    {
        id: 5,
        src: 'https://tuyenquang.dcs.vn/Image/Large/202249155536_85319.jpg',
        title: 'Công Trình Trí Tuệ',
        description: 'Viết lách và nghiên cứu - Xây dựng nền tảng tư tưởng',
        year: 1930,
        period: 'revolutionary',
        theme: 'intellectual'
    },
    {
        id: 6,
        src: 'https://tuyengiao.hagiang.gov.vn/upload/64711/20240303/grab58799tthcm_1.jpg',
        title: 'Thầy Giáo Cách Mạng',
        description: 'Giảng dạy cho thanh niên cách mạng - Đào tạo lực lượng',
        year: 1941,
        period: 'war',
        theme: 'leadership'
    },
    {
        id: 7,
        src: 'https://images.hcmcpv.org.vn//Uploads/Image/18052017EECB324C/18-05-2017VietBac_4.jpg',
        title: 'Căn Cứ Rừng Sâu',
        description: 'Làm việc tại căn cứ Việt Bắc - Thời kỳ kháng chiến',
        year: 1945,
        period: 'war',
        theme: 'historic'
    },
    {
        id: 8,
        src: 'https://cdn.nbtv.vn/upload/news/9_2020/bac_ho_doc_tuyen_ngon_doc_lap_ngay_02_9_1945_tai_quang_truong_ba_dinh_ha_noi_14360224092020.jpg',
        title: 'Tuyên Ngôn Độc Lập',
        description: 'Đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình - 2/9/1945',
        year: 1945,
        period: 'war',
        theme: 'historic'
    },
    {
        id: 9,
        src: 'https://dtcblehongphong.hanoi.gov.vn/documents/1560114/1661481/01+Vai+tro+DT+VNG+%C4%90BP+16082021.jpg/4e825905-617f-4c91-8ae8-aba230297be4?t=1629089311596',
        title: 'Chiến Lược Quân Sự',
        description: 'Họp bàn chiến lược với các tướng lĩnh - Chỉ đạo kháng chiến',
        year: 1950,
        period: 'war',
        theme: 'leadership'
    },
    {
        id: 10,
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDY_txpPFksTO9-a08yX2OHtDjTaYk222xyg&s',
        title: 'Ngoại Giao Quốc Tế',
        description: 'Chuyến thăm ngoại giao đến Trung Quốc - Xây dựng quan hệ',
        year: 1955,
        period: 'nation-building',
        theme: 'international'
    },
    {
        id: 11,
        src: 'https://cdn.popsww.com/blog-kids/sites/3/2022/05/nhung-cau-chuyen-ngan-ve-bac-voi-thieu-nhi.jpg?w=1130',
        title: 'Bác Và Thiếu Nhi',
        description: 'Gặp gỡ các em thiếu nhi - Tình yêu thương thế hệ trẻ',
        year: 1958,
        period: 'nation-building',
        theme: 'daily-life'
    },
    {
        id: 12,
        src: 'https://baodaklak.vn/file/fb9e3a03798789de0179a1704dea238e/old-data/dataimages/201710/original/images2583255_chuyen_chua_ke_2.jpg',
        title: 'Thăm Đồng Ruộng',
        description: 'Thăm nông dân trên cánh đồng lúa - Gần gũi với nhân dân',
        year: 1960,
        period: 'nation-building',
        theme: 'daily-life'
    }
];

export const periods = [
    { value: 'all', label: 'Tất Cả Thời Kỳ', icon: '🗓️' },
    { value: 'early', label: 'Tuổi Trẻ (1890-1911)', icon: '🌱' },
    { value: 'revolutionary', label: 'Cách Mạng (1911-1941)', icon: '✊' },
    { value: 'war', label: 'Kháng Chiến (1941-1954)', icon: '⚔️' },
    { value: 'nation-building', label: 'Xây Dựng (1954-1969)', icon: '🏗️' }
];

export const themes = [
    { value: 'all', label: 'Tất Cả Chủ Đề', icon: '🎨' },
    { value: 'leadership', label: 'Lãnh Đạo', icon: '👑' },
    { value: 'international', label: 'Quốc Tế', icon: '🌍' },
    { value: 'daily-life', label: 'Cuộc Sống', icon: '👨‍👩‍👧' },
    { value: 'historic', label: 'Lịch Sử', icon: '📜' },
    { value: 'intellectual', label: 'Trí Tuệ', icon: '📚' }
];
