import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapPin as PinIcon } from 'lucide-react';
import mapBackground from '../assets/map_background.png';
import '../css/map.css';

export default function MapView() {
  const navigate = useNavigate();
  const { reports } = useApp();
  const [selectedReport, setSelectedReport] = useState(null);

  // Map label placements
  const mapLabels = [
    { text: 'Farm ni Tengklers', x: 58, y: 22, color: '#dcfce7', textColor: '#15803d' },
    { text: 'Casa Maan', x: 37, y: 61, color: '#f1f5f9', textColor: '#334155' },
    { text: 'Mauban - Cavinti Rd', x: 56, y: 78, rotate: '-35deg', textColor: '#cbd5e1', isRoad: true },
    { text: 'Mauban - Cavinti Rd', x: 31, y: 15, rotate: '-35deg', textColor: '#cbd5e1', isRoad: true }
  ];

  const getPinColor = (status) => {
    switch (status) {
      case 'Resolved': return '#10b981'; // Green
      case 'In Progress': return '#f59e0b'; // Orange
      case 'Rejected': return '#ef4444'; // Red
      default: return '#6b7280';
    }
  };

  const handlePinClick = (report, e) => {
    e.stopPropagation();
    setSelectedReport(report);
  };

  const handleMapClick = () => {
    setSelectedReport(null);
  };

  return (
    <div onClick={handleMapClick}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="map-canvas-container">
          {/* Satellite Map Backdrop */}
          <img 
            src={mapBackground} 
            alt="Drainage satellite map view" 
            className="map-background-img" 
          />

          {/* Road and Landmark Labels (styled for realism) */}
          {mapLabels.map((lbl, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${lbl.x}%`,
                top: `${lbl.y}%`,
                transform: `translate(-50%, -50%) ${lbl.rotate ? `rotate(${lbl.rotate})` : ''}`,
                fontSize: lbl.isRoad ? '12px' : '13px',
                fontWeight: '700',
                color: lbl.textColor,
                backgroundColor: lbl.color || 'transparent',
                padding: lbl.color ? '4px 10px' : 0,
                borderRadius: '8px',
                pointerEvents: 'none',
                userSelect: 'none',
                letterSpacing: lbl.isRoad ? '1px' : '0px',
                boxShadow: lbl.color ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                textShadow: !lbl.color ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none'
              }}
            >
              {lbl.text}
            </div>
          ))}

          {/* Interactive Report Pins */}
          {reports.map((report) => (
            <div
              key={report.id}
              className="map-pin"
              style={{
                left: `${report.mapCoords.x}%`,
                top: `${report.mapCoords.y}%`
              }}
              onClick={(e) => handlePinClick(report, e)}
            >
              {/* Optional small hover tag */}
              <div className="map-pin-label">{report.issue}</div>

              <div 
                className="map-marker"
                style={{ color: getPinColor(report.status) }}
              >
                <PinIcon size={30} fill={getPinColor(report.status)} fillOpacity={0.2} />
              </div>

              {/* Popup Overlay on active pin */}
              {selectedReport && selectedReport.id === report.id && (
                <div className="map-popup" onClick={(e) => e.stopPropagation()}>
                  <div className="map-popup-title">{report.issue}</div>
                  <div className="map-popup-loc">{report.latLngLabel || report.location}</div>
                  
                  <div className="map-popup-meta">
                    <span className="map-popup-date">{report.dateSubmitted}</span>
                    <span 
                      className={`status-badge ${report.status.toLowerCase().replace(' ', '')}`}
                      style={{ padding: '2px 8px', fontSize: '10px' }}
                    >
                      {report.status}
                    </span>
                  </div>

                  <button 
                    className="map-popup-link"
                    onClick={() => navigate(`/dashboard/reports?search=${report.id}`)}
                  >
                    View details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
