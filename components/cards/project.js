import ImageLoader from "../elements/imageLoader";

export default function CardProject({data}) {
  return (
    <div className="bg-white p-2 rounded-box max-h-fit">
      <div className="relative rounded-lg overflow-hidden w-full h-40">
        <ImageLoader src={data?.image} objectFit="contain"/>
      </div>
      <div className="p-2">
        <p className="text-center font-semibold font-nexa">{data?.caption}</p>
        <p className="text-xs text-gray-400 text-center">Subject : Science</p>
        <p className="text-xs text-gray-400 text-center">Class : 6p</p>
        <p className="text-xs text-gray-400 text-center">{data?.timeFormatted}</p>
      </div>
    </div>
  );
}
