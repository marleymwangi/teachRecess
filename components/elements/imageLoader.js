import Image from "next/image";
import { useState } from "react";
//custom
import { classNames } from "../../helpers/utility";

export default function ImageLoader({ priority, src, alt, objectFit, objectPosition }) {
  const [load, setLoad] = useState(false);
  return (
    <div className="relative !w-full !h-full">
      <Image
        src={src ? src : "/images/generic.webp"}
        className={classNames(!load && "bg-gray-300 animate-pulse")}
        layout="fill"
        priority={priority}
        objectFit={objectFit}
        objectPosition={objectPosition}
        onLoadingComplete={() => setLoad(true)}
        alt={alt || ""}
      />
    </div>
  );
}
