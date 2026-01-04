import React, { useState } from "react";
import { updateEvent, deleteEvent } from "../services/api";

function EventTimeline({ events, setEvents }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ description: "", type: "", date: "" });

  const handleEdit = (event) => {
    setEditingId(event.id);
    setEditData({
      description: event.description,
      type: event.type,
      date: event.date.split("T")[0],
    });
  };

  const handleSave = async (id) => {
    const updatedEvent = { ...editData, id };
    try {
      await updateEvent(id, updatedEvent);
      setEvents(events.map(ev => (ev.id === id ? { ...ev, ...updatedEvent } : ev)));
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete this event?")) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(ev => ev.id !== id));
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  return (
    <div className="timeline-container">
      {events.map(ev => (
        <div key={ev.id} className="timeline-item">
          <div className={`timeline-dot ${ev.type.toLowerCase()}`}></div>

          <div className="timeline-content">
            {editingId === ev.id ? (
              <div>
                <input
                  type="text"
                  value={editData.description}
                  onChange={e => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Description"
                />
                <select
                  value={editData.type}
                  onChange={e => setEditData({ ...editData, type: e.target.value })}
                >
                  <option>Service</option>
                  <option>Repair</option>
                  <option>Noise</option>
                  <option>Warning</option>
                </select>
                <input
                  type="date"
                  value={editData.date}
                  onChange={e => setEditData({ ...editData, date: e.target.value })}
                />
                <div className="timeline-actions">
                  <button onClick={() => handleSave(ev.id)} className="save-btn">💾 Save</button>
                  <button onClick={() => setEditingId(null)} className="cancel-btn">❌ Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="timeline-header">
                  <span className="timeline-type">
                    {ev.type === "Warning" && "⚠️"} 
                    {ev.type === "Service" && "🛠️"} 
                    {ev.type === "Repair" && "🔧"} 
                    {ev.type === "Noise" && "🔊"} 
                    {ev.type}
                  </span>
                  <div className="timeline-actions">
                    <button onClick={() => handleEdit(ev)} className="edit-btn">✏️</button>
                    <button onClick={() => handleDelete(ev.id)} className="delete-btn">🗑️</button>
                  </div>
                </div>
                <p className="timeline-desc">{ev.description}</p>
                <small className="timeline-date">{new Date(ev.date).toLocaleString()}</small>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventTimeline;
