import React from "react";
import Toyota from "../assets/Toyota.jpg";
import Ford from "../assets/Ford.jpg";
import Honda from "../assets/Honda.jpg";
import mercedes from "../assets/mercedes.jpg";
import Tesla from "../assets/Tesla.jpg";
import Volvo from "../assets/Volvo.jpg";
// Map brand to image (case insensitive)
const brandImages = {
  toyota: Toyota,
  ford: Ford,
  honda: Honda,
  mercedes: mercedes,
  tesla: Tesla,
  volvo: Volvo,
};

function CarCard({ car, onSelect, onDelete }) {
  const imageSrc = brandImages[car.brand?.toLowerCase()] || "https://via.placeholder.com/400x200?text=Car";

  return (
    <div className="car-card-wrapper">
      <div className="car-card" onClick={() => onSelect(car)}>
        <img src={imageSrc} alt={`${car.brand} ${car.model}`} />
        <div className="car-card-body">
          <h4 className="car-title">{car.brand} {car.model}</h4>
          <p>Year: {car.year}</p>
          <p>Events: {car.events?.length || 0}</p>
        </div>
      </div>
      <button
        className="delete-car-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent selecting car
          onDelete(car.id);
        }}
      >
        🗑 Delete
      </button>
    </div>
  );
}

export default CarCard;
