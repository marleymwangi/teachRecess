import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
//hooks
import { useAuth } from "../../context/authContext";
//custom
import { classNames } from "../../helpers/utility";
import Logo from "./logo";
//dynamic
const FaEye = dynamic(async () => (await import("react-icons/fa")).FaEye);
const FaEyeSlash = dynamic(
  async () => (await import("react-icons/fa")).FaEyeSlash
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const change = (event, setFunction, type = "str") => {
    switch (type) {
      case "mail":
        if (event.target.value?.length > 0) {
          if (validateEmail(event.target.value)) {
            setFunction({
              data: event.target.value,
              state: "success",
            });
          } else {
            setFunction({
              data: event.target.value,
              state: "error",
            });
          }
        } else {
          setFunction({
            data: event.target.value,
            state: null,
          });
        }
        break;
      case "str":
        if (event.target.value?.length > 0) {
          setFunction({
            data: event.target.value,
            state: "success",
          });
        } else {
          setFunction({
            data: event.target.value,
            state: null,
          });
        }
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
        <div className="grid gap-4 px-6 pb-[30vh]">
          <div className="relative form-control w-full">
            <input
              type="text"
              placeholder=" "
              onChange={(e) => change(e, setEmail, "mail")}
              className={classNames(
                "block rounded-lg px-2.5 pb-2.5 pt-6 w-full text-sm bg-white border focus:border-2 appearance-none focus:outline-none focus:ring-0 peer",
                email?.state === "success" && "text-success border-success",
                email?.state === "error" && "text-error border-error",
                email?.state !== "success" &&
                  email?.state !== "error" &&
                  "text-cyan-500 border-cyan-500 focus:border-cyan-500"
              )}
            />
            <label
              className={classNames(
                "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
                email?.state === "success" && "text-success",
                email?.state === "error" && "text-error",
                email?.state !== "success" &&
                  email?.state !== "error" &&
                  "text-cyan-700 peer-focus:text-cyan-600"
              )}
            >
              Email
            </label>
            {email?.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please enter a valid email
              </p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative form-control w-full">
              <input
                placeholder=" "
                onChange={(e) => change(e, setPassword)}
                type={password?.show ? "text" : "password"}
                className={classNames(
                  "block rounded-lg px-2.5 pb-2.5 pt-6 w-full text-sm bg-white border focus:border-2 appearance-none focus:outline-none focus:ring-0 peer",
                  password?.state === "success" &&
                    "text-success border-success",
                  password?.state === "error" && "text-error border-error",
                  password?.state !== "success" &&
                    password?.state !== "error" &&
                    "text-cyan-500 border-cyan-500 focus:border-cyan-500"
                )}
              />
              <label
                className={classNames(
                  "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
                  password?.state === "success" && "text-green-500",
                  password?.state === "error" && "text-error",
                  password?.state !== "success" &&
                    password?.state !== "error" &&
                    "text-cyan-700 peer-focus:text-cyan-600"
                )}
              >
                Password
              </label>
              {password?.state === "error" && (
                <p className="text-error text-xs italic text-center mt-1">
                  Please enter a valid email
                </p>
              )}
            </div>
            <button
              onClick={(e) => toggleVisibility(e, password, setPassword)}
              className={classNames(
                "btn btn-circle btn-outline btn-primary",
                !password?.show && "!text-gray-300"
              )}
            >
              <label
                className={classNames(
                  "swap swap-rotate text-6xl",
                  password.show && "swap-active"
                )}
              >
                <FaEye className="swap-on" size="1.25rem" />
                <FaEyeSlash className="swap-off" size="1.25rem" />
              </label>
            </button>
          </div>
          {error && status !== "loading" && (
            <p className="text-error text-xs italic text-center mt-1">
              {error}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="btn btn-lg btn-primary gap-3 rounded-2xl shadow-md max-w-sm mx-6 mt-6"
          >
            Sign in
          </button>
        </div>
      </section>
    </main>
  );
}
