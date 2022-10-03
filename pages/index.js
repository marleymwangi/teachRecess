//custom
import TeacherComment from "../components/cards/teacherComment";
import { AuthGuard } from "../components/elements/authGuard";
import SectionCreate from "../components/sections/SectionCreate";
import CirclesCardUser from "../components/cards/CirclesCardUser";
import SectionLists from "../components/sections/SectionLists";

export default function Home() {
  return (
    <AuthGuard>
      <main className="px-6 pt-20 pb-16">
        <CirclesCardUser />
        <SectionCreate />
        <TeacherComment />
        <SectionLists />
      </main>
    </AuthGuard>
  );
}
