import { Link } from "react-router-dom";

const ErrorBoundary = () => {
  return (
    <section>
      <h1>Error</h1>
      <p>Sorry something went wrong</p>
      <Link to={"/"}>Return to main page</Link>
    </section>
  );
};

export default ErrorBoundary;
