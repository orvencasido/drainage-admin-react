import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Upload, MapPin, X, PlusCircle } from 'lucide-react';
import mapBackground from '../assets/map_background.png';
import '../css/add_report.css';

export default function AddReport() {
  const { setReports } = useApp();
  const navigate = useNavigate();
  
  const [issue, setIssue] = useState('Clogged Drain');
  const [locationText, setLocationText] = useState('');
  const [description, setDescription] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [mapCoords, setMapCoords] = useState(null); // { x, y }
  const [imagePreview, setImagePreview] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMapCoords({ x: Math.round(x), y: Math.round(y) });
  };

  const handleCancel = () => {
    navigate('/reports');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationText.trim()) {
      alert('Please enter a location name.');
      return;
    }
    if (!description.trim()) {
      alert('Please describe the issue.');
      return;
    }
    if (!mapCoords) {
      alert('Please click on the satellite map below to select the exact coordinates.');
      return;
    }

    // Generate next report ID
    const newReportId = `#${Math.floor(26 + Math.random() * 100)}`;
    const newReport = {
      id: newReportId,
      issue,
      location: locationText,
      status: 'In Progress',
      dateSubmitted: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      submittedBy: submittedBy.trim() || 'Admin',
      contactNo: contactNo.trim() || 'N/A',
      description,
      remarks: '',
      mapCoords,
      latLngLabel: locationText,
      imageUrl: imagePreview
    };

    setReports(prev => [newReport, ...prev]);
    alert(`Report ${newReportId} added successfully!`);
    navigate('/reports');
  };

  return (
    <div className="add-report-container">
      <form onSubmit={handleSubmit} className="add-report-form-box">
        <div className="form-grid-layout">
          {/* Left Column - General Details */}
          <div>
            <div className="form-section-title">
              <PlusCircle size={20} color="var(--primary)" />
              <span>Report Details</span>
            </div>

            <div className="input-field-group">
              <label className="input-label">Issue Type</label>
              <select
                className="select-input-box"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              >
                <option value="Clogged Drain">Clogged Drain</option>
                <option value="Flooded Street">Flooded Street</option>
                <option value="Damaged Culvert">Damaged Culvert</option>
                <option value="Overflowing Drainage">Overflowing Drainage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-field-group">
              <label className="input-label">Location (e.g. Purok 3, Barangay Hall)</label>
              <input
                type="text"
                placeholder="Enter location label"
                className="text-input-box"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
              />
            </div>

            <div className="input-field-group">
              <label className="input-label">Describe the Issue</label>
              <textarea
                placeholder="Describe details, blockages, or stagnant water depth..."
                className="desc-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="input-field-group">
                <label className="input-label">Your Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Admin"
                  className="text-input-box"
                  value={submittedBy}
                  onChange={(e) => setSubmittedBy(e.target.value)}
                />
              </div>
              <div className="input-field-group">
                <label className="input-label">Contact No. (Optional)</label>
                <input
                  type="text"
                  placeholder="09XXXXXXXXX"
                  className="text-input-box"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Media and Map Coordinates */}
          <div>
            <div className="form-section-title">
              <Upload size={20} color="var(--primary)" />
              <span>Media Upload</span>
            </div>

            <div className="input-field-group">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              
              {!imagePreview ? (
                <div className="image-upload-zone" onClick={triggerFileInput}>
                  <div className="upload-icon-wrapper">
                    <Upload size={32} />
                  </div>
                  <div className="upload-instruction">Upload photo of the report</div>
                  <div className="upload-hint">PNG, JPG, or GIF up to 5MB</div>
                </div>
              ) : (
                <div className="upload-preview-container">
                  <img
                    src={imagePreview}
                    alt="Upload Preview"
                    className="upload-preview-img"
                  />
                  <button
                    type="button"
                    className="remove-img-btn"
                    onClick={handleRemoveImage}
                    title="Remove Image"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="form-section-title" style={{ marginTop: '24px' }}>
              <MapPin size={20} color="var(--primary)" />
              <span>Select Exact Location</span>
            </div>

            <div className="mini-map-container" onClick={handleMapClick}>
              <div className="mini-map-label-overlay">Satellite Map View</div>
              <img
                src={mapBackground}
                alt="Mini Map Guide"
                className="mini-map-bg"
              />

              {mapCoords && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${mapCoords.x}%`,
                    top: `${mapCoords.y}%`,
                    transform: 'translate(-50%, -100%)',
                    color: '#ef4444',
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <MapPin size={28} fill="#ef4444" fillOpacity={0.2} />
                </div>
              )}
            </div>
            <div className="mini-map-instructions">
              {mapCoords 
                ? `Pinned coordinates: X: ${mapCoords.x}%, Y: ${mapCoords.y}%`
                : 'Click anywhere on the satellite image above to pin the exact coordinate.'}
            </div>
          </div>
        </div>
      </form>

      {/* Form Buttons outside of the main white card */}
      <div className="notif-btn-row" style={{ justifyContent: 'flex-end', marginTop: '8px' }}>
        <button
          type="button"
          className="btn-cancel-notif"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-send-notif"
          onClick={handleSubmit}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}
