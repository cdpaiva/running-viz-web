import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { updateRun } from "../service/runService";
import { Run } from "../types/Run";

type unit = "miles" | "kilometers";

// assumes distances can only be in mi or km
function convertDistanceToMeters(distance: number, unit: unit) {
  if (unit === "miles") {
    return Math.round(distance * 1609.34);
  }
  return Math.round(distance * 1000);
}

function convertToMiles(distance: number) {
  return Math.round(distance / 1609.34);
}

function EditRun() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const prevRun = useLoaderData() as Run;

  const [location, setLocation] = useState(prevRun.location);
  const [date, setDate] = useState(prevRun.date.substring(0, 10));
  const [distance, setDistance] = useState(convertToMiles(prevRun.distance));
  const [unit, setUnit] = useState<unit>("miles");
  const [error, setError] = useState("");

  async function handleUpdate() {
    if (isNaN(distance)) {
      setError("Invalid value for distance, please provide a number");
      return;
    }

    const run = {
      location,
      date,
      _id: prevRun._id,
      createdBy: auth?.userId,
      distance: convertDistanceToMeters(distance, unit),
    };

    await updateRun(run);
    navigate("/", { replace: true });
  }

  return (
    <div className="container">
      <Nav></Nav>
      <h1>Edit run</h1>
      <div className="">
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
      <div className="">
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
      <div className="">
        <label className="label" htmlFor="distance">
          Distance
        </label>
        <input
          type="text"
          id="distance"
          value={distance}
          onChange={(e) => {
            setError("");
            setDistance(parseFloat(e.target.value));
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
      <div className="">
        <p>Category</p>
        <input type="radio" name="category" value="long-run" id="long-run" />
        <label htmlFor="long-run">Long-run</label>
        <input type="radio" name="category" value="recovery" id="recovery" />
        <label htmlFor="recovery">Recovery</label>
        <input type="radio" name="category" value="tempo" id="tempo" />
        <label htmlFor="tempo">Tempo</label>
      </div>
      <button onClick={handleUpdate}>Edit</button>
    </div>
  );
}

export default EditRun;
