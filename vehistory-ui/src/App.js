import { useState, useEffect } from "react";
import { getCars, addCar, getEvents, addEvent, getWarnings, deleteCar } from "./services/api";
import AddCar from "./components/AddCar";
import AddEvent from "./components/AddEvent";
import CarGrid from "./components/CarGrid";
import EventTimeline from "./components/EventTimeline";
import Dashboard from "./components/Dashboard";
import DarkModeToggle from "./components/DarkModeToggle";
import Logo from "./assets/logo.png";
import Header3D from "./assets/Coverpage.jpg";
import "./styles/theme.css";
import "./styles/cards.css";

function App() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [events, setEvents] = useState([]);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    loadCars();
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadCars = async () => {
    const data = await getCars();
    setCars(data);
  };

  const loadEvents = async (car) => {
    setSelectedCar(car);
    const data = await getEvents(car.id);
    setEvents(data);
  };

  const loadNotifications = async () => {
    const data = await getWarnings();
    setNotifications(data);
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Delete this car and all its events?")) return;
    await deleteCar(id);
    setCars(cars.filter((c) => c.id !== id));
    if (selectedCar?.id === id) {
      setSelectedCar(null);
      setEvents([]);
    }
  };

  const filteredCars = cars.filter((c) =>
    `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEvents =
    filter === "All" ? events : events.filter((e) => e.type === filter);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="container">

        {/* ================= HEADER ================= */}
        <header className="top-header-image">
          <div className="top-bar">

            {/* LEFT */}
            <img src={Logo} alt="Vehistory Logo" className="logo" />

            {/* CENTER */}
            <div className="header-title">
              <h2>Welcome to Vehistory</h2>
              <p>Track your cars, services, and events efficiently!</p>
            </div>

            {/* RIGHT */}
            <div className="header-actions">
              <button className="header-btn">Login</button>

              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
                {notifications.length > 0 && (
                  <span className="badge">{notifications.length}</span>
                )}
              </button>

              <DarkModeToggle dark={dark} toggle={() => setDark(!dark)} />
            </div>
          </div>

          {/* COVER IMAGE */}
          <img
            src={Header3D}
            alt="Cover"
            className="header-image-full"
          />
        </header>

        {/* ================= DASHBOARD ================= */}
        <section className="section-card">
          <h3>Dashboard</h3>
          <Dashboard cars={cars} events={events} />
        </section>

        {/* ================= ADD CAR ================= */}
        <section className="section-card">
          <h3>Add New Car</h3>
          <AddCar
            onCarAdded={async (car) => {
              await addCar(car);
              loadCars();
            }}
          />
        </section>

        {/* ================= SEARCH ================= */}
        <section className="section-card">
          <h3>Search Cars</h3>
          <input
            placeholder="Search cars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        {/* ================= CAR GRID ================= */}
        <section className="section-card">
          <h3>Available Cars</h3>
          <CarGrid
            cars={filteredCars}
            onSelect={loadEvents}
            onDelete={handleDeleteCar}
          />
        </section>

        {/* ================= EVENTS ================= */}
        {selectedCar && (
          <section className="section-card">
            <h3>
              Manage Events for {selectedCar.brand} {selectedCar.model}
            </h3>

            <AddEvent
              carId={selectedCar.id}
              onEventAdded={async (ev) => {
                await addEvent(ev);
                loadEvents(selectedCar);
                loadNotifications();
              }}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Service</option>
              <option>Repair</option>
              <option>Noise</option>
              <option>Warning</option>
            </select>

            <EventTimeline events={filteredEvents} setEvents={setEvents} />
          </section>
        )}

        {/* ================= FOOTER ================= */}
        <footer className="footer">
          <p>© 2025 Vehistory. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
