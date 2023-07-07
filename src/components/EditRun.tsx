import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { updateRun } from "../service/runService";
import { Run } from "../types/Run";
import Notification from "./Notification";
import Button from "./Button";

type unit = "miles" | "kilometers";

function convertDistanceToMeters(distance: number, unit: unit) {
  if (unit === "miles") {
    return Math.round(distance * 1609.34);
  }
  return Math.round(distance * 1000);
}

function convertToKms(distance: number) {
  return distance / 1000;
}

function EditRun() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const prevRun = useLoaderData() as Run;

  const [location, setLocation] = useState(prevRun.location);
  const [date, setDate] = useState(prevRun.date.substring(0, 10));
  const [distance, setDistance] = useState(convertToKms(prevRun.distance));
  const [unit, setUnit] = useState<unit>("kilometers");
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

    const updatedRun = await updateRun(run);
    if (updatedRun === "ERR_BAD_REQUEST") {
      setError("Could not update the run, make sure that are no empty fields");
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <div className="container max-w-3xl">
      <Nav />
      <h1 className="text-2xl font-semibold mb-4">Edit run</h1>
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
          className="appearance-none border-2 border-white rounded py-2 px-3 mb-2 mr-4 focus:outline focus:outline-blue-500 bg-black text-white"
          type="text"
          id="distance"
          value={distance}
          onChange={(e) => {
            setError("");
            setDistance(parseInt(e.target.value));
          }}
        />
        <select
          className="border-2 border-white rounded py-2 px-3 mb-2 focus:outline focus:outline-blue-500 bg-black text-white"
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
      <Button handler={handleUpdate} text="Save changes" border />
      <div className="text-right px-3 py-2 underline">
        <Link to="/dashboard">Back</Link>
      </div>
    </div>
  );
}

export default EditRun;
