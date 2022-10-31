import Link from "next/link";
//custom
import { classNames } from "../../helpers/utility";

export default function NavItem({
  id,
  href,
  setFunc,
  selected,
  iconOn: IconOn,
  iconOff: IconOff,
}) {
  const size = "1.75em";

  const handleClick = () => {
    setFunc(id);
  };

  return (
    <Link href={href}>
      <div
        className={classNames("swap py-3", selected === id && "swap-active")}
        onClick={handleClick}
      >
        <input type="checkbox" />
        <IconOn className="swap-on" size={size} />
        <IconOff className="swap-off" size={size} />
      </div>
    </Link>
  );
}
