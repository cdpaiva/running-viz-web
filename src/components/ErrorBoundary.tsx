import { Link } from "react-router-dom";

const ErrorBoundary = () => {
  return (
    <section className="max-w-xl container py-8">
      <h1 className="text-3xl my-2">Error</h1>
      <p className="my-2 text-lg">Sorry something went wrong</p>
      <Link
        className="underline hover:text-neon-green block my-6"
        to={"/dashboard"}
      >
        Return to main page
      </Link>
      <Link className="underline hover:text-neon-green block" to={"/login"}>
        Move back to the login page
      </Link>
    </section>
  );
};

export default ErrorBoundary;
