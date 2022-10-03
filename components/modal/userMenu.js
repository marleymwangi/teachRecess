import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import ImageLoader from "../elements/imageLoader";
//dynamic
const HiBell = dynamic(async () => (await import("react-icons/hi")).HiBell);

export default function ModalUser() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    document.getElementById("user_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="user_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box pb-20">
          <div className="flex items-center justify-between pb-6">
            <p className="text-lg text-gray-400">User Options</p>
            <label
              htmlFor="user_modal"
              className="btn btn-sm btn-secondary btn-outline btn-circle"
            >
              ✕
            </label>
          </div>
          <div className="grid gap-4 w-full text-center text-secondary font-poppins">
            <div className="btn btn-lg text-base btn-ghost bg-gray-100 btn-secondary gap-2">
              <HiBell size="1.25em" />
              <p>Notifications</p>
            </div>
            <button onClick={handleLogout} className="btn btn-lg text-base btn-ghost bg-gray-100 btn-secondary gap-2">
              <p>Logout</p>
              <div className="avatar relative">
                <div className="w-6 rounded-full">
                  <ImageLoader
                    src={session?.user?.image}
                    fallbackSrc="/assets/person.webp"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
