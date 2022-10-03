import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
//custom
import { useData } from "../../context/dataContext";
import { classNames, isEmpty } from "../../helpers/utility";
import useChatroomFetch from "../../helpers/hooks/chatroom/chatroom";
import useStudentFetch from "../../helpers/hooks/students/student";
//dynamic
const IoSend = dynamic(async () => (await import("react-icons/io5")).IoSend);

export default function ModalComment() {
  const router = useRouter();
  const { selDiary, SetAlert } = useData();
  const { teacher } = useStudentFetch();
  const { createChatroom, sendDiaryMessagetoParticipant } = useChatroomFetch();

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const sendComment = () => {
    if (loading) return;
    if (!isEmpty(selDiary) && text.length > 0 && teacher?.id?.length > 0) {
      setLoading(true);
      createChatroom("103510460394260257923").then((id) => {
        console.log(id);
        sendDiaryMessagetoParticipant(id, text, selDiary)
          .then((res) => {
            if (res) {
              handleCloseModal();
              SetAlert({
                type: "success",
                message: "Sent Successfully",
              });
              setLoading(false);
              setText("");
              router.push(`chats/chat?id=${res}`);
            } else {
              console.log(res.message);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      });
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCloseModal = () => {
    document.getElementById("comment_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="comment_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex items-center justify-between pb-6">
            <p className="text-lg text-secondary">
              Please type your comment below
            </p>
            <label
              htmlFor="comment_modal"
              className="btn btn-sm btn-secondary btn-outline btn-circle"
            >
              ✕
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-400">Comment</span>
            </label>
            <textarea
              onChange={handleChange}
              value={text}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-secondary pt-2 resize-none rounded-full w-full flex-1"
            />
          </div>
          <div className="modal-action">
            <button
              htmlFor="comment_modal"
              onClick={sendComment}
              className={classNames(
                "btn btn-lg rounded-full gap-2 btn-secondary btn-wide mx-auto",
                loading && "loading"
              )}
            >
              Send <IoSend size="1.5em" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}