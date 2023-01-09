//custom
import TeacherComment from "../components/cards/TeacherComment";
import { AuthGuard } from "../components/elements/AuthGuard";
import SectionCreate from "../components/sections/SectionCreate";
import CirclesCardUser from "../components/cards/CirclesCardUser";
import SectionLists from "../components/sections/SectionLists";

export default function Home() {
  return (
    <AuthGuard>
      <main className="min-h-[95vh] px-6 pt-20 pb-16">
        <CirclesCardUser />
        <SectionCreate />
        <SectionLists />
      </main>
    </AuthGuard>
  );
}
