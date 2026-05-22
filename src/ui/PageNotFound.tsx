import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-slate-100 bg-white p-12 shadow-sm">
        <h1 className="text-6xl font-bold text-slate-200">404</h1>
        <p className="text-base font-medium text-slate-700">Page not found</p>
        <p className="text-sm text-slate-400">
          The page you are looking for could not be found.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer mt-2 rounded-xl bg-slate-700 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 active:bg-slate-900"
        >
          &larr; Go back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
