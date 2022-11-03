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
    <div id={id} className="relative carousel-item w-screen">
      <div
        ref={ref}
        className="absolute abs-center pointer-events-none w-2/3 h-full z-0"
      />
      <div className="z-10 mx-auto">
        <p className="w-[70vw] font-poppins font-semibold text-cyan-900 text-center text-3xl md:text-5xl">{top}</p>
        <div className="grid place-content-center">
          <div className="relative w-[40vw] h-[40vw] max-h-[600px] max-w-[600px]">
            <Image src={image} layout="fill" priority="high"/>
          </div>
        </div>
        <p className="w-[70vw] mx-auto font-medium text-cyan-800 mt-5 text-center text-sm md:text-base">{bottom}</p>
      </div>
    </div>
  );
}
