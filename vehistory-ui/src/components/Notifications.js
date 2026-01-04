import { useState, useEffect } from "react";
import { getWarnings } from "../services/api"; // make sure this exists

function Notifications() {
  const [open, setOpen] = useState(false);
  const [warnings, setWarnings] = useState([]);

  // Fetch warnings from backend
  const loadWarnings = async () => {
    try {
      const data = await getWarnings();
      setWarnings(data);
    } catch (err) {
      console.error("Failed to fetch warnings:", err);
    }
  };

  useEffect(() => {
    loadWarnings();

    // Optional: auto-refresh every 30 seconds
    const interval = setInterval(loadWarnings, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notifications-container">
      <button className="notification-btn" onClick={() => setOpen(!open)}>
        🔔
        {warnings.length > 0 && <span className="badge">{warnings.length}</span>}
      </button>

      {open && warnings.length > 0 && (
        <div className="notification-list">
          {warnings.map(ev => (
            <div key={ev.id} className="notification-item">
              ⚠️ Car {ev.carId}: {ev.description} ({new Date(ev.date).toLocaleString()})
            </div>
          ))}
        </div>
      )}

      {open && warnings.length === 0 && (
        <div className="notification-list">
          <div className="notification-item">No notifications</div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
