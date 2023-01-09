import Link from "next/link";
import dynamic from "next/dynamic";
//hooks
//custom
import Logo from "./auth/logo";
//dynamic
const FiInfo = dynamic(async () => (await import("react-icons/fi")).FiInfo);

export default function ErrorPage() {
  return (
    <main className="relative w-full min-h-[95vh] py-14 bg-cyan-50 flex flex-col">
      <Logo />
      <p className="font-poppins font-semibold text-cyan-600 text-2xl text-center">
        Recess
      </p>
      <p className="font-poppins font-medium text-sm text-center mb-4 text-gray-400">
        School made easy
      </p>
      <section className="container mx-auto px-6 text-center">
        <div className="flex gap-4 items-center justify-around">
          <FiInfo size="2em" className="text-error" />
          <p className="font-medium text-error">An error occured</p>
          <FiInfo size="2em" className="text-error" />
        </div>
        <p className="text-gray-400 text-lg mt-6">
          Click here to go back to the home
        </p>
        <Link href="/">
          <button className="btn btn-primary rounded-xl shadow-md mt-6">
            Go Home
          </button>
        </Link>
      </section>
    </main>
  );
}
