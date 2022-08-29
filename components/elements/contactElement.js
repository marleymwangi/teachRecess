import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//custom
import { useData } from "../../context/dataContext";
import ImageLoader from "./imageLoader";
import useLongPress from "./longPress";

export default function ContactElement({ data, array, setFunc }) {
  const router = useRouter();
  const [selected, setSelected] = useState(false);
  const { createChatRoom, setSelChatPart } = useData();

  useEffect(() => {
    let found = array.some((id) => id === data?.id);
    if (found) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [array]);

  const onLongPress = () => {
    if (data?.id && array) {
      let tmp = array.concat(data.id);
      let uniqueIds = [...new Set(tmp)];
      if (array !== uniqueIds) {
        setFunc(uniqueIds);
      }
    }
  };

  const onClick = () => {
    setSelChatPart(data)
    console.log(data);
    if (data?.id) {
      createChatRoom(data.id).then((ref) => {
        handleCloseModal();
        router.push(`chats/chat?id=${ref}`);
      });
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  const handleCloseModal = () => {
    document.getElementById("contacts_modal").checked = false;
  };

  return (
    <div
      {...longPressEvent}
      htmlFor="contacts_modal"
      className="teacher !text-primary"
      //onClick={handleClick}
    >
      <div className="flex">
        <div className="avatar">
          <div className="ring-primary">
            <ImageLoader
              src={selected ? "/assets/done.webp" : data?.image}
              fallbackSrc="/assets/person.webp"
            />
          </div>
        </div>
        <div className="content">
          <h2 className="capitalize">{data?.name}</h2>
          <h3>
            <span className="text-gray-400">Parents to </span>
            {data?.students.length > 0 &&
              data.students.map((s) => `${s.name} `)}
          </h3>
        </div>
      </div>
    </div>
  );
}
