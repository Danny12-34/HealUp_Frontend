import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/products';

// ==========================================
// 1. CATEGORY LIST COMPONENT
// ==========================================
export function CategoryList({ onEdit, onAddNew }) {
  const [categories, setCategories] = useState([]);
  const [editHover, setEditHover] = useState(null);
  const [deleteHover, setDeleteHover] = useState(null);
  const [addHover, setAddHover] = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await axios.delete(`${API}/${id}`);
      fetchCategories();
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
    badge: (status) => ({
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: status?.toLowerCase() === 'active' ? '#def7ec' : '#fde8e8',
      color: status?.toLowerCase() === 'active' ? '#03543f' : '#9b1c1c',
      marginBottom: '6px',
    }),
    metaText: {
      fontSize: '13px',
      color: '#4a5568',
      marginBottom: '4px',
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
        <h2 style={styles.header}>📂 Product Directory</h2>
        <button
          onClick={onAddNew}
          style={styles.addBtn(addHover)}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
        >
          ➕ Add New Product
        </button>
      </div>

      <div style={styles.grid}>
        {categories.length > 0 ? (
          categories.map((c) => {
            const photoUrl = c.image;

            return (
              <div key={c.product_id} style={styles.card}>
                <div>
                  <div style={styles.imageContainer}>
                    {photoUrl ? (
                      <>
                        <img
                          src={photoUrl}
                          alt={c.product_name}
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
                    <div style={styles.cardTitle}>{c.product_name}</div>
                    <div>
                      <span style={styles.badge(c.status)}>{c.status || 'N/A'}</span>
                    </div>
                    <div style={styles.metaText}><strong>Quantity:</strong> {c.quantity || 'N/A'}</div>
                    <div style={styles.metaText}><strong>Price:</strong> {c.price ? `$${c.price}` : 'N/A'}</div>
                    <div style={styles.metaText}><strong>Area:</strong> {c.helping_area || 'N/A'}</div>
                    <div style={styles.metaText}><strong>Exp Date:</strong> {c.exp_date ? new Date(c.exp_date).toLocaleDateString() : 'N/A'}</div>
                    <div style={styles.metaText}><strong>Is Popular:</strong> {c.is_popular || 'No'}</div>
                  </div>
                </div>

                <div style={styles.actionContainer}>
                  <button
                    onClick={() => onEdit(c)}
                    style={styles.editBtn(editHover === c.product_id)}
                    onMouseEnter={() => setEditHover(c.product_id)}
                    onMouseLeave={() => setEditHover(null)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.product_id)}
                    style={styles.deleteBtn(deleteHover === c.product_id)}
                    onMouseEnter={() => setDeleteHover(c.product_id)}
                    onMouseLeave={() => setDeleteHover(null)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={styles.emptyState}>No categories found.</div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. CATEGORY FORM COMPONENT (Add / Edit)
// ==========================================
export function CategoryForm({ categoryData, isEditMode, onCancel, onSuccess }) {
  const [catName, setCatName] = useState('');
  const [status, setStatus] = useState('Active');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [helpingArea, setHelpingArea] = useState('');
  const [expDate, setExpDate] = useState('');
  const [isPopular, setIsPopular] = useState('No');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (isEditMode && categoryData) {
      setCatName(categoryData.product_name || '');
      setStatus(categoryData.status || 'Active');
      setQuantity(categoryData.quantity || '');
      setPrice(categoryData.price || '');
      setHelpingArea(categoryData.helping_area || '');
      setExpDate(categoryData.exp_date ? categoryData.exp_date.split('T')[0] : '');
      setIsPopular(categoryData.is_popular || 'No');
      setPreview(categoryData.image || '');
    }
  }, [isEditMode, categoryData]);

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
      formData.append('product_name', catName);
      formData.append('status', status);
      formData.append('quantity', quantity);
      formData.append('price', price);
      formData.append('helping_area', helpingArea);
      formData.append('exp_date', expDate);
      formData.append('is_popular', isPopular);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (isEditMode) {
        await axios.put(`${API}/${categoryData.product_id}`, formData, config);
      } else {
        await axios.post(API, formData, config);
      }

      onSuccess();
    } catch (err) {
      console.error("Error saving category", err);
      alert("Failed to save category.");
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
    select: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '6px',
      border: '1px solid #cbd5e0',
      fontSize: '14px',
      backgroundColor: '#fff',
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
      <h2 style={styles.header}>{isEditMode ? '✏️ Edit Category' : '➕ Add New Product'}</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Category Name:</label>
          <input
            type="text"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter category name"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={styles.select}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
            placeholder="Enter quantity"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
            placeholder="Enter price"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Helping Area:</label>
          <input
            type="text"
            value={helpingArea}
            onChange={(e) => setHelpingArea(e.target.value)}
            style={styles.input}
            placeholder="Enter helping area"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Expiration Date:</label>
          <input
            type="date"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Is Popular?</label>
          <select
            value={isPopular}
            onChange={(e) => setIsPopular(e.target.value)}
            style={styles.select}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
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
            {isEditMode ? 'Update Category' : 'Save Category'}
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
export default function CategoryManager() {
  const [currentView, setCurrentView] = useState('LIST');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddNew = () => {
    setSelectedCategory(null);
    setCurrentView('ADD');
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCurrentView('EDIT');
  };

  const handleBackToList = () => {
    setSelectedCategory(null);
    setCurrentView('LIST');
  };

  return (
    <div style={{ backgroundColor: '#f7fafc', minHeight: '100vh', padding: '20px' }}>
      {currentView === 'LIST' && (
        <CategoryList
          onAddNew={handleAddNew}
          onEdit={handleEdit}
        />
      )}

      {(currentView === 'ADD' || currentView === 'EDIT') && (
        <CategoryForm
          categoryData={selectedCategory}
          isEditMode={currentView === 'EDIT'}
          onCancel={handleBackToList}
          onSuccess={handleBackToList}
        />
      )}
    </div>
  );
}