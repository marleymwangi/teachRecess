import ModalContact from "./Contact";
import ModalHomework from "./HomeworkModal";
import ModalUser from "./UserMenu";

export default function Modals() {
  return (
    <div>
      <ModalUser/>
      <ModalHomework/>
      <ModalContact />
    </div>
  );
}
