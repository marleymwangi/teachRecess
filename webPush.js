import { getMessaging, getToken, onMessage } from "firebase/messaging";
import localforage from "localforage";
import { app } from "./firebase";

const firebaseCloudMessaging = {
  init: async () => {
    try {
      const messaging = getMessaging(app);
      // const tokenInLocalForage = await localforage.getItem('fcm_token')

      // if (tokenInLocalForage !== null) {
      //     return tokenInLocalForage
      // }

      const status = await Notification.requestPermission();
      if (status && status === "granted") {
        const fcmToken = await getToken(messaging, {
          vapidKey:
            "BGngsUnWdky4Adfy3K16eGknd_BxJ4cGrBlhWo-A3I27l7nrtmNQb8MmARCTuBhsvOaZMTR2yaUbmdr_5nc7FaA",
        });

        if (fcmToken) {
          localforage.setItem("fcm_token", fcmToken);
          return fcmToken;
        }
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export { firebaseCloudMessaging };

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
