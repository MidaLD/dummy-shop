import { useState } from "react";
import { useLogin } from "../features/authentication/useLogin";
import Spinner from "../ui/Spinner";

const inputBase =
  "w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-150 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

const inputNormal =
  "border-slate-200 hover:border-slate-300 focus:border-slate-600 focus:ring-slate-600/20";

const inputError = "border-red-300 focus:border-red-400 focus:ring-red-400/20";

function LoginFormPage() {
  const [username, setUsername] = useState("liamg");
  const [password, setPassword] = useState("liamgpass");

  const { login, isLoggingIn, error } = useLogin();

  function handleLogin(e: React.SubmitEvent) {
    e.preventDefault();

    login({ username, password });
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-slate-800 px-14 py-12 text-white">
        <div className="text-lg font-semibold tracking-tight">
          Dummy<span className="text-slate-400">Shop</span>
        </div>

        <div>
          <p className="text-3xl font-semibold leading-snug text-white">
            "Thousands of products,
            <br />
            one seamless checkout."
          </p>
          <p className="mt-4 text-sm text-slate-400">
            The modern shopping experience, built for everyone.
          </p>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} DummyShop. All rights reserved.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-12">
        <div className="lg:hidden mb-10 text-lg font-semibold tracking-tight text-slate-800">
          Dummy<span className="text-slate-400">Shop</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <svg
                  className="w-4 h-4 shrink-0 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <p className="text-xs font-medium text-red-600">
                  Invalid username or password. Please try again.
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700"
              >
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
                disabled={isLoggingIn}
                className={`${inputBase} ${error ? inputError : inputNormal}`}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                disabled={isLoggingIn}
                className={`${inputBase} ${error ? inputError : inputNormal}`}
              />
            </div>

            <button
              disabled={isLoggingIn}
              type="submit"
              className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <Spinner size="sm" className="text-white/70" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
