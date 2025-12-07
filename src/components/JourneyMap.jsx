// src/App.jsx
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
  CircleMarker
} from "react-leaflet";
import L from "leaflet";
import { STOPS } from "../data/stops";
import "leaflet/dist/leaflet.css";

// Fix icon mặc định của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// Component fly tới mốc đang chọn và zoom to
function MapFlyTo({ selectedStop }) {
  const map = useMap();

  useEffect(() => {
    if (selectedStop) {
      // zoom sát hơn (7–8 tuỳ bạn)
      map.flyTo([selectedStop.lat, selectedStop.lng], 7, {
        animate: true,
        duration: 1.2
      });
    }
  }, [selectedStop, map]);

  return null;
}

function JourneyMap({ onBackToHome }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStop, setSelectedStop] = useState(STOPS[0]);
  const [isPlaying, setIsPlaying] = useState(false); // slideshow bật/tắt

  // Slideshow tự động chuyển chặng
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % STOPS.length;
        setSelectedStop(STOPS[next]);
        return next;
      });
    }, 4000); // 4 giây/chặng

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Chọn mốc khi click list hoặc marker
  const handleSelectStop = (stop) => {
    const index = STOPS.findIndex((s) => s.id === stop.id);
    if (index !== -1) {
      setCurrentIndex(index);
      setSelectedStop(stop); // 👉 chọn mốc → MapFlyTo sẽ zoom + fly tới
    }
  };

  // Tính đường đi của CHẶNG hiện tại (chỉ vẽ khi slideshow đang chạy)
  let activeSegmentPositions = null;

  if (isPlaying && currentIndex > 0) {
    const curr = STOPS[currentIndex];
    const prev = STOPS[currentIndex - 1];

    // Nếu chặng này có pathFromPrevious thì dùng đường đó
    if (curr.pathFromPrevious && curr.pathFromPrevious.length > 0) {
      activeSegmentPositions = curr.pathFromPrevious;
    } else {
      // fallback: đường thẳng giữa 2 điểm
      activeSegmentPositions = [
        [prev.lat, prev.lng],
        [curr.lat, curr.lng]
      ];
    }
  }

  return (
    <div className="app-container">
      {/* BẢN ĐỒ */}
      <div className="map-panel">
        <MapContainer
          center={[16.047079, 108.20623]}
          zoom={4}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Tự động fly + zoom tới mốc đang chọn */}
          <MapFlyTo selectedStop={selectedStop} />

          {/* ĐƯỜNG ĐI CHỈ VẼ KHI SLIDESHOW ĐANG CHẠY */}
          {activeSegmentPositions && (
            <Polyline
              positions={activeSegmentPositions}
              pathOptions={{ color: "#dc2626", weight: 5 }}
            />
          )}

          {/* VÒNG TRÒN NỔI BẬT MỐC ĐANG CHỌN (LUÔN HIỆN, KỂ CẢ KHI KHÔNG SLIDESHOW) */}
          {selectedStop && (
            <CircleMarker
              center={[selectedStop.lat, selectedStop.lng]}
              radius={9}
              pathOptions={{
                color: "#dc2626",
                fillColor: "#fecaca",
                fillOpacity: 1
              }}
            />
          )}

          {/* Marker các mốc */}
          {STOPS.map((stop) => (
            <Marker
              key={stop.id}
              position={[stop.lat, stop.lng]}
              eventHandlers={{
                click: () => handleSelectStop(stop) // 👉 click marker cũng chọn & zoom
              }}
            >
              <Popup>
                <strong>{stop.title}</strong>
                <br />
                <span>{stop.year}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* PANEL THÔNG TIN */}
      <div className="info-panel">
        {/* Back Button */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            style={{
              marginBottom: 16,
              padding: "10px 16px",
              background: "white",
              border: "2px solid var(--vn-gold)",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--vn-red)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.3s ease",
              width: "fit-content"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--vn-gold)";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "var(--vn-red)";
            }}
          >
            <span>←</span> Về Trang Chủ
          </button>
        )}
        {/* Header Section */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 8 }}>🇻🇳 Hành Trình Chủ Tịch Hồ Chí Minh</h2>
          <p style={{
            fontSize: 14,
            color: "var(--text-medium)",
            marginTop: 0,
            lineHeight: 1.6
          }}>
            🗺️ Click vào các điểm trên bản đồ hoặc danh sách để khám phá hành trình cách mạng của Người.
          </p>

          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            style={{
              marginTop: 12,
              width: "100%",
              height: 44,
              padding: "0 20px",
              borderRadius: 12,
              border: "none",
              background: isPlaying
                ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                : "linear-gradient(135deg, var(--accent-green) 0%, var(--accent-green-dark) 100%)",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              boxShadow: "var(--shadow-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <span style={{ fontSize: 18 }}>{isPlaying ? "⏸️" : "▶️"}</span>
            {isPlaying ? "Dừng Hành Trình" : "Xem Hành Trình Tự Động"}
          </button>
        </div>

        {selectedStop && (
          <div style={{
            marginTop: 0,
            padding: 20,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(254, 249, 243, 0.4) 100%)",
            borderRadius: 16,
            border: "2px solid rgba(218, 37, 29, 0.1)",
            boxShadow: "var(--shadow-md)"
          }}>
            {/* Location badge */}
            <div style={{
              display: "inline-block",
              padding: "6px 12px",
              background: "linear-gradient(135deg, var(--vn-red) 0%, var(--vn-red-dark) 100%)",
              color: "white",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 12,
              boxShadow: "var(--shadow-sm)"
            }}>
              📍 Điểm #{selectedStop.id}
            </div>

            <h3 style={{ marginTop: 8, marginBottom: 8 }}>{selectedStop.title}</h3>
            <p style={{
              fontWeight: 600,
              color: "var(--accent-green-dark)",
              fontSize: 14,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}>
              ⏱️ Giai đoạn: {selectedStop.year}
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-medium)" }}>
              {selectedStop.summary}
            </p>

            {selectedStop.quote && (
              <blockquote>
                {selectedStop.quote}
              </blockquote>
            )}

            {selectedStop.imageUrl && (
              <img
                src={selectedStop.imageUrl}
                alt={selectedStop.title}
                style={{
                  width: "100%",
                  marginTop: 16,
                  borderRadius: 12,
                  objectFit: "cover",
                  maxHeight: 240
                }}
              />
            )}
          </div>
        )}

        <div className="stop-list">
          <h4>Các chặng đường tiêu biểu</h4>
          {STOPS.map((stop) => (
            <div
              key={stop.id}
              className={
                "stop-item " +
                (selectedStop && selectedStop.id === stop.id ? "active" : "")
              }
              onClick={() => handleSelectStop(stop)} // 👉 click list cũng zoom + highlight
            >
              <div className="stop-item-title">{stop.title}</div>
              <div className="stop-item-year">{stop.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JourneyMap;
