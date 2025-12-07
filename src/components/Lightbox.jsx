// src/components/Lightbox.jsx
import { useEffect } from 'react';

function Lightbox({ image, onClose, onPrevious, onNext, hasNext, hasPrevious }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && hasPrevious) onPrevious();
            if (e.key === 'ArrowRight' && hasNext) onNext();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose, onPrevious, onNext, hasNext, hasPrevious]);

    if (!image) return null;

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-close" onClick={onClose}>
                    ✕
                </button>

                {hasPrevious && (
                    <button className="lightbox-nav lightbox-prev" onClick={onPrevious}>
                        ‹
                    </button>
                )}

                {hasNext && (
                    <button className="lightbox-nav lightbox-next" onClick={onNext}>
                        ›
                    </button>
                )}

                <img
                    src={image.src}
                    alt={image.title}
                    className="lightbox-image"
                />

                <div className="lightbox-caption">
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                    <span className="lightbox-year">📅 Năm {image.year}</span>
                </div>
            </div>
        </div>
    );
}

export default Lightbox;
