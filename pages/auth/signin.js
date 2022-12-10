import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
//hooks
import { useAuth } from "../../context/authContext";
//custom
import { classNames } from "../../helpers/utility";
import Logo from "./logo";
//dynamic
const FaFingerprint = dynamic(
  async () => (await import("react-icons/fa")).FaFingerprint
);

export default function SignIn() {
  const { user, error, status, SignIn } = useAuth();
  const [email, setEmail] = useState({ data: "", state: null });
  const [password, setPassword] = useState({
    data: "",
    state: null,
    show: false,
  });

  useEffect(() => {
    if (user) Router.push("/");
  }, [user]);

  const change = (event, setFunction, type = "str") => {
    switch (type) {
      case "str":
        setFunction({
          data: event.target.value,
          state: "success",
        });
        break;
      default:
        break;
    }
  };

  const toggleVisibility = (e, data, setFunc) => {
    e.preventDefault();
    setFunc({ ...data, show: !data.show });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await SignIn({
      email: email.data,
      password: password.data,
    });
  };

  return (
    <main className="relative h-screen w-screen bg-cyan-50 flex flex-col">
      <Logo />
      <p className="font-poppins font-semibold text-cyan-600 text-2xl text-center">
        Recess
      </p>
      <p className="font-poppins font-medium text-sm text-center mb-4 text-gray-400">
        School made easy
      </p>
      <section>
        <div className="grid gap-4 px-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xs font-medium text-cyan-500">
                Email
              </span>
            </label>
            <input
              type="text"
              placeholder={"Email"}
              onChange={(event) => change(event, setEmail)}
              className={classNames(
                "input input-primary w-full input-bordered focus:bg-white",
                email?.state === "error" && "input-error"
              )}
            />
          </div>
          <div className="form-control w-full -mt-3">
            <label className="label">
              <span className="label-text text-xs font-medium text-cyan-500">
                Password
              </span>
            </label>
            <div className="input-group">
              <input
                type={password?.show ? "text" : "password"}
                placeholder={"Password"}
                onChange={(e) => change(e, setPassword)}
                className={classNames(
                  "input input-primary w-full input-bordered focus:bg-white focus:border-2",
                  password?.state === "error" && "input-error"
                )}
              />
              <button
                onClick={(e) => toggleVisibility(e, password, setPassword)}
                className={classNames(
                  "btn btn-outline btn-primary",
                  !password?.show && "!text-gray-300"
                )}
              >
                <FaFingerprint size="1.25rem" />
              </button>
            </div>
          </div>
          {error && status !== "loading" && (
            <p className="text-error text-xs italic text-center mt-1">
              {error}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="btn btn-primary gap-3 rounded-md shadow-md max-w-sm"
          >
            Sign in
          </button>
        </div>
      </section>
    </main>
  );
}
