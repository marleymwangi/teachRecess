import dynamic from "next/dynamic";
import DropDown from "../../components/elements/dropDown";
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
      <section className="form__sec">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Preferred Hospital</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-primary input-bordered w-full focus:bg-white"
          />
        </div>
        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Allergies</span>
            </label>
            <textarea
              type="text"
              placeholder="Type here"
              className="textarea textarea-primary input-bordered w-full focus:bg-white no-scroll"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Medical Allergies</span>
            </label>
            <textarea
              type="text"
              placeholder="Type here"
              className="textarea textarea-primary input-bordered w-full focus:bg-white no-scroll"
            />
          </div>
        </div>
      </section>
      <div className="flex justify-end my-6">
        <div className="btn btn-primary">Save</div>
      </div>
    </main>
  );
}
