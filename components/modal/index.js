import ModalComment from "./comment";
import ModalContact from "./contact";
import ModalUploadPortfolio from "./uploadPortfolio";
import ModalUser from "./userMenu";

export default function Modals() {
  return (
    <div>
      <ModalUser/>
      <ModalUploadPortfolio />
      <ModalContact />
      <ModalComment />
    </div>
  );
}
