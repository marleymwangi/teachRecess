import dynamic from "next/dynamic";
//dynamic
const MdReport = dynamic(async () => (await import("react-icons/md")).MdReport);

export default function UserWarn({ data }) {
  return (
    <div className="bg-white flex items-center justify-between rounded-box shadow px-6 py-4">
      <div className="flex items-center">
        <div className="avatar mr-4">
          <div className="w-10 rounded-full">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <p className="font-nexa text-gray-400 text-lg">{data.name}</p>
      </div>
      <button className="btn btn-sm text-xs btn-outline btn-error text-red-500 gap-1 shadow">
        <span>Report</span>
        <MdReport size="2em" />
      </button>
    </div>
  );
}
