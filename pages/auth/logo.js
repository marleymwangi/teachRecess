import Image from "next/image";

export default function Logo() {
  return (
    <section className="relative mb-5 overflow-hidden">
      <div className="absolute z-0 bg-purple-800 w-screen h-[40vh]"/>
      <div className="absolute bg-cyan-400 w-screen h-[20vh] z-10 top-[40vh] -left-[30vw] rotate-45"/>
      <div className="absolute bg-cyan-400 w-screen h-[20vh] z-10 top-[40vh] -right-[30vw] -rotate-45"/>
      <div className="absolute w-screen h-[50vh] z-10 top-0 -left-[25vw] rotate-45">
        <Image
          priority="high"
          src="/images/waves.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="absolute w-[8vh] h-[8vh] z-40 top-10 left-10">
        <Image
          priority="high"
          src="/images/cloud.png"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="absolute w-[8vh] h-[8vh] z-40 top-4 right-14">
        <Image
          priority="high"
          src="/images/cloud.png"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="absolute w-[8vh] h-[8vh] z-40 top-28 right-32">
        <Image
          priority="high"
          src="/images/jet.png"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="absolute w-screen h-[50vh] z-10 top-0 -right-[25vw] -rotate-45">
        <Image
          priority="high"
          src="/images/waves.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
      <div className="relative h-[25vh] mt-[25vh] z-50">
        <Image
          priority="high"
          src="/images/recess.png"
          layout="fill"
          objectFit="contain"
          objectPosition="botttom"
        />
      </div>
    </section>
  );
}
