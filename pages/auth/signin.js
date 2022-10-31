import dynamic from "next/dynamic";
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
//dynamic
const FcGoogle = dynamic(async () => (await import("react-icons/fc")).FcGoogle);
const BsApple = dynamic(async () => (await import("react-icons/bs")).BsApple);

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
    let res = SignInProvider("credentials", {
      email: email.data,
      password: password.data,
      redirect: false,
    });
    console.log(res);
  };

  let creds =
    providers &&
    Object.values(providers)?.find((p) => p?.type === "credentials");

  return (
    <main className="relative h-screen w-screen bg-cyan-400 flex flex-col">
      <Logo />
      <p className="font-poppins font-semibold text-xl text-center">Recess</p>
      <p className="font-poppins font-medium text-center text-lg mb-4">
        School made easy
      </p>
      <section>
        {creds && (
          <div className="grid gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-xs text-emma-500">Email</span>
              </label>
              <input
                type="text"
                placeholder={"Email"}
                onChange={(event) => change(event, setEmail)}
                className={classNames(
                  "input input-primary w-full input-bordered focus:bg-white focus:border-2",
                  email?.state === "error" && "input-error"
                )}
              />
              {email?.state === "error" && (
                <p className="text-error text-xs italic text-center mt-1">
                  Please fill out the field with a valid input
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-xs text-emma-500">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder={"Password"}
                onChange={(event) => change(event, setPassword)}
                className={classNames(
                  "input input-primary w-full input-bordered focus:bg-white focus:border-2",
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
              className="btn btn-primary btn-lg gap-3 rounded-full"
            >
              Sign in
            </button>
          </div>
        )}
      </section>
      <p className="font-poppins font-medium text-center text-gray-500 text-sm mt-10 mb-4 uppercase">
        Sign in using
      </p>
      <section className="w-full max-w-xs mx-auto flex items-center justify-center gap-6">
        {providers &&
          Object.values(providers).map(
            (provider) =>
              provider.type !== "credentials" && (
                <button
                  key={provider.name}
                  onClick={() =>
                    SignInProvider(provider.id, { callbackUrl: "/" })
                  }
                  className="btn btn-ghost bg-white focus:bg-gray-100 shadow-md btn-lg rounded-full min-h-[80px]"
                >
                  <FcGoogle size="1.5em" />{" "}
                </button>
              )
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
