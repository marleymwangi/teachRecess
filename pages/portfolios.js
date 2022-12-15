import dynamic from "next/dynamic";
//hooks
import useUserFetch from "../helpers/hooks/user";
//custom
import CardProject from "../components/cards/project";
import { AuthGuard } from "../components/elements/AuthGuard";
//icons
//dynamic
const RiSearch2Line = dynamic(
  async () => (await import("react-icons/ri")).RiSearch2Line
);

export default function Portfolios() {
  const { portfolios } = useUserFetch();

  return (
    <AuthGuard>
      <main className="pt-20 pb-4">
        <section className="bg-gray-200 overflow-hidden p-4 mb-10">
          <div className="bg-white w-4/5 mx-auto rounded-full mb-4 flex items-center p-2">
            <RiSearch2Line size="1.5em" />
          </div>
          <div className="flex flex-col gap-4 pt-4 min-h-[75vh] overflow-y-scroll">
            {portfolios?.length > 0 &&
              portfolios.map((p) => <CardProject key={p.id} data={p} />)}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
