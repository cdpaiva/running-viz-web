import { Link, useLoaderData } from "react-router-dom";
import { Run } from "../types/Run";
import HeatMap from "./HeatMap";
import getHeatMapData from "../utils/getHeatMapData";
import Nav from "./Nav";

type AllRunsResponse = {
  runs: Run[];
  count: number;
};

const Home = () => {
  const loadedData = useLoaderData() as AllRunsResponse;

  const runs = loadedData.runs;

  const data = getHeatMapData(loadedData.runs);

  const totalDistance = runs.reduce(
    (acc: number, curr) => (acc += curr.distance),
    0
  );

  const averageHeartRate = () => {
    let total = 0;
    let n = 0;
    runs.forEach((r) => {
      if (r.heartRateAverage) {
        total += r.heartRateAverage;
        n++;
      }
    });

    return Math.round(total / n);
  };

  const averageDistance = () => {
    return (totalDistance / (runs.length * 1000)).toFixed(2);
  };

  return (
    <div className="container">
      <Nav />
      <div>
        <p>{`Total distance ran: ${(totalDistance / 1000).toFixed(2)} km`}</p>
        <p>{`Number of runs: ${runs.length}`}</p>
        <p>{`Average distance: ${averageDistance()} km`}</p>
        <p>{`Average heart rate: ${averageHeartRate()}`}</p>
      </div>
      <HeatMap width={400} height={123} data={data} />
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
