// src/components/Timeline.jsx
import { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/timelineData';
import './Timeline.css';

function Timeline() {
    const [activeId, setActiveId] = useState(null);

    return (
        <div className="timeline-wrapper">
            <div className="timeline-section">
                <h2 className="timeline-title">Hành Trình Qua Các Giai Đoạn</h2>
                <p className="timeline-subtitle">
                    Khám phá cuộc đời và sự nghiệp cách mạng của Chủ tịch Hồ Chí Minh
                </p>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    {TIMELINE_EVENTS.map((event, index) => (
                        <div
                            key={event.id}
                            className={`timeline-item ${activeId === event.id ? 'active' : ''}`}
                            onClick={() => setActiveId(event.id)}
                            style={{ '--delay': `${index * 0.2}s` }}
                        >
                            <div className="timeline-dot" style={{ backgroundColor: event.color }}>
                                <span className="timeline-icon">{event.icon}</span>
                            </div>

                            <div className="timeline-content">
                                <div className="timeline-period" style={{ color: event.color }}>
                                    {event.period}
                                </div>
                                <h3 className="timeline-event-title">{event.title}</h3>
                                <p className="timeline-description">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Timeline;
