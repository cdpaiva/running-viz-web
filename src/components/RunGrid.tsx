import { Link } from "react-router-dom";
import { Run } from "../types/Run";

function RunGrid(props: { runs: Run[] }) {
  if (props.runs.length === 0) {
    return <></>;
  }
  const date = (d: string) => {
    return new Date(d).toLocaleDateString("en-US", { timeZone: "UTC" });
  };

  const sortedRuns = props.runs.sort(
    (r1, r2) => new Date(r2.date).getTime() - new Date(r1.date).getTime()
  );

  return (
    <>
      <h3 className="text-2xl">All runs</h3>
      <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {sortedRuns.map((r) => (
          <div key={r._id}>
            <Link className="" to={`/runs/${r._id}`}>
              <div className="rounded-sm border-1 border-white hover:border-blue-400 text-center py-2">
                <p className="text-blue-300">{date(r.date)}</p>
                <div>
                  <p>{(r.distance / 1000).toFixed(2) + " km"}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default RunGrid;
