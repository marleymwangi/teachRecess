import { useRouter } from "next/router";
//custom
import ImageLoader from "../elements/imageLoader";
import { useData } from "../../context/dataContext";

export default function Profile({ data }) {
  const router = useRouter();
  const { setSelStudent } = useData();

  const handleClick = (e) => {
    setSelStudent(data);
    router.push("/student?id=" + data?.id);
  };
  return (
    <div onClick={handleClick} className="rounded-box bg-white shadow-lg">
      <div className="flex items-center gap-6 py-8 px-6">
        <div className="avatar">
          <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <ImageLoader src={data?.image} objectPosition="top"/>
          </div>
        </div>
        <div className="grid font-poppins">
          <p className="font-medium">{data?.name}</p>
          <p className="text-xs text-gray-500">Riara Academy, Class: 4a</p>
        </div>
      </div>
    </div>
  );
}
