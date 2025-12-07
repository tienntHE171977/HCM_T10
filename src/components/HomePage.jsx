// src/components/HomePage.jsx
import Timeline from './Timeline';
import PhotoGallery from './PhotoGallery';
import Quiz from './Quiz';
import './HomePage.css';

function HomePage({ onStartJourney }) {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-badge">🇻🇳 Sản Phẩm Học Tập</div>
                    <h1 className="hero-title">
                        Hành Trình<br />
                        <span className="hero-title-highlight">Hồ Chí Minh</span>
                    </h1>
                    <p className="hero-description">
                        Khám phá cuộc đời và sự nghiệp vĩ đại của Chủ tịch Hồ Chí Minh
                        qua bản đồ tương tác, timeline lịch sử và quiz game thú vị
                    </p>
                    <div className="hero-buttons">
                        <button className="hero-cta-primary" onClick={onStartJourney}>
                            <span className="btn-icon">🗺️</span>
                            Bắt Đầu Hành Trình
                        </button>
                        <button
                            className="hero-cta-secondary"
                            onClick={() => {
                                document.querySelector('.timeline-section').scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            <span className="btn-icon">📅</span>
                            Xem Timeline
                        </button>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="scroll-indicator">
                        <span>Cuộn xuống để khám phá</span>
                        <div className="scroll-arrow">↓</div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <Timeline />

            {/* Photo Gallery Section */}
            <PhotoGallery />

            {/* Quiz Section */}
            <Quiz />

            {/* Footer CTA */}
            <section className="footer-cta">
                <div className="footer-cta-content">
                    <h2 className="footer-cta-title">Sẵn sàng khám phá hành trình?</h2>
                    <p className="footer-cta-text">
                        Nhấn vào bản đồ để xem chi tiết từng điểm trên hành trình cách mạng của Bác
                    </p>
                    <button className="footer-cta-btn" onClick={onStartJourney}>
                        <span className="btn-icon">🚀</span>
                        Vào Bản Đồ Tương Tác
                    </button>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
