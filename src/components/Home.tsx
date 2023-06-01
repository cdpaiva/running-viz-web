import { Link, useLoaderData } from "react-router-dom";
import { Run } from "../types/Run";
import HeatMap from "./HeatMap";
import data from "./data";
import Nav from "./Nav";

type AllRunsResponse = {
  runs: Run[];
  count: number;
};

const Home = () => {
  const loadedData = useLoaderData() as AllRunsResponse;

  const runs = loadedData.runs;

  return (
    <div className="container">
      <Nav />
      <HeatMap width={364} height={130} data={data} />
      <br />
      {runs.map((r, i) => (
        <div key={i} className="run-card">
          <div className="date">
            <p className="date-day">{r.date.substring(8, 10)}</p>
            <p className="date-month">MAY</p>
          </div>
          <div className="">
            <Link to={`/runs/${r._id}`}>{r.location}</Link>
            <p>{(r.distance / 1000).toFixed(2) + " km"}</p>
          </div>
        </div>
      ))}
      <Link to="/new-run">Add a new run</Link>
    </div>
  );
};

export default Home;
