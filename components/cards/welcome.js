import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function CardWelcome({ id, index, setFunc, image, top, bottom }) {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setFunc(index);
    }
  }, [inView, setFunc, index]);

  return (
    <div id={id} className="relative carousel-item ">
      <div
        ref={ref}
        className="absolute abs-center pointer-events-none w-2/3 h-full z-0"
      />
      <div className="z-10">
        <p className="w-[70vw] mx-auto font-poppins font-semibold text-center text-5xl">{top}</p>
        <div className="grid place-content-center">
          <div className="relative w-[40vh] h-[40vh]">
            <Image src={image} layout="fill"/>
          </div>
        </div>
        <p className="w-[70vw] mx-auto font-medium text-gray-400 mt-5 text-center">{bottom}</p>
      </div>
    </div>
  );
}
