import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { createRun } from "../service/runService";

type unit = "miles" | "kilometers";

// assumes distances can only be in mi or km
function convertDistanceToMeters(distance: string, unit: unit) {
  if (unit === "miles") {
    return Math.ceil(parseFloat(distance) * 1609.34);
  }
  return Math.ceil(parseFloat(distance) * 1000);
}

function AddRun() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toDateString());
  const [distance, setDistance] = useState("");
  const [unit, setUnit] = useState<unit>("miles");
  const [error, setError] = useState("");

  async function saveRun() {
    if (isNaN(parseFloat(distance))) {
      setError("Invalid value for distance, please provide a number");
      return;
    }

    const run = {
      location,
      date,
      userId: auth?.userId,
      distance: convertDistanceToMeters(distance, unit),
    };

    await createRun(run);
    navigate("/", { replace: true });
  }

  return (
    <div className="container">
      <Nav></Nav>
      <h1>New run</h1>
      <div>
        <label className="label" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label className="label" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label className="label" htmlFor="distance">
          Distance
        </label>
        <input
          type="text"
          id="distance"
          value={distance}
          onChange={(e) => {
            setError("");
            setDistance(e.target.value);
          }}
        />
        <div className="distance-unit">
          <select
            value={unit}
            onChange={(e) => {
              const u = e.target.value as unit;
              setUnit(u);
            }}
          >
            <option value="miles">Miles</option>
            <option value="kilometers">Kilometers</option>
          </select>
        </div>
        {error ? <p className="error-msg">{error}</p> : null}
      </div>
      <div>
        <p>Category</p>
        <input type="radio" name="category" value="long-run" id="long-run" />
        <label htmlFor="long-run">Long-run</label>
        <input type="radio" name="category" value="recovery" id="recovery" />
        <label htmlFor="recovery">Recovery</label>
        <input type="radio" name="category" value="tempo" id="tempo" />
        <label htmlFor="tempo">Tempo</label>
      </div>
      <button onClick={saveRun}>Add</button>
    </div>
  );
}

export default AddRun;
