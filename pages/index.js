//custom
import TeacherComment from "../components/cards/teacherComment";
import Subjects from "../components/cards/subjects";
import { AuthGuard } from "../components/elements/authGuard";
import CardHomeWorkSummary from "../components/cards/homeWorkSummary";
import UpcomingEvents from "../components/cards/upcomingEvents";
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
