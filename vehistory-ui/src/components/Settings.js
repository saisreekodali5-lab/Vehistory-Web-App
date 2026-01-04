import { useState, useEffect } from "react";
import { getCars } from "../services/api";

function Settings({ dark, toggleDark }) {
  const [showWarnings, setShowWarnings] = useState(true);
  const [defaultCar, setDefaultCar] = useState("");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => setCars(await getCars());
    fetchCars();
  }, []);

  return (
    <div className="settings-card animated-card">
      <h3 className="settings-title">Settings</h3>

      <div className="settings-items-horizontal">
        {/* Dark Mode */}
        <div className="setting-item">
          <label>Dark Mode</label>
          <label className="switch">
            <input type="checkbox" checked={dark} onChange={toggleDark} />
            <span className="slider round">{dark ? "🌙" : "☀️"}</span>
          </label>
        </div>

        {/* Show Warnings */}
        <div className="setting-item">
          <label>Show Warnings</label>
          <label className="switch">
            <input type="checkbox" checked={showWarnings} onChange={() => setShowWarnings(!showWarnings)} />
            <span className="slider round">{showWarnings ? "⚠️" : "✅"}</span>
          </label>
        </div>

        {/* Default Car */}
        <div className="setting-item">
          <label>Default Car</label>
          <select
            className="default-car-select"
            value={defaultCar}
            onChange={(e) => setDefaultCar(e.target.value)}
          >
            <option value="">-- Select Car --</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>{car.brand} {car.model}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;
