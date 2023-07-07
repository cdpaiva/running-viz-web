import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { Run } from "../types/Run";
import { deleteRun } from "../service/runService";

function ViewRun() {
  const navigate = useNavigate();
  const run = useLoaderData() as Run;

  async function handleRemove() {
    if (confirm("Please confirm the deletion of this entry")) {
      if (run._id) {
        await deleteRun(run._id);
      }
    }
    navigate("/");
  }

  const formatToKM = (distance: number) => `${(distance / 1000).toFixed(2)} km`;

  return (
    <div className="container max-w-3xl">
      <Nav />
      <h1 className="text-2xl font-semibold mb-4">Run details</h1>
      {location && (
        <h3 className="text-xl font-semibold mb-4 text-blue-300">
          {run.location}
        </h3>
      )}
      <table className="table-auto my-4 mx-auto text-sm sm:text-base">
        <tbody>
          <tr>
            <td className="px-3 py-2 border-2 bg-zinc-800 border-slate-400">
              Distance
            </td>
            <td className="px-3 py-2 border-2 border-slate-400">
              {formatToKM(run.distance)}
            </td>
          </tr>

          <tr>
            <td className="px-3 py-2 border-2 bg-zinc-800 border-slate-400">
              Date
            </td>
            <td className="px-3 py-2 border-2 border-slate-400">
              {new Date(run.date).toLocaleString("en-US", { timeZone: "UTC" })}
            </td>
          </tr>

          {run.duration && (
            <tr>
              <td className="px-3 py-2 border-2 bg-zinc-800 border-slate-400">
                Duration
              </td>
              <td className="px-3 py-2 border-2 border-slate-400">
                {run.duration}
              </td>
            </tr>
          )}

          {run.calories && (
            <tr>
              <td className="px-3 py-2 border-2 bg-zinc-800 border-slate-400">
                Calories
              </td>
              <td className="px-3 py-2 border-2 border-slate-400">
                {run.calories}
              </td>
            </tr>
          )}

          {run.heartRateAverage && (
            <tr>
              <td className="px-3 py-2 border-2 bg-zinc-800 border-slate-400">
                Heart Rate
              </td>
              <td className="px-3 py-2 border-2 border-slate-400">
                {`${run.heartRateAverage} (avg) ${run.heartRateMax} (max) `}
              </td>
            </tr>
          )}

          {run.trainingLoad && (
            <tr>
              <td className="px-3 py-2 border-2 bg-zinc-800 border-slate-400">
                Polar training load
              </td>
              <td className="px-3 py-2 border-2 border-slate-400">
                {run.trainingLoad}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between gap-4">
        <div>
          <Link
            className="underline hover:text-neon-green"
            to={`/edit-run/${run._id}`}
          >
            Edit
          </Link>
          <button
            className="underline hover:text-neon-green ml-4"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
        <div className="text-right underline hover:text-neon-green">
          <Link to="/home">Back</Link>
        </div>
      </div>
    </div>
  );
}

export default ViewRun;
