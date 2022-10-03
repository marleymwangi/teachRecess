import dynamic from "next/dynamic";
import { useRouter } from "next/router";
//custom
import { useData } from "../../context/dataContext";
import ImageLoader from "../elements/imageLoader";
//dynamic
const BiLeftArrow = dynamic(
  async () => (await import("react-icons/bi")).BiLeftArrow
);
const HiDotsVertical = dynamic(
  async () => (await import("react-icons/hi")).HiDotsVertical
);

export default function TopNavbar() {
  const router = useRouter();
  const { selChatPart } = useData();
  const size = "1.5em";

  const handleBack = () => {
    router.back();
  };

  if (
    router.pathname.indexOf("/auth/") === 0 ||
    router.pathname.indexOf("/welcome") === 0
  ) {
    return null;
  } else {
    return (
      <nav className="fixed top-0 z-40 border-b border-accent border-opacity-50 bg-base-100 shadow max-w-screen w-full p-1 flex justify-between text-primary">
        <div onClick={handleBack} className="grid place-content-center">
          <button className="btn btn-circle btn-ghost">
            <BiLeftArrow size={size} />
          </button>
        </div>
        <div className="grid place-content-center text-secondary font-poppins font-medium capitalize">
          <span>
            {router.pathname === "/" ? (
              "home"
            ) : router.pathname.indexOf("/chats/chat") === 0 ? (
              <div className="avatar flex items-center">
                <h1 className="mr-2 font-semibold">{selChatPart?.name}</h1>
                <div className="w-6 rounded-full">
                  <ImageLoader src={selChatPart?.image} />
                </div>
              </div>
            ) : router.pathname.indexOf("/chats/") === 0 ? (
              router.pathname.slice(7)
            ) : router.pathname.indexOf("/student/") === 0 ? (
              router.pathname.slice(9)
            ) : router.pathname.indexOf("/create/") === 0 ? (
              router.pathname.slice(8)
            ) : (
              router.pathname.slice(1)
            )}
          </span>
        </div>
        <div className="grid place-content-center">
          <label
            htmlFor="user_modal"
            className="btn btn-circle btn-ghost modal-button"
          >
            <HiDotsVertical size={size} />
          </label>
        </div>
      </nav>
    );
  }
}
