import React from "react";
import CarCard from "./CarCard";
import { deleteCar } from "../services/api";

function CarGrid({ cars, onSelect, refreshCars }) {
  const handleDelete = async (carId) => {
    if (!window.confirm("Delete this car and all its events?")) return;
    await deleteCar(carId);
    refreshCars(); // reload cars list
  };

  return (
    <div className="car-grid">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onSelect={onSelect}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default CarGrid;
