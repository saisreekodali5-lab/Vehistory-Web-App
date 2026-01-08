import { useState, useEffect } from "react";
import { getWarnings } from "../services/api";

function Notifications() {
  const [open, setOpen] = useState(false);
  const [warnings, setWarnings] = useState([]);

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
    const interval = setInterval(loadWarnings, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="notifications-container"
      style={{ position: "relative", zIndex: 9999 }}
    >
      <button
        className="notification-btn"
        onClick={() => {
          console.log("Bell clicked");
          setOpen(!open);
        }}
      >
        🔔
        {warnings.length > 0 && (
          <span className="badge">{warnings.length}</span>
        )}
      </button>

      {open && (
        <div className="notification-list">
          {warnings.length === 0 && (
            <div className="notification-item">No notifications</div>
          )}

          {warnings.map((ev) => (
            <div key={ev.id} className="notification-item">
              ⚠️ <strong>Car {ev.carId}</strong>
              <br />
              {ev.description}
              <br />
              <small>{new Date(ev.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
