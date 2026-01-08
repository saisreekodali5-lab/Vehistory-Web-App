import { useState } from "react";
import { addEvent } from "../services/api"; // make sure this is correct

function AddEvent({ carId, onEventAdded }) {
  const [type, setType] = useState("Service");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!carId) {
      alert("Please select a car first");
      return;
    }

    // Prepare new event object
    const newEvent = {
      type,
      description,
      date,
      carId
    };

    try {
      // Save event to backend
      const savedEvent = await addEvent(newEvent);

      // Update parent immediately
      onEventAdded(savedEvent);

      // Clear form
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Try again.");
    }
  };

  return (
    <form onSubmit={submit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Service</option>
        <option>Repair</option>
        <option>Noise</option>
        <option>Warning</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-success mt-2">Add Event</button>
    </form>
  );
}

export default AddEvent;
