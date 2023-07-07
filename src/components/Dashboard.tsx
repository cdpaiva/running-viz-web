import { Link, useLoaderData } from "react-router-dom";
import { Run } from "../types/Run";
import HeatMap from "./HeatMap";
import getHeatMapData from "../utils/getHeatMapData";
import Nav from "./Nav";
import RunSummary from "./RunSummary";
import RunGrid from "./RunGrid";

type AllRunsResponse = {
  runs: Run[];
  count: number;
};

const Dashboard = () => {
  const loadedData = useLoaderData() as AllRunsResponse;

  const runs = loadedData.runs;

  const data = getHeatMapData(loadedData.runs);

  return (
    <div className="container max-w-3xl">
      <Nav />
      <RunSummary runs={runs} />
      <HeatMap width={400} height={123} data={data} />
      <div className="text-center py-10">
        <Link
          className="hover:text-neon-green px-4 py-3 border-2 rounded-md border-white"
          to="/new-run"
        >
          Add a new run
        </Link>
      </div>
      <RunGrid runs={runs} />
    </div>
  );
};

export default Dashboard;
