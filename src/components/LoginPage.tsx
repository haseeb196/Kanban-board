import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, checkLocal, checkUser } from "./Store/UserStore";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = localStorage.getItem("user");
    if (getData !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dispatch(checkLocal(JSON.parse(getData)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLogin = () => {
    if (username !== "" && password !== "") {
      const user = { username: username, password: password };
      if (signUp) {
        dispatch(addUser(user));
        localStorage.setItem(
          "user",
          JSON.stringify({ username, password, loggedIn: false }),
        );
        setSignUp(false);
        setUsername("");
        setPassword("");
      } else {
        dispatch(checkUser(user));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, loggedIn: true }),
        );
      }
    }
  };
  return (
    <div className="flex h-screen  items-center justify-center">
      <div className="flex w-[350px]  flex-col items-center gap-10 rounded-md bg-slate-200 py-7 pl-5 pr-10 shadow-md">
        {" "}
        <div>
          <h1 className="text-4xl capitalize">
            {signUp ? "SignUp page" : "Login page"}
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-lg">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="text-lg">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-[13px]">
            {signUp ? (
              <p>
                Already a User{" "}
                <span
                  className="text-blue-500 underline"
                  onClick={() => setSignUp(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?{" "}
                <span
                  className="text-blue-500 underline"
                  onClick={() => setSignUp(true)}
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={handleLogin}
            className="w-full bg-sky-500 py-2 hover:bg-sky-600 "
          >
            {signUp ? "SignUp" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
