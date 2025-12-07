// src/components/PhotoGallery.jsx
import { useState } from 'react';
import { galleryImages, periods, themes } from '../data/galleryData';
import Lightbox from './Lightbox';
import './PhotoGallery.css';

function PhotoGallery() {
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [selectedTheme, setSelectedTheme] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);

    // Filter images based on selected period and theme
    const filteredImages = galleryImages.filter(image => {
        const periodMatch = selectedPeriod === 'all' || image.period === selectedPeriod;
        const themeMatch = selectedTheme === 'all' || image.theme === selectedTheme;
        return periodMatch && themeMatch;
    });

    const openLightbox = (image) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    const showNextImage = () => {
        const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
        if (currentIndex < filteredImages.length - 1) {
            setLightboxImage(filteredImages[currentIndex + 1]);
        }
    };

    const showPreviousImage = () => {
        const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
        if (currentIndex > 0) {
            setLightboxImage(filteredImages[currentIndex - 1]);
        }
    };

    const currentIndex = lightboxImage ? filteredImages.findIndex(img => img.id === lightboxImage.id) : -1;
    const hasNext = currentIndex < filteredImages.length - 1;
    const hasPrevious = currentIndex > 0;

    return (
        <section className="gallery-section">
            <div className="gallery-container">
                {/* Header */}
                <div className="gallery-header">
                    <div className="gallery-badge">📸 Thư Viện Ảnh</div>
                    <h2 className="gallery-title">Bộ Sưu Tập Ảnh Lịch Sử</h2>
                    <p className="gallery-description">
                        Khám phá những khoảnh khắc đáng nhớ trong cuộc đời và sự nghiệp vĩ đại của Chủ tịch Hồ Chí Minh
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="gallery-filters">
                    <div className="filter-group">
                        <label className="filter-label">Thời Kỳ:</label>
                        <div className="filter-buttons">
                            {periods.map(period => (
                                <button
                                    key={period.value}
                                    className={`filter-btn ${selectedPeriod === period.value ? 'active' : ''}`}
                                    onClick={() => setSelectedPeriod(period.value)}
                                >
                                    <span className="filter-icon">{period.icon}</span>
                                    {period.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Chủ Đề:</label>
                        <div className="filter-buttons">
                            {themes.map(theme => (
                                <button
                                    key={theme.value}
                                    className={`filter-btn ${selectedTheme === theme.value ? 'active' : ''}`}
                                    onClick={() => setSelectedTheme(theme.value)}
                                >
                                    <span className="filter-icon">{theme.icon}</span>
                                    {theme.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="gallery-count">
                    Hiển thị <strong>{filteredImages.length}</strong> ảnh
                </div>

                {/* Gallery Grid */}
                <div className="gallery-grid">
                    {filteredImages.map(image => (
                        <div
                            key={image.id}
                            className="gallery-item"
                            onClick={() => openLightbox(image)}
                        >
                            <div className="gallery-item-image-wrapper">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="gallery-item-image"
                                />
                                <div className="gallery-item-overlay">
                                    <div className="gallery-item-icon">🔍</div>
                                </div>
                            </div>
                            <div className="gallery-item-info">
                                <h3 className="gallery-item-title">{image.title}</h3>
                                <p className="gallery-item-year">📅 {image.year}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredImages.length === 0 && (
                    <div className="gallery-empty">
                        <div className="gallery-empty-icon">🔍</div>
                        <p>Không tìm thấy ảnh phù hợp với bộ lọc này</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <Lightbox
                    image={lightboxImage}
                    onClose={closeLightbox}
                    onNext={showNextImage}
                    onPrevious={showPreviousImage}
                    hasNext={hasNext}
                    hasPrevious={hasPrevious}
                />
            )}
        </section>
    );
}

export default PhotoGallery;
