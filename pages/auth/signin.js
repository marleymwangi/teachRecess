import { useEffect, useState } from "react";
import {
  getProviders,
  signIn as SignInProvider,
  useSession,
} from "next-auth/react";
import Router from "next/router";
//custom
import { classNames } from "../../helpers/utility";
import Logo from "./logo";

export default function SignIn({ providers }) {
  const { data: session } = useSession();

  const [email, setEmail] = useState({ data: "", state: null });
  const [password, setPassword] = useState({ data: "", state: null });

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

  useEffect(() => {
    if (session) Router.push("/");
  }, [session]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let res = SignInProvider("credentials", {
      email: email.data,
      password: password.data,
      redirect: false,
    });
  };

  let creds =
    providers &&
    Object.values(providers)?.find((p) => p?.type === "credentials");

    return (
      <main className="relative h-screen w-screen bg-cyan-50 flex flex-col">
        <Logo />
        <p className="font-poppins font-semibold text-cyan-600 text-2xl text-center">Recess</p>
        <p className="font-poppins font-medium text-sm text-center mb-4 text-gray-400">
          School made easy
        </p>
        <section>
          {creds && (
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
                {email?.state === "error" && (
                  <p className="text-error text-xs italic text-center mt-1">
                    Please fill out the field with a valid input
                  </p>
                )}
              </div>
              <div className="form-control w-full -mt-3">
                <label className="label">
                  <span className="label-text text-xs font-medium text-cyan-500">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder={"Password"}
                  onChange={(event) => change(event, setPassword)}
                  className={classNames(
                    "input input-primary w-full input-bordered focus:bg-white",
                    password?.state === "error" && "input-error"
                  )}
                />
                {password?.state === "error" && (
                  <p className="text-error text-xs italic text-center mt-1">
                    Please fill out the field with a valid input
                  </p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-primary gap-3 rounded-md shadow-md max-w-sm"
              >
                Sign in
              </button>
            </div>
          )}
        </section>
      </main>
    );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
