import { useState } from "react";
import "../styles/form.css";

function AddCar({ onCarAdded }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  const isValid = brand && model && year;

  const submit = async () => {
    if (!isValid) return;

    await onCarAdded({
      brand,
      model,
      year: parseInt(year),
      image
    });

    setBrand("");
    setModel("");
    setYear("");
    setImage("");
  };

  return (
    <div className="form-card wide">
      <h3 className="form-title">Add New Car</h3>

      <div className="horizontal-form">
        <div className="form-field">
          <label>Brand</label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Toyota"
          />
        </div>

        <div className="form-field">
          <label>Model</label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Corolla"
          />
        </div>

        <div className="form-field small">
          <label>Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2022"
          />
        </div>

        <div className="form-field">
          <label>Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="form-field button-field">
          <button
            className="primary-btn"
            disabled={!isValid}
            onClick={submit}
          >
            Save Car
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCar;
