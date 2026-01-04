const BASE_URL = "https://localhost:7253/api"; // Update if needed

export const getWarnings = () =>
  fetch(`${BASE_URL}/notifications/warnings`).then((res) => res.json());

export const getCars = () => fetch(`${BASE_URL}/cars`).then((res) => res.json());

export const addCar = (car) =>
  fetch(`${BASE_URL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  }).then((res) => res.json());

export const getEvents = (carId) =>
  fetch(`${BASE_URL}/events/${carId}`).then((res) => res.json());

export const addEvent = (event) =>
  fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  }).then((res) => res.json());

export const updateEvent = async (id, eventData) => {
  const response = await fetch(`${BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return await response.json();
};

export const deleteEvent = async (id) => {
  const response = await fetch(`${BASE_URL}/events/${id}`, { method: "DELETE" });
  return response.ok;
};

// ✅ Make sure deleteCar is exported
export const deleteCar = async (id) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`, { method: "DELETE" });
  return response.ok;
};
