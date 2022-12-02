import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
//custom
import NavItem from "../elements/NavItem";

//dynamic
const RiHome2Line = dynamic(
  async () => (await import("react-icons/ri")).RiHome2Line
);
const RiHome2Fill = dynamic(
  async () => (await import("react-icons/ri")).RiHome2Fill
);
const RiChat1Line = dynamic(
  async () => (await import("react-icons/ri")).RiChat1Line
);
const RiChat1Fill = dynamic(
  async () => (await import("react-icons/ri")).RiChat1Fill
);
const RiBookletLine = dynamic(
  async () => (await import("react-icons/ri")).RiBookletLine
);
const RiBookletFill = dynamic(
  async () => (await import("react-icons/ri")).RiBookletFill
);
const BsPeople = dynamic(async () => (await import("react-icons/bs")).BsPeople);
const BsPeopleFill = dynamic(
  async () => (await import("react-icons/bs")).BsPeopleFill
);

export default function BottomNavbar() {
  const router = useRouter();
  const [selected, setSelected] = useState("home");

  let link = "/student/profiles";

  if (
    router.pathname.indexOf("/auth/") === 0 ||
    router.pathname.indexOf("/welcome") === 0
  ) {
    return null;
  } else {
    return (
      <div className="fixed bottom-0 z-40 w-screen border-t border-yellow-500 bg-base-100 text-primary grid grid-cols-4">
        <NavItem
          href="/"
          selected={router.pathname === "/"}
          iconOn={RiHome2Fill}
          iconOff={RiHome2Line}
        />
        <NavItem
          href="/chats"
          selected={router.pathname.indexOf("/chats") === 0}
          iconOn={RiChat1Fill}
          iconOff={RiChat1Line}
        />
        <NavItem
          href="/calendar"
          selected={router.pathname.indexOf("/calendar") === 0}
          iconOn={RiBookletFill}
          iconOff={RiBookletLine}
        />
        <NavItem
          href={link}
          selected={router.pathname.indexOf("/student/") === 0}
          iconOn={BsPeopleFill}
          iconOff={BsPeople}
        />
      </div>
    );
  }
}
