import { useState } from "react";
import Link from "next/link";
//custom
import { classNames } from "../../helpers/utility";
import CardWelcome from "../cards/Welcome";

export default function CarouselWelcome() {
  const [selected, setSelected] = useState(0);

  const moveBack = () => {
    let tmp = selected > 0 ? selected - 1 : 0;
    setSelected(tmp);
  };

  const moveForward = () => {
    let tmp = selected < 3 ? selected + 1 : 2;
    setSelected(tmp);
  };

  return (
    <div>
      <div className="carousel carousel-center w-full flex-1">
        <CardWelcome
          id="item1"
          index={0}
          setFunc={setSelected}
          image="/images/welcome2.png"
          top="Get involved"
          bottom={`Participate in your child${"'s"} learning on a daily.`}
        />
        <CardWelcome
          id="item2"
          index={1}
          setFunc={setSelected}
          image="/images/welcome3.png"
          top="Class to Curriculum"
          bottom="360 overview on the performance of the student in and out of class"
        />
        <CardWelcome
          id="item3"
          index={2}
          setFunc={setSelected}
          image="/images/welcome1.png"
          top="Teacher whisperer"
          bottom="Link up with your child’s teacher at the touch of a button"
        />
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <Indicator id="item1" index={0} selected={selected} />
        <Indicator id="item2" index={1} selected={selected} />
        <Indicator id="item3" index={2} selected={selected} />
      </div>

      <div className="grid grid-cols-2 gap-16 px-6 pt-[10vh]">
        <div onClick={moveBack} className="my-6 grid gap-4 container mx-auto">
          <button className="btn btn-primary font-poppins text-white w-full max-w-md mx-auto">
            Back
          </button>
        </div>
        {selected === 2 ? (
          <Link href="/auth/signin">
            <div className="my-6 grid gap-4 container mx-auto">
              <button className="btn btn-primary font-poppins text-white w-full max-w-md mx-auto">
                Sign In
              </button>
            </div>
          </Link>
        ) : (
          <div
            onClick={moveForward}
            className="my-6 grid gap-4 container mx-auto"
          >
            <button className="btn btn-primary font-poppins text-white w-full max-w-md mx-auto">
              Next
            </button>
          </div>
        )}
      </div>
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
        highlight ? "bg-cyan-700 w-12" : "bg-cyan-500 w-8"
      )}
    />
  );
};
