import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Unauthorized</h1>
      <p>Sorry, you cannot be here with you current user</p>
      <div className="flexGrow">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default Unauthorized;
