import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { onMessage, getMessaging } from "firebase/messaging";
//hooks
import useUserFetch from "../../helpers/hooks/user";
//custom
import { firebaseCloudMessaging } from "../../webPush.js";


function PushNotificationLayout({ children }) {
  const { updateNotId } = useUserFetch();
  const router = useRouter();
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        //console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          //console.log("token", token);
          updateNotId({
            notId: token,
          });
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      toast.info(
        <div onClick={() => handleClickPushNotification(payload?.data?.url)}>
          <h5 className="font-medium text-gray-900">{payload?.notification?.title}</h5>
          <h6>{payload?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;
