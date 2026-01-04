import { useState } from "react";

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

    await onEventAdded({
      type,
      description,
      date,
      carId
    });

    setDescription("");
    setDate("");
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

      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEvent;
