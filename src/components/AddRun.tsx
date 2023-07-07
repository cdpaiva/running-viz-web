import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { createRun } from "../service/runService";
import Button from "./Button";
import Notification from "./Notification";

type unit = "miles" | "kilometers";

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
    console.log(run);

    await createRun(run);
    navigate("/");
  }

  return (
    <div className="container max-w-3xl">
      <Nav />
      <h1 className="text-2xl font-semibold mb-4">New run</h1>
      {error && (
        <Notification
          handleClose={() => setError("")}
          text={error}
          variant="danger"
        />
      )}
      <div>
        <label className="block mb-2" htmlFor="location">
          Location
        </label>
        <input
          className="appearance-none border-2 border-white rounded w-full py-2 px-3 mb-2 focus:outline focus:outline-blue-500 bg-black text-white"
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="date">
          Date
        </label>
        <input
          className="appearance-none border-2 border-white rounded py-2 px-3 mb-2 focus:outline focus:outline-blue-500 bg-black text-white"
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="distance">
          Distance
        </label>
        <input
          className="appearance-none border-2 border-white rounded py-2 px-3 mb-2 focus:outline focus:outline-blue-500 bg-black text-white"
          type="text"
          id="distance"
          value={distance}
          onChange={(e) => {
            setError("");
            setDistance(e.target.value);
          }}
        />
        <select
          className="border-2 border-white rounded py-2 px-3 ml-4 focus:outline focus:outline-blue-500 bg-black text-white"
          value={unit}
          onChange={(e) => {
            const u = e.target.value as unit;
            setUnit(u);
          }}
        >
          <option value="miles">Miles</option>
          <option value="kilometers">Kilometers</option>
        </select>
        <div></div>
      </div>
      <Button handler={saveRun} text="Add" border />
      <div className="text-right px-3 py-2 underline hover:text-neon-green">
        <Link to="/dashboard">Back</Link>
      </div>
    </div>
  );
}

export default AddRun;
