import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found-box">
        <h1>The page you are looking for could not be found </h1>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          &larr; Go back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
