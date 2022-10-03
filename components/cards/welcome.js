import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function CardWelcome({ id, index, setFunc, image }) {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setFunc(index);
    }
  }, [inView, setFunc, index]);

  return (
    <div id={id} className="relative carousel-item w-full flex flex-col">
      <div
        ref={ref}
        className="absolute abs-center pointer-events-none w-2/3 h-full z-0"
      />
      <div className="z-10">
        <p className="font-poppins font-semibold text-4xl">Welcome to</p>
        <p className="font-poppins font-semibold text-6xl ml-20">Recess</p>
        <div className="grid place-content-center">
          <Image src={image} width={300} height={300} />
        </div>
        <p className="font-medium text-gray-400 mt-5 text-center">
          Recess is a digital platform that is built to enhance engagement and
          communication between parents and the school
        </p>
      </div>
    </div>
  );
}
