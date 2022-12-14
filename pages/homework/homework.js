//hooks
import useUserFetch from "../../helpers/hooks/user";
import useClassroomFetch from "../../helpers/hooks/classroom";
//custom
import { AuthGuard } from "../../components/elements/AuthGuard";
import CirclesCardHomework from "../../components/cards/CirclesCardHomework";

export default function Homework() {
  const { user } = useUserFetch();
  const { homeworks, classroom } = useClassroomFetch(user);

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-20">
        <section className="top_section px-4">
          <div className="flex items-center">
            {!classroom?.name && (
              <span className="bg-gray-300 animate-pulse rounded w-10 h-5"></span>
            )}
            <p className="font-bold text-xl font-nexa text-cyan-700">
              {classroom?.name}{" "}
              <span className="text-cyan-500 font-medium">Homework</span>
            </p>
          </div>
          <div className="my-6 grid gap-4">
            {homeworks.map((h, i) => (
              <CirclesCardHomework key={h.id} index={i} data={h} />
            ))}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
