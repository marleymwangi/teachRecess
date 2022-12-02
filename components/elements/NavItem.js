import Link from "next/link";
//custom
import { classNames } from "../../helpers/utility";

export default function NavItem({
  href,
  selected,
  iconOn: IconOn,
  iconOff: IconOff,
}) {
  const size = "1.75em";

  return (
    <Link href={href}>
      <div className={classNames("swap py-3", selected && "swap-active")}>
        <input type="checkbox" />
        <IconOn className="swap-on" size={size} />
        <IconOff className="swap-off" size={size} />
      </div>
    </Link>
  );
}
