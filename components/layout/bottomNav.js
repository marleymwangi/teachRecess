import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
//custom packs
const FaHome = dynamic(async () => (await import("react-icons/fa")).FaHome);
const FaCalendarCheck = dynamic(
  async () => (await import("react-icons/fa")).FaCalendarCheck
);
const FaChild = dynamic(async () => (await import("react-icons/fa")).FaChild);
const RiChatSmile3Fill = dynamic(
  async () => (await import("react-icons/ri")).RiChatSmile3Fill
);
const MdBook = dynamic(async () => (await import("react-icons/md")).MdBook);

const NavTab = dynamic(() => import("../elements/navTab"));

export default function BottomNav() {
  const router = useRouter();
  const [selected, setSelected] = useState(router.pathname);

  if (
    router.pathname.indexOf("/auth/") === 0 ||
    router.pathname.indexOf("/chats/chat") === 0
  ) {
    return null;
  } else {
    return (
      <div className="bottom__nav__cont">
        <div className="bottom__nav">
          <NavTab
            icon={<FaCalendarCheck size="1.5em" />}
            href="/reminders"
            text={"reminders"}
            selected={selected}
            setSelected={setSelected}
          />
          <NavTab
            icon={<MdBook size="1.5em" />}
            href="/diaries"
            text={"diaries"}
            selected={selected}
            setSelected={setSelected}
          />
          <NavTab
            icon={<FaHome size="1.5em" />}
            href="/"
            text={"home"}
            selected={selected}
            setSelected={setSelected}
          />
          <NavTab
            icon={<RiChatSmile3Fill size="1.5em" />}
            href="/chats"
            text={"chats"}
            selected={selected}
            setSelected={setSelected}
          />
          <NavTab
            icon={<FaChild size="1.5em" />}
            href="/attendance"
            text={"attendance"}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
    );
  }
}
