import Image from "next/image";

export default function Logo() {
  return (
    <section className="relative mb-5 overflow-hidden">
      <div className="absolute z-0 bg-purple-800 w-screen h-[40vh]"/>
      <div className="absolute w-screen h-[40vh] z-10">
        <Image
          priority="eager"
          src="/images/wave.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="absolute w-[4vh] h-[4vh] z-40 top-[5vh] left-[15vw]">
        <Image
          priority="eager"
          src="/images/cloud.png"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="absolute w-[6vh] h-[6vh] z-40 top-[2vh] right-[10vw]">
        <Image
          priority="eager"
          src="/images/cloud.png"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="absolute w-[4vh] h-[4vh] z-40 top-[3vh] right-[40vw] rotate-45">
        <Image
          priority="eager"
          src="/images/jet.png"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="relative h-[15vh] mt-[8vh] mb-[2vh] z-50">
        <Image
          priority="eager"
          src="/images/recess.png"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
    </section>
  );
}
