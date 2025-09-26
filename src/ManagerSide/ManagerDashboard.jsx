import { useState, useEffect, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import SidebarLayout from "./Sidebar";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ManagerDashboard() {
  const [counts, setCounts] = useState({
    categories: 0,
    products: 0,
    orders: 0,
    tips: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tabs = useMemo(
    () => [
      { key: "categories", endpoint: "/api/categories" },
      { key: "products", endpoint: "/api/products" },
      { key: "orders", endpoint: "/api/orders" },
      { key: "tips", endpoint: "/api/nutrition-tips" },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all(
      tabs.map((tab) =>
        fetch(`http://localhost:5000${tab.endpoint}`)
          .then((res) => res.json())
          .then((json) => ({ key: tab.key, count: json.length }))
      )
    )
      .then((results) => {
        const newCounts = {};
        results.forEach((res) => {
          newCounts[res.key] = res.count;
        });
        setCounts(newCounts);
      })
      .catch(() => setError("Failed to fetch counts"))
      .finally(() => setLoading(false));
  }, [tabs]);

  const pieData = {
    labels: ["📂 Categories", "📦 Products", "🛒 Orders", "💡 Tips"],
    datasets: [
      {
        data: [counts.categories, counts.products, counts.orders, counts.tips],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#9c27b0"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <SidebarLayout>
      <div className="dashboard">
        <div className="content-box">
          <div className="summary-grid">
            {[
              { label: "📂 Categories", value: counts.categories, color: "#4caf50" },
              { label: "📦 Products", value: counts.products, color: "#2196f3" },
              { label: "🛒 Orders", value: counts.orders, color: "#ff9800" },
              { label: "💡 Tips", value: counts.tips, color: "#9c27b0" },
            ].map((card, index) => (
              <div key={index} className="summary-card card" style={{ borderTop: `5px solid ${card.color}` }}>
                <h4>{card.label}</h4>
                <p>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="card chart-card">
            <h3>Summary Overview</h3>
            {loading && <p className="info-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}
            {!loading && !error && (
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { font: { size: 14 }, color: "#333" },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dashboard {
          padding: 20px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .summary-card h4 {
          margin: 0;
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }

        .summary-card p {
          font-size: 22px;
          font-weight: bold;
          color: #333;
        }

        .chart-card {
          height: 400px;
        }

        .chart-card h3 {
          margin-bottom: 15px;
          color: #2e7d32;
        }

        .info-text, .error-text {
          text-align: center;
          font-size: 16px;
          color: #555;
        }

        .error-text {
          color: red;
        }
      `}</style>
    </SidebarLayout>
  );
}
