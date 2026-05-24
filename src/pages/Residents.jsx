import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Trash2, UserPlus, X } from 'lucide-react';
import '../css/residents.css';

export default function Residents() {
  const { 
    residents, 
    addResident, 
    deleteResident, 
    toggleResidentStatus 
  } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  // Handle Add Resident Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !email.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    addResident({ name, contact, email });
    
    // Clear form and close modal
    setName('');
    setContact('');
    setEmail('');
    setIsModalOpen(false);
  };

  // Filter residents
  const filteredResidents = residents.filter(res => 
    res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.contact.includes(searchQuery)
  );

  return (
    <div>
      <div className="section-header" style={{ marginBottom: '24px', justifyContent: 'flex-end' }}>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Search Resident */}
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search resident..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <span className="clear-search-icon" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </span>
            )}
          </div>

          {/* Add Resident Button */}
          <button 
            className="btn-primary" 
            onClick={() => setIsModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px' }}
          >
            <UserPlus size={18} />
            <span>Add Resident</span>
          </button>
        </div>
      </div>

      {/* Residents Table */}
      <div className="card" style={{ padding: '8px 24px 24px' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidents.length > 0 ? (
                filteredResidents.map((res) => (
                  <tr key={res.id}>
                    <td>{res.name}</td>
                    <td>{res.contact}</td>
                    <td>{res.email}</td>
                    <td>
                      <button
                        title="Click to toggle status"
                        className={`status-toggle-btn ${res.status.toLowerCase()}`}
                        onClick={() => toggleResidentStatus(res.id)}
                      >
                        {res.status}
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn-delete"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${res.name}?`)) {
                            deleteResident(res.id);
                          }
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No residents found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Resident Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Resident</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Juan Dela Cruz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="e.g. 09242586524"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. juan@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
