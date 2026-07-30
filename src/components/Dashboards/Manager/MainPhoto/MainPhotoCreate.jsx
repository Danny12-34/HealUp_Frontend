import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://heal-up-backend-pi.vercel.app/api/mainphotos';

export default function MainPhotoCreate({ editingPhoto, onClearEdit }) {
  const [form, setForm] = useState({ photo_name: '', description: '', direction: '', image: null });
  const [isHovered, setIsHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);

  useEffect(() => {
    if (editingPhoto) {
      setForm({ 
        photo_name: editingPhoto.photo_name, 
        description: editingPhoto.description, 
        direction: editingPhoto.direction, 
        image: null 
      });
    }
  }, [editingPhoto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(key => { if (form[key] !== null) fd.append(key, form[key]); });

    if (editingPhoto) {
      await axios.put(`${API}/${editingPhoto.photo_id}`, fd);
      onClearEdit();
    } else {
      await axios.post(API, fd);
    }

    setForm({ photo_name: '', description: '', direction: '', image: null });
    window.location.reload();
  };

  // --- Internal Styles ---
  const styles = {
    container: {
      maxWidth: '650px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      border: '1px solid #eaeaea',
    },
    header: {
      marginBottom: '24px',
      fontSize: '22px',
      fontWeight: '600',
      color: '#1a202c',
      borderBottom: '2px solid #f0f4f8',
      paddingBottom: '12px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    fullWidth: {
      gridColumn: 'span 2',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4a5568',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '15px',
      border: '1px solid #cbd5e0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box',
      backgroundColor: '#fdfdfe',
    },
    textarea: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '15px',
      border: '1px solid #cbd5e0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box',
      backgroundColor: '#fdfdfe',
      minHeight: '100px',
      resize: 'vertical',
    },
    fileInput: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px dashed #cbd5e0',
      borderRadius: '8px',
      backgroundColor: '#f7fafc',
      cursor: 'pointer',
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      marginTop: '10px',
    },
    submitBtn: {
      backgroundColor: editingPhoto ? '#d69e2e' : '#3182ce',
      color: '#ffffff',
      padding: '12px 24px',
      fontSize: '15px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.1s',
      boxShadow: '0 4px 12px rgba(49, 130, 206, 0.2)',
    },
    cancelBtn: {
      backgroundColor: '#e2e8f0',
      color: '#4a5568',
      padding: '12px 20px',
      fontSize: '15px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <h3 style={styles.header}>
          {editingPhoto ? '✏️ Update Main Photo' : '📸 Upload New Main Photo'}
        </h3>
        
        <div style={styles.grid}>
          {/* Photo Name */}
          <div>
            <label style={styles.label}>Photo Name</label>
            <input 
              type="text" 
              placeholder="e.g., Banner Hero" 
              value={form.photo_name} 
              onChange={e => setForm({...form, photo_name: e.target.value})} 
              style={styles.input} 
              required 
            />
          </div>

          {/* Direction */}
          <div>
            <label style={styles.label}>Direction / Placement</label>
            <input 
              type="text" 
              placeholder="e.g., Home Top" 
              value={form.direction} 
              onChange={e => setForm({...form, direction: e.target.value})} 
              style={styles.input} 
            />
          </div>

          {/* Description */}
          <div style={styles.fullWidth}>
            <label style={styles.label}>Description</label>
            <textarea 
              placeholder="Enter photo details or purpose..." 
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
              style={styles.textarea} 
            />
          </div>

          {/* File Input */}
          <div style={styles.fullWidth}>
            <label style={styles.label}>Upload Image File</label>
            <input 
              type="file" 
              onChange={e => setForm({...form, image: e.target.files[0]})} 
              style={styles.fileInput} 
            />
          </div>

          {/* Action Buttons */}
          <div style={{ ...styles.fullWidth, ...styles.buttonContainer }}>
            <button 
              type="submit" 
              style={{
                ...styles.submitBtn,
                backgroundColor: editingPhoto ? '#b7791f' : '#2b6cb0',
                transform: isHovered ? 'translateY(-1px)' : 'none'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {editingPhoto ? 'Save Changes' : 'Upload Photo'}
            </button>

            {editingPhoto && (
              <button 
                type="button" 
                onClick={onClearEdit} 
                style={{
                  ...styles.cancelBtn,
                  backgroundColor: isCancelHovered ? '#cbd5e0' : '#e2e8f0'
                }}
                onMouseEnter={() => setIsCancelHovered(true)}
                onMouseLeave={() => setIsCancelHovered(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}