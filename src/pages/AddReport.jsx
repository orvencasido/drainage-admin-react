import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { Upload, X, PlusCircle } from 'lucide-react';
import '../css/add_report.css';

export default function AddReport() {
  const { addReport } = useApp();
  const navigate = useNavigate();
  
  const [issue, setIssue] = useState('Clogged Drain');
  const [locationText, setLocationText] = useState('');
  const [description, setDescription] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    navigate('/reports');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationText.trim()) {
      alert('Please enter a location name.');
      return;
    }
    if (!description.trim()) {
      alert('Please describe the issue.');
      return;
    }

    setIsSubmitting(true);

    try {
      const savedReport = await addReport({
        issue,
        location: locationText.trim(),
        submittedBy: submittedBy.trim() || 'Admin',
        contactNo: contactNo.trim(),
        description: description.trim(),
        latLngLabel: locationText.trim()
      }, imageFile);

      alert(`Report ${savedReport.displayId} added successfully!`);
      navigate('/reports');
    } catch (submitError) {
      alert(submitError.message || 'Unable to submit report.');
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Right Column - Media Upload */}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  );
}
