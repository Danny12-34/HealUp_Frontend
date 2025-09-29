import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedDesc, setExpandedDesc] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(true); // Added sidebar state

    const [formData, setFormData] = useState({
        product_name: '',
        description: '',
        price: '',
        category: '',
        image: null
    });

    const [editingId, setEditingId] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            // Assuming categories have an ID field like category_id and a name like category_name
            setCategories(response.data || []);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('product_name', formData.product_name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/products/${editingId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:5000/api/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            setFormData({ product_name: '', description: '', price: '', category: '', image: null });
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            console.error(err);
            setError('Failed to save product');
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            const prod = response.data;
            setFormData({
                product_name: prod.product_name,
                description: prod.description,
                // Ensure price is a string for the input field
                price: String(prod.price || ''), 
                category: prod.category,
                image: null
            });
            setEditingId(id);
        } catch (err) {
            console.error(err);
            setError('Failed to load product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.error(err);
            setError('Failed to delete product');
        }
    };

    const toggleDescription = (id) => {
        setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div style={styles.appContainer}>
            {/* Sidebar Navigation */}
            {sidebarOpen && (
                <aside style={styles.sidebar}>
                    <h2 style={styles.logo}>📊 HEALUP Manager</h2>
                    <nav style={styles.nav}>
                        <a href="/manager/Dashb" style={styles.navLink}>Dashboard</a>
                        <a href="/category/manager" style={styles.navLink}>Categories</a>
                        <a href="/manager/product" style={{ ...styles.navLink, ...styles.activeNavLink }}>Manage Products</a>
                        <a href="/manager/order" style={styles.navLink}>Orders</a>
                        <a href="/menu/manager" style={styles.navLink}>Manage Menu</a>
                        <a href="/manager/cases" style={styles.navLink}>Manage Cases</a>
                        <a href="/Manager/bread" style={styles.navLink}>Manage Bread</a>
                        <a href="/order/bread" style={styles.navLink}>Bread Ordered</a>
                    </nav>
                </aside>
            )}

            {/* Main Content Area */}
            <main style={{ ...styles.main, marginLeft: sidebarOpen ? "190px" : "0px" }}>
                <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? "✖ Close" : "☰ Menu"}
                </button>
                
                <div style={styles.contentArea}>
                    <h1 style={styles.header}>📦 Product Manager</h1>

                    {error && <p style={styles.errorText}>{error}</p>}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input type="text" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} required style={styles.input} />
                        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required style={styles.input} />
                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required style={styles.priceInput} />
                        <select name="category" value={formData.category} onChange={handleChange} required style={styles.selectInput}>
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat.category_id} value={cat.category_name}>{cat.category_name}</option>
                            ))}
                        </select>
                        <input type="file" name="image" onChange={handleChange} style={styles.fileInput} />
                        <button type="submit" style={styles.submitButton}>{editingId ? 'Update' : 'Create'}</button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setFormData({ product_name: '', description: '', price: '', category: '', image: null }); }} style={styles.cancelButton}>Cancel</button>
                        )}
                    </form>

                    {/* Products Table */}
                    {loading ? (
                        <p style={styles.loadingText}>Loading products...</p>
                    ) : (
                        <div style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead>
                                    <tr style={styles.tableHeader}>
                                        <th style={{...styles.th, width: '50px'}}>ID</th>
                                        <th style={{...styles.th, width: '150px'}}>Name</th>
                                        <th style={{...styles.th, width: '35%'}}>Description</th> 
                                        <th style={{...styles.th, width: '70px'}}>Price</th>
                                        <th style={{...styles.th, width: '120px'}}>Category</th>
                                        <th style={{...styles.th, width: '100px'}}>Image</th>
                                        <th style={{...styles.th, width: '180px'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((prod, index) => {
                                        const isExpanded = expandedDesc[prod.product_id];
                                        const MAX_DESC_LENGTH = 100;
                                        const displayText = isExpanded ? prod.description : (prod.description ? prod.description.slice(0, MAX_DESC_LENGTH) : '');
                                        return (
                                            <tr 
                                                key={prod.product_id}
                                                style={{...styles.tr, backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",}}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.backgroundColor =
                                                        index % 2 === 0 ? "#fafafa" : "#fff")
                                                }
                                            >
                                                <td style={styles.td}>{prod.product_id}</td>
                                                <td style={styles.td}>{prod.product_name}</td>
                                                <td style={styles.td}>
                                                    {displayText}
                                                    {prod.description && prod.description.length > MAX_DESC_LENGTH && (
                                                        <span style={styles.moreText} onClick={() => toggleDescription(prod.product_id)}>
                                                            {isExpanded ? ' Less' : '... More'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={styles.td}>${prod.price}</td>
                                                <td style={styles.td}>{prod.category}</td>
                                                <td style={styles.td}>
                                                    {prod.image && (
                                                        <img 
                                                            src={`http://localhost:5000/uploads/${prod.image}`} 
                                                            alt={prod.product_name} 
                                                            style={styles.productImage} 
                                                        />
                                                    )}
                                                </td>
                                                <td style={styles.td}>
                                                    <button onClick={() => handleEdit(prod.product_id)} style={styles.editButton}>Edit</button>
                                                    <button onClick={() => handleDelete(prod.product_id)} style={styles.deleteButton}>Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// ----------------------------------------------------------------------
// CSS-IN-JS STYLES (Includes Horizontal Scrolling Fixes)
// ----------------------------------------------------------------------
const styles = {
    appContainer: {
        display: "flex",
        fontFamily: "Arial, sans-serif",
        background: "#f4f6f8",
        minHeight: "100vh",
        overflowX: "visible", // Changed from hidden to visible
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
        backgroundColor: "#28a745",
        fontWeight: 'bold',
    },
    main: {
        padding: "20px",
        flex: 1,
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "100vh",
        overflowX: "auto", // Added to allow horizontal scroll
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

    contentArea: {
        padding: "0 10px",
    },
    header: {
        textAlign: "center",
        marginBottom: "25px",
        color: "#2c3e50",
        fontSize: "24px",
    },
    errorText: {
        color: '#dc3545',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '15px',
    },
    loadingText: {
        textAlign: 'center',
        color: '#555',
        fontSize: '1.1rem',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '35px',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    input: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        flex: 1,
        minWidth: '150px',
    },
    priceInput: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        width: '120px',
    },
    selectInput: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        minWidth: '180px',
        backgroundColor: 'white',
    },
    fileInput: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: 'white',
    },
    submitButton: {
        padding: '12px 25px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    cancelButton: {
        padding: '12px 25px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },

    tableContainer: {
        overflowX: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        display: "block", // added to allow horizontal scroll
    },
    table: {
        minWidth: '1200px', // force overflow
        borderCollapse: 'separate',
        borderSpacing: '0',
        textAlign: 'left',
    },
    tableHeader: {
        backgroundColor: '#2c3e50',
        color: 'white',
    },
    th: {
        padding: '10px 8px',
        fontSize: '0.95rem',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        borderBottom: '2px solid #ddd',
        textAlign: 'center',
    },
    tr: {
        transition: "background-color 0.3s ease",
        cursor: "default",
    },
    td: {
        padding: '10px 8px',
        fontSize: '0.9rem',
        color: '#333',
        borderBottom: '1px solid #eee',
        verticalAlign: 'middle',
        maxWidth: '200px',
        whiteSpace: 'normal',
    },
    productImage: {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '5px',
        display: 'block',
        margin: '0 auto',
    },
    moreText: {
        color: '#007bff',
        cursor: 'pointer',
        marginLeft: '5px',
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#ffc107',
        color: 'white',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginRight: '5px',
        fontSize: '0.85rem',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontSize: '0.85rem',
    },
};


export default ProductManager;