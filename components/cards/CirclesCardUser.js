//hooks
import useClassroomFetch from "../../helpers/hooks/classroom";
//custom
import CirclesCard from "./CirclesCard";
import ImageLoader from "../elements/imageLoader";
import useUserFetch from "../../helpers/hooks/user";

export default function CirclesCardUser() {
  return <CirclesCard content={<Homework />} />;
}

const Homework = () => {
  const { user } = useUserFetch();
  const { school, classroom } = useClassroomFetch(user);

  return (
    <div className="relative z-10 p-6">
      <div className="flex flex-col">
        <div className="">
          <div className="avatar">
            <div className="w-14 rounded-full shadow-lg">
              <ImageLoader src={user?.image} objectPosition={"top"} />
            </div>
          </div>
          <p className="text-xl text-white font-bold">{user?.name}</p>
          <div className="flex flex-wrap gap-2 font-medium">
            <span className="text-base text-gray-50">{school?.name}</span>
            <span className="text-base text-gray-50">Class: {classroom?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
