import Image from "next/image";
import { useState, useEffect } from "react";
//custom packages
import { Transition } from "@headlessui/react";

export default function ImageLoader({ src, fallbackSrc, alt, width, height }) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, set_imgSrc] = useState(src);

  useEffect(() => {
    if(src){
    set_imgSrc(src);
    }else{
      set_imgSrc(fallbackSrc || "/assets/noimage.webp");
    }
  }, [src]);

  const handleImageLoad = (e) => {
    if (e.naturalWidth === 0) {
      // Broken image
      set_imgSrc(fallbackSrc);
    } else {
      setLoaded(true);
    }
  };

  if (imgSrc) {
    return (
      <div
        className={`!w-full !h-full bg-gray-400 bg-opacity-30 ${
          !loaded && "blur animate-pulse"
        }`}
      >
        <Transition
          appear={true}
          show={true}
          enter="transition-all duration-75 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="!w-full !h-full"
        >
          <div className="relative !w-full !h-full">
            {!width && !height && (
              <Image
                src={imgSrc}
                layout="fill"
                alt={alt ? alt : ""}
                className="z-0 object-top"
                onLoadingComplete={(e) => handleImageLoad(e)}
                onError={() => {
                  set_imgSrc(fallbackSrc);
                }}
              />
            )}
            {width && height && (
              <Image
                src={imgSrc}
                width={width}
                height={height}
                alt={alt ? alt : ""}
                className="z-0 object-top"
                onLoadingComplete={(e) => handleImageLoad(e)}
                onError={() => {
                  set_imgSrc(fallbackSrc);
                }}
              />
            )}
          </div>
        </Transition>
      </div>
    );
  } else {
    return <></>;
  }
}
