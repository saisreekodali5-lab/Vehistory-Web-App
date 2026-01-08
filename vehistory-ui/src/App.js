import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import {
  getCars,
  addCar,
  getEvents,
  addEvent,
  deleteCar
} from "./services/api";

import Header from "./components/Header";
import AddCar from "./components/AddCar";
import AddEvent from "./components/AddEvent";
import CarGrid from "./components/CarGrid";
import EventTimeline from "./components/EventTimeline";
import Dashboard from "./components/Dashboard";

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

  /* ---------------- LOAD CARS ---------------- */
  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const data = await getCars();

    const carsWithEvents = await Promise.all(
      data.map(async (car) => {
        try {
          const events = await getEvents(car.id);
          return { ...car, events };
        } catch {
          return { ...car, events: [] };
        }
      })
    );

    setCars(carsWithEvents);
  };

  /* ---------------- LOAD EVENTS ---------------- */
  const loadEvents = async (car) => {
    setSelectedCar(car);
    const data = await getEvents(car.id);
    setEvents(data);
  };

  /* ---------------- DELETE CAR ---------------- */
  const handleDeleteCar = async (id) => {
    if (!window.confirm("Delete this car and all its events?")) return;

    await deleteCar(id);

    setCars((prev) => prev.filter((c) => c.id !== id));

    if (selectedCar?.id === id) {
      setSelectedCar(null);
      setEvents([]);
    }
  };

  /* ---------------- FILTERS ---------------- */
  const filteredCars = cars.filter((c) =>
    `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((e) => e.type === filter);

  /* ---------------- RENDER ---------------- */
  return (
    <div className={dark ? "dark" : ""}>
      <div className="container">

        {/* ================= HEADER ================= */}
        <Header dark={dark} toggleDark={() => setDark(!dark)} />

        {/* ================= COVER IMAGE ================= */}
        <img
          src={Header3D}
          alt="Cover"
          className="header-image-full"
        />

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
            loadCars={loadCars}
          />
        </section>

        {/* ================= EVENTS ================= */}
        {selectedCar && (
          <section className="section-card">
            <h3>
              Manage Events for {selectedCar.brand} {selectedCar.model}
            </h3>

            {/* Add Event */}
            <AddEvent
              carId={selectedCar.id}
              onEventAdded={(savedEvent) => {
                // Immediately add the new event to state
                setEvents((prevEvents) => [...prevEvents, savedEvent]);
              }}
            />

            {/* Event Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-2 mb-3"
            >
              <option>All</option>
              <option>Service</option>
              <option>Repair</option>
              <option>Noise</option>
              <option>Warning</option>
            </select>

            <EventTimeline
              events={filteredEvents}
              setEvents={setEvents}
            />
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
