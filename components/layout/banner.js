import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//custom packs
import { AnimatePresence, motion } from "framer-motion";
import { useData } from "../../context/dataContext";
//custom
const IoCloseCircleOutline = dynamic(
  async () => (await import("react-icons/io5")).IoCloseCircleOutline
);

const bannerVar = {
  hide: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 1,
      damping: 10,
    },
  },
};

export default function Banner() {
  const { logInstallData } = useData();
  const [show, setShow] = useState(false);
  const [state, setState] = useState(null);
  const [plat, setPlat] = useState(null);

  let platform;
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setShow(true);
      setPlat(event?.platforms[0]);
      // Optionally, send analytics event that PWA install promo was shown.
      //console.log("👍", "beforeinstallprompt fired", event);
    });

    window.addEventListener("appinstalled", (event) => {
      // Clear the deferredPrompt so it can be garbage collected
      window.deferredPrompt = null;
      // Hide the install button.
      setState("installed");
      //console.log("👍", "appinstalled fired", event);
    });
  });

  useEffect(() => {
    let timer1;
    let delay = 2.5;
    if (state && (state == "installed" || state == "dismissed")) {
      timer1 = setTimeout(() => closeBanner(), delay * 1000);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [state]);

  const closeBanner = async () => {
    //logInstallData({
    //  platform:plat,
    //  state: state ? state : "dismissed",
    //});
    setShow(false);
  };

  const pwaInstall = async () => {
    console.log("👍", "pwaInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    if (result) {
      if (result.outcome == "dismissed") {
        setState("dismissed");
        closeBanner();
      } else if (result.outcome == "accepted") {
        let platform = result?.platform;
        setPlat(platform);
        closeBanner();
      }
    }
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
  };

  return (
    <div className={`banner ${!show && "hidden"} ${state && "shrink"}`}>
      <AnimatePresence>
        {show && (
          <motion.div
            variants={bannerVar}
            initial="hide"
            animate="show"
            exit="hide"
            className="content"
          >
            <div className="mobile">
              <span>
                {!state && "Add the Recess application to your HomeScreen"}
                {state && state == "installed" && "Thank you 😀"}
                {state && state == "dismissed" && "Maybe another time"}
              </span>
              {!state && <button onClick={pwaInstall}>Install</button>}
            </div>
            <div onClick={closeBanner}>
              <IoCloseCircleOutline size="2em" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
