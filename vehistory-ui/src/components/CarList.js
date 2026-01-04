function CarList({ cars, onSelect }) {
  return (
    <div>
      <h3>Your Cars</h3>
      {cars.map(car => (
        <div key={car.id} onClick={() => onSelect(car)}>
          {car.brand} {car.model} ({car.year})
        </div>
      ))}
    </div>
  );
}

export default CarList;
