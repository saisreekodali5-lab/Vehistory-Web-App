function Dashboard({ cars, events }) {
  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div className="car-card" style={{ padding: "15px", flex: 1 }}>Cars: {cars.length}</div>
      <div className="car-card" style={{ padding: "15px", flex: 1 }}>Events: {events.length}</div>
    </div>
  );
}

export default Dashboard;
