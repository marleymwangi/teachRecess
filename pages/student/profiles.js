//hooks
import useTeacherFetch from "../../helpers/hooks/teacher";
//custom
import Profile from "../../components/child/profile";
import { AuthGuard } from "../../components/elements/authGuard";

export default function Profiles() {
  const {students} = useTeacherFetch();

  return (
    <AuthGuard>
      <main className="py-20 px-6 grid gap-4">
        {students.map((stud) => (
          <Profile key={stud.id} data={stud} />
        ))}
      </main>
    </AuthGuard>
  );
}
