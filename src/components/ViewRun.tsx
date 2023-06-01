import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { Run } from "../types/Run";
import { deleteRun } from "../service/runService";

function ViewRun() {
  const navigate = useNavigate();
  const run = useLoaderData() as Run;

  function handleRemove() {
    if (confirm("Please confirm the deletion of this entry")) {
      if (run._id) {
        deleteRun(run._id);
      }
    }
    navigate("/");
  }

  return (
    <div className="container">
      <Nav />
      <h1>Run details</h1>
      <p>{run.location}</p>
      <p>{run.distance}</p>
      <p>{run.date}</p>
      <Link to={`/edit-run/${run._id}`}>Edit</Link>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default ViewRun;
