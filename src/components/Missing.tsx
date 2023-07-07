import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article className="p-64">
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/dashboard">Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default Missing;
