import ModalContact from "./Contact";
import ModalHomework from "./HomeworkModal";
import ModalStudents from "./Students";
import ModalUser from "./UserMenu";

export default function Modals() {
  return (
    <div>
      <ModalUser/>
      <ModalHomework/>
      <ModalContact />
      <ModalStudents/>
    </div>
  );
}
