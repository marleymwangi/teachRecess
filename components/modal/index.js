import ModalComment from "./comment";
import ModalContact from "./contact";
import ModalHomework from "./HomeworkModal";
import ModalUploadPortfolio from "./uploadPortfolio";
import ModalUser from "./UserMenu";

export default function Modals() {
  return (
    <div>
      <ModalUser/>
      <ModalHomework/>
      <ModalUploadPortfolio />
      <ModalContact />
      <ModalComment />
    </div>
  );
}
