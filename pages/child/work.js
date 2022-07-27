import dynamic from "next/dynamic";
import ImageLoader from "../../components/elements/imageLoader";
import Title from "../../components/elements/title";

//custom
const FaEdit = dynamic(async () => (await import("react-icons/fa")).FaEdit);
const BiRightArrow = dynamic(
  async () => (await import("react-icons/bi")).BiRightArrow
);
const HiInformationCircle = dynamic(
  async () => (await import("react-icons/hi")).HiInformationCircle
);
const MdHealthAndSafety = dynamic(
  async () => (await import("react-icons/md")).MdHealthAndSafety
);
const MdClass = dynamic(async () => (await import("react-icons/md")).MdClass);

export default function ChildProfile() {

  return (
    <main className="profile__page">
      <section className="user">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://api.lorem.space/image/face?hash=3174" />
          </div>
        </div>
        <h1>Child 1</h1>
        <h2>Riara School</h2>
      </section>
      <section className="mt-6 text-gray-900">
        <Title title="My Work" />
        <div className="my-6 grid grid-cols-1 gap-6">
          <div className="work__cont bg-white rounded-3xl overflow-hidden shadow pb-4">
            <div className="image relative h-52 flex flex-1">
              <ImageLoader src="/assets/work/1.jpeg" />
            </div>
            <div className="mt-4">
              <h5 className="text-center font-semibold">Crater Project</h5>
              <h6 className="text-sm text-center text-gray-500 -mt-1">Friday, 10th May 2022</h6>
            </div>
          </div>
          <div className="work__cont bg-white rounded-3xl overflow-hidden shadow pb-4">
            <div className="image relative h-52 flex flex-1">
              <ImageLoader src="/assets/work/2.jpeg" />
            </div>
            <div className="mt-4">
              <h5 className="text-center font-semibold">Water Cycle Project</h5>
              <h6 className="text-sm text-center text-gray-500 -mt-1">Friday, 4th May 2022</h6>
            </div>
          </div>
          <div className="work__cont bg-white rounded-3xl overflow-hidden shadow pb-4">
            <div className="image relative h-52 flex flex-1">
              <ImageLoader src="/assets/work/3.jpeg" />
            </div>
            <div className="mt-4">
              <h5 className="text-center font-semibold">Art Project</h5>
              <h6 className="text-sm text-center text-gray-500 -mt-1">Friday, 28th April 2022</h6>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-end my-6">
        <div className="btn btn-primary">Save</div>
      </div>
    </main>
  );
}
