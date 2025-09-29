import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true); // 1. Added sidebar state

    const [formData, setFormData] = useState({
        category_name: '',
        descrition: '',
        category_image: null
    });

    const [editingId, setEditingId] = useState(null);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch categories');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        if (e.target.name === 'category_image') {
            setFormData({ ...formData, category_image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Create or Update category
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('category_name', formData.category_name);
        data.append('descrition', formData.descrition);
        if (formData.category_image) data.append('category_image', formData.category_image);

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/categories/${editingId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:5000/api/categories', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            setFormData({ category_name: '', descrition: '', category_image: null });
            setEditingId(null);
            fetchCategories();
        } catch (err) {
            console.error(err);
            setError('Failed to save category');
        }
    };

    // Edit category
    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
            const cat = response.data;
            setFormData({
                category_name: cat.category_name,
                descrition: cat.descrition,
                category_image: null
            });
            setEditingId(id);
        } catch (err) {
            console.error(err);
            setError('Failed to load category');
        }
    };

    // Delete category
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            fetchCategories();
        } catch (err) {
            console.error(err);
            setError('Failed to delete category');
        }
    };

    return (
        <div style={styles.container}>
            {/* 2. Sidebar Navigation */}
            {sidebarOpen && (
                <aside style={styles.sidebar}>
                    <h2 style={styles.logo}>📊 HEALUP Manager</h2>
                    <nav style={styles.nav}>
                        <a href="/manager/Dashb" style={styles.navLink}>Dashboard</a>
                        <a href="/category/manager" style={{ ...styles.navLink, ...styles.activeNavLink }}>Categories</a>
                        <a href="/manager/product" style={styles.navLink}>Manage Products</a>
                        <a href="/manager/order" style={styles.navLink}>Orders</a>
                        <a href="/menu/manager" style={styles.navLink}>Manage Menu</a>
                        <a href="/manager/cases" style={styles.navLink}>Manage Cases</a>
                        <a href="/Manager/bread" style={styles.navLink}>Manage Bread</a>
                        <a href="/order/bread" style={styles.navLink}>Bread Ordered</a>
                    </nav>
                </aside>
            )}

            {/* 3. Main Content Area */}
            <main style={{ ...styles.main, marginLeft: sidebarOpen ? "190px" : "0px" }}>
                {/* 4. Toggle Button */}
                <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? "✖ Close" : "☰ Menu"}
                </button>

                <h1 style={styles.header}>🍱 Category Manager</h1>

                {error && <p style={styles.errorText}>{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="category_name"
                        placeholder="Category Name"
                        value={formData.category_name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="descrition"
                        placeholder="Description"
                        value={formData.descrition}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="file"
                        name="category_image"
                        onChange={handleChange}
                        style={styles.fileInput}
                    />
                    <button type="submit" style={styles.submitButton}>
                        {editingId ? 'Update' : 'Create'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => { setEditingId(null); setFormData({ category_name: '', descrition: '', category_image: null }); }}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    )}
                </form>

                {/* Categories Table */}
                {loading ? (
                    <p style={styles.loadingText}>Loading categories...</p>
                ) : (
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead style={styles.tableHeader}>
                                <tr>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Image</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat, index) => (
                                    <tr 
                                        key={cat.category_id}
                                        style={{...styles.tr, backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",}}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                index % 2 === 0 ? "#fafafa" : "#fff")
                                        }
                                    >
                                        <td style={styles.td}>{cat.category_id}</td>
                                        <td style={styles.td}>{cat.category_name}</td>
                                        <td style={styles.td}>{cat.descrition}</td>
                                        <td style={styles.td}>
                                            {cat.category_image && (
                                                <img
                                                    src={`http://localhost:5000/uploads/${cat.category_image}`}
                                                    alt={cat.category_name}
                                                    style={styles.categoryImage}
                                                />
                                            )}
                                        </td>
                                        <td style={styles.td}>
                                            <button onClick={() => handleEdit(cat.category_id)} style={styles.editButton}>Edit</button>
                                            <button onClick={() => handleDelete(cat.category_id)} style={styles.deleteButton}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

// 5. Styles Object
const styles = {
    container: {
        display: "flex",
        fontFamily: "Arial, sans-serif",
        background: "#f4f6f8",
        minHeight: "100vh",
        overflowX: "hidden",
    },
    sidebar: {
        width: "180px",
        background: "#11af03ff",
        padding: "15px",
        position: "fixed",
        height: "100%",
        color: "white",
        zIndex: 10,
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    },
    logo: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "25px",
        textAlign: "center",
    },
    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    navLink: {
        color: "white",
        textDecoration: "none",
        fontSize: "15px",
        padding: "8px 10px",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    },
    activeNavLink: {
        backgroundColor: "#1abc9c", // Highlight color for active link
        fontWeight: 'bold',
    },
    main: {
        padding: "20px",
        flex: 1,
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "100vh",
    },
    header: {
        fontSize: "24px",
        marginBottom: "25px",
        color: "#2c3e50",
    },
    toggleBtn: {
        background: "#2c3e50",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        marginBottom: "15px",
        cursor: "pointer",
    },
    errorText: {
        color: '#dc3545',
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    loadingText: {
        textAlign: 'center',
        color: '#555',
        fontSize: '1.1rem',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        flexWrap: 'wrap',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        flex: 1,
        minWidth: '150px',
    },
    fileInput: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontWeight: 'bold',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontWeight: 'bold',
    },
    tableContainer: {
        overflowX: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0',
        textAlign: 'left',
    },
    tableHeader: {
        backgroundColor: '#2c3e50',
        color: 'white',
    },
    th: {
        padding: '14px',
        fontSize: '1rem',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        borderBottom: '2px solid #ddd',
    },
    tr: {
        transition: "background-color 0.3s ease",
        cursor: "default",
    },
    td: {
        padding: '12px',
        fontSize: '0.95rem',
        color: '#333',
        borderBottom: '1px solid #eee',
    },
    categoryImage: {
        width: '60px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    editButton: {
        backgroundColor: '#3498db',
        color: '#fff',
        padding: '6px 12px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginRight: '8px',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        padding: '6px 12px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default CategoryManager;