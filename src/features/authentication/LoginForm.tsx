import { useState } from "react";
import { useLogin } from "./useLogin";
import Spinner from "../../ui/Spinner";

function LoginForm() {
  const [username, setUsername] = useState("liamg");
  const [password, setPassword] = useState("liamgpass");

  const { login, isLoggingIn, error } = useLogin();

  function handleLogin(e: React.SubmitEvent) {
    e.preventDefault();

    login({ username, password });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            className={error ? "login-fail" : " "}
            name="username"
            placeholder="Enter your username"
            required
            disabled={isLoggingIn}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className={error ? "login-fail" : " "}
            name="password"
            placeholder="Enter your password"
            required
            disabled={isLoggingIn}
          />
        </div>

        <button disabled={isLoggingIn} type="submit" className="login-btn">
          {isLoggingIn ? <Spinner small={true} /> : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
