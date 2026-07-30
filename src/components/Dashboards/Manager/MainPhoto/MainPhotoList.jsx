import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://heal-up-backend-pi.vercel.app/mainphoto';

// ==========================================
// 1. MAIN PHOTO LIST COMPONENT
// ==========================================
export function MainPhotoList({ onEdit, onAddNew }) {
  const [photos, setPhotos] = useState([]);
  const [editHover, setEditHover] = useState(null);
  const [deleteHover, setDeleteHover] = useState(null);
  const [addHover, setAddHover] = useState(false);

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(API);
      setPhotos(res.data);
    } catch (err) {
      console.error("Error fetching photos", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      await axios.delete(`${API}/${id}`);
      fetchPhotos();
    }
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      border: '1px solid #eaeaea',
    },
    headerWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      borderBottom: '2px solid #f0f4f8',
      paddingBottom: '12px',
    },
    header: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#1a202c',
      margin: 0,
    },
    addBtn: (isHovered) => ({
      backgroundColor: isHovered ? '#276749' : '#38a169',
      color: '#ffffff',
      border: 'none',
      padding: '10px 18px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    imageContainer: {
      width: '100%',
      height: '180px',
      backgroundColor: '#edf2f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderBottom: '1px solid #e2e8f0',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    photoBadgeOverlay: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: '#ffffff',
      padding: '3px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '600',
    },
    cardBody: {
      padding: '16px',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '8px',
    },
    badge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: '#ebf8ff',
      color: '#2b6cb0',
    },
    actionContainer: {
      display: 'flex',
      gap: '10px',
      padding: '0 16px 16px 16px',
    },
    editBtn: (isHovered) => ({
      flex: 1,
      backgroundColor: isHovered ? '#b7791f' : '#d69e2e',
      color: '#ffffff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
      transition: 'background-color 0.2s',
    }),
    deleteBtn: (isHovered) => ({
      flex: 1,
      backgroundColor: isHovered ? '#9b1c1c' : '#e53e3e',
      color: '#ffffff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
      transition: 'background-color 0.2s',
    }),
    emptyState: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      padding: '40px',
      color: '#718096',
      fontStyle: 'italic',
      fontSize: '15px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <h2 style={styles.header}>🖼️ Main Photo Directory</h2>
        <button 
          onClick={onAddNew} 
          style={styles.addBtn(addHover)}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
        >
          ➕ Add New Photo
        </button>
      </div>
      
      <div style={styles.grid}>
        {photos.length > 0 ? (
          photos.map((m) => {
            const photoUrl = m.image;

            return (
              <div key={m.photo_id} style={styles.card}>
                <div>
                  <div style={styles.imageContainer}>
                    {photoUrl ? (
                      <>
                        <img 
                          src={photoUrl} 
                          alt={m.photo_name} 
                          style={styles.image} 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div style={styles.photoBadgeOverlay}>Photo</div>
                      </>
                    ) : (
                      <span style={{ color: '#a0aec0', fontSize: '14px' }}>No Image Provided</span>
                    )}
                  </div>

                  <div style={styles.cardBody}>
                    <div style={styles.cardTitle}>{m.photo_name}</div>
                    <div>
                      <span style={styles.badge}>Direction: {m.direction || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.actionContainer}>
                  <button 
                    onClick={() => onEdit(m)} 
                    style={styles.editBtn(editHover === m.photo_id)}
                    onMouseEnter={() => setEditHover(m.photo_id)}
                    onMouseLeave={() => setEditHover(null)}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(m.photo_id)} 
                    style={styles.deleteBtn(deleteHover === m.photo_id)}
                    onMouseEnter={() => setDeleteHover(m.photo_id)}
                    onMouseLeave={() => setDeleteHover(null)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={styles.emptyState}>No photos found.</div>
        )}
      </div>
    </div>
  );
}


// ==========================================
// 2. MAIN PHOTO FORM COMPONENT (Add / Edit)
// ==========================================
export function MainPhotoForm({ photoData, isEditMode, onCancel, onSuccess }) {
  const [photoName, setPhotoName] = useState('');
  const [direction, setDirection] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (isEditMode && photoData) {
      setPhotoName(photoData.photo_name || '');
      setDirection(photoData.direction || '');
      setPreview(photoData.image || '');
    }
  }, [isEditMode, photoData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('photo_name', photoName);
      formData.append('direction', direction);
      if (imageFile) {
        formData.append('image', imageFile); // matches upload.single('image') on backend
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (isEditMode) {
        await axios.put(`${API}/${photoData.photo_id}`, formData, config);
      } else {
        await axios.post(API, formData, config);
      }

      onSuccess();
    } catch (err) {
      console.error("Error saving photo", err);
      alert("Failed to save photo.");
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      border: '1px solid #eaeaea',
    },
    header: {
      marginBottom: '20px',
      fontSize: '22px',
      fontWeight: '600',
      color: '#1a202c',
      borderBottom: '2px solid #f0f4f8',
      paddingBottom: '12px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '6px',
      color: '#2d3748',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '6px',
      border: '1px solid #cbd5e0',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    fileInput: {
      width: '100%',
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #cbd5e0',
      fontSize: '14px',
      backgroundColor: '#f8fafc',
      cursor: 'pointer',
      boxSizing: 'border-box',
    },
    previewContainer: {
      marginTop: '10px',
      width: '120px',
      height: '120px',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #e2e8f0',
      backgroundColor: '#edf2f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    previewImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px',
    },
    submitBtn: {
      flex: 1,
      backgroundColor: '#3182ce',
      color: '#fff',
      border: 'none',
      padding: '12px',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
    },
    cancelBtn: {
      flex: 1,
      backgroundColor: '#e2e8f0',
      color: '#2d3748',
      border: 'none',
      padding: '12px',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{isEditMode ? '✏️ Edit Photo' : '➕ Add New Photo'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Photo Name:</label>
          <input 
            type="text" 
            value={photoName} 
            onChange={(e) => setPhotoName(e.target.value)} 
            required 
            style={styles.input}
            placeholder="Enter photo name"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Direction:</label>
          <input 
            type="text" 
            value={direction} 
            onChange={(e) => setDirection(e.target.value)} 
            style={styles.input}
            placeholder="Enter direction"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Image:</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
            style={styles.fileInput}
          />
          {preview && (
            <div style={styles.previewContainer}>
              <img src={preview} alt="Preview" style={styles.previewImage} />
            </div>
          )}
        </div>

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitBtn}>
            {isEditMode ? 'Update Photo' : 'Save Photo'}
          </button>
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


// ==========================================
// 3. MAIN MANAGER COMPONENT (Router / Controller)
// ==========================================
export default function MainPhotoManager() {
  const [currentView, setCurrentView] = useState('LIST');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleAddNew = () => {
    setSelectedPhoto(null);
    setCurrentView('ADD');
  };

  const handleEdit = (photo) => {
    setSelectedPhoto(photo);
    setCurrentView('EDIT');
  };

  const handleBackToList = () => {
    setSelectedPhoto(null);
    setCurrentView('LIST');
  };

  return (
    <div style={{ backgroundColor: '#f7fafc', minHeight: '100vh', padding: '20px' }}>
      {currentView === 'LIST' && (
        <MainPhotoList 
          onAddNew={handleAddNew} 
          onEdit={handleEdit} 
        />
      )}

      {(currentView === 'ADD' || currentView === 'EDIT') && (
        <MainPhotoForm 
          photoData={selectedPhoto} 
          isEditMode={currentView === 'EDIT'} 
          onCancel={handleBackToList}
          onSuccess={handleBackToList}
        />
      )}
    </div>
  );
}