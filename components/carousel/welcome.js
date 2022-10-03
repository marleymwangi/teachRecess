import { useState } from "react";
import Link from "next/link";
//custom
import { classNames } from "../../helpers/utility";
import CardWelcome from "../cards/welcome";

export default function CarouselWelcome() {
  const [selected, setSelected] = useState(0);
  

  return (
    <div className="flex flex-col h-[90vh]  ">
      <div className="carousel carousel-center w-full pb-20 flex-1">
        <CardWelcome
          id="item1"
          index={0}
          setFunc={setSelected}
          image="/images/welcome1.png"
          
        />
        <CardWelcome
          id="item2"
          index={1}
          setFunc={setSelected}
          image="/images/welcome2.png"
        />
        <CardWelcome
          id="item3"
          index={2}
          setFunc={setSelected}
          image="/images/welcome3.png"
        />
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <Indicator id="item1" index={0} selected={selected} />
        <Indicator id="item2" index={1} selected={selected} />
        <Indicator id="item3" index={2} selected={selected} />
      </div>
      {selected === 2 ? (
        <Link href="/auth/signin">
          <div className="my-6 grid gap-4">
            <button className="btn btn-primary font-poppins text-white btn-lg w-full mx-auto">
              Sign In
            </button>
          </div>
        </Link>
      ) : (
        <div className="h-28"></div>
      )}
    </div>
  );
}

const Indicator = ({ id, index, selected }) => {
  const link = `#${id}`;
  const highlight = Boolean(index === selected);
  return (
    <a
      href={link}
      className={classNames(
        "rounded-full h-6 text-center",
        highlight ? "bg-cyan-500 w-12" : "bg-cyan-300 w-8"
      )}
    />
  );
};
