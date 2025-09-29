import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    orders: 0,
    tips: 0,
    meals: 0,
    cases: 0,
  });

  const [ordersData, setOrdersData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cat, prod, ord, tip, meal, cas] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/orders"),
          axios.get("http://localhost:5000/api/nutrition-tips"),
          axios.get("http://localhost:5000/api/meals"),
          axios.get("http://localhost:5000/api/cases"),
        ]);

        setStats({
          categories: cat.data.length,
          products: prod.data.length,
          orders: ord.data.length,
          tips: tip.data.length,
          meals: meal.data.length,
          cases: cas.data.length,
        });

        setOrdersData(
          ord.data.map((order, idx) => ({
            name: `Order ${idx + 1}`,
            total: order.total_amount || Math.floor(Math.random() * 500),
          }))
        );

        setCategoriesData(
          cat.data.map((category) => ({
            name: category.name,
            value: prod.data.filter((p) => p.category_id === category.id).length,
          }))
        );
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    }
    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7", "#F43F5E"];

  return (
    <div style={styles.container}>
        
      {sidebarOpen && (
        <aside style={styles.sidebar}>
            
          <h2 style={styles.logo}>📊 HEALUP Manager</h2>
          <nav style={styles.nav}>
            <a href="/manager/Dashb" style={styles.navLink}>Dashboard</a>
            <a href="/category/manager" style={styles.navLink}>Categories</a>
            <a href="/manager/product" style={styles.navLink}>Manage Products</a>
            <a href="/manager/order" style={styles.navLink}>Orders</a>
            <a href="/menu/manager" style={styles.navLink}>Manage Menu</a>
            <a href="/manager/cases" style={styles.navLink}>Manage Cases</a>
            <a href="/Manager/bread" style={styles.navLink}>Manage Bread</a>
            <a href="/order/bread" style={styles.navLink}>Bread Ordered</a>
            
          </nav>
        </aside>
      )}

      <main style={{ ...styles.main, marginLeft: sidebarOpen ? "190px" : "0px" }}>
        <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "✖ Close" : "☰ Menu"}
        </button>

        <h1 style={styles.header}>Manager Dashboard - HEALUP</h1>

        {/* Cards */}
        <div className="cards-grid" style={styles.grid}>
          <div style={{ ...styles.card, background: "#f39c12" }}>
            <h2 style={styles.title}>Categories</h2>
            <p style={styles.number}>{stats.categories}</p>
          </div>
          <div style={{ ...styles.card, background: "#27ae60" }}>
            <h2 style={styles.title}>Products</h2>
            <p style={styles.number}>{stats.products}</p>
          </div>
          <div style={{ ...styles.card, background: "#2980b9" }}>
            <h2 style={styles.title}>Orders</h2>
            <p style={styles.number}>{stats.orders}</p>
          </div>
          <div style={{ ...styles.card, background: "#8e44ad" }}>
            <h2 style={styles.title}>Tips</h2>
            <p style={styles.number}>{stats.tips}</p>
          </div>
          <div style={{ ...styles.card, background: "#16a085" }}>
            <h2 style={styles.title}>Meals</h2>
            <p style={styles.number}>{stats.meals}</p>
          </div>
          <div style={{ ...styles.card, background: "#c0392b" }}>
            <h2 style={styles.title}>Cases</h2>
            <p style={styles.number}>{stats.cases}</p>
          </div>
        </div>

        {/* Charts */}
        <div style={styles.chartsRow}>
          <div style={styles.chartContainer}>
            <h2 style={styles.chartTitle}>📊 Products per Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoriesData} cx="50%" cy="50%" outerRadius={90} fill="#8884d8" dataKey="value" label>
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartContainer}>
            <h2 style={styles.chartTitle}>📈 Orders Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inline CSS for grid layout */}
        <style>{`
          .cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* default for small screens */
            gap: 15px;
          }
          @media (min-width: 1024px) {
            .cards-grid {
              grid-template-columns: repeat(4, 1fr); /* large screens */
            }
          }
        `}</style>
      </main>
    </div>
  );
}

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
    padding: "6px 8px",
    borderRadius: "5px",
  },
  main: {
    // padding: "20px",
    flex: 1,
    transition: "margin-left 0.3s ease-in-out",
    paddingLeft: "5%"
  },
  header: {
    fontSize: "24px",
    marginBottom: "25px",
    color: "#2c3e50",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    color: "white",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.15)",
  },
  title: {
    fontSize: "16px",
    marginBottom: "8px",
  },
  number: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  chartsRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  chartContainer: {
    flex: "1",
    minWidth: "250px",
    padding: "15px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
  },
  chartTitle: {
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "18px",
    color: "#2c3e50",
  },
  toggleBtn: {
    background: "#42502cff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    marginBottom: "15px",
    cursor: "pointer",
  },
};
