import dynamic from "next/dynamic";
import usePersonFetch from "../../helpers/hooks/person";
import ImageLoader from "../elements/imageLoader";
//dynamic
const MdReport = dynamic(async () => (await import("react-icons/md")).MdReport);

export default function UserWarn({ data }) {
  const { person } = usePersonFetch(data?.id);
  return (
    <div className="bg-white flex items-center justify-between rounded-box shadow px-6 py-4">
      <div className="flex items-center">
        <div className="avatar mr-4">
          <div className="w-10 rounded-full">
            {person?.image?.length > 0 ? (
              <ImageLoader
                src={person?.image}
                fallbackSrc="/assets/person.webp"
              />
            ) : (
              <div className="relative bg-primary w-full h-full">
                <p className="abs-center text-white">
                  {person?.name?.slice(0, 1)}
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="font-nexa text-gray-400">{person?.name}</p>
      </div>
      <button className="btn btn-sm btn-outline btn-error text-red-500 w-10 h-10 p-0 rounded-full shadow">
        <MdReport size="2em" />
      </button>
    </div>
  );
}
