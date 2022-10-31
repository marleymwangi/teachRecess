import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//custom packs
import { AnimatePresence, motion } from "framer-motion";
import { useData } from "../../context/dataContext";
//custom
const IoCloseCircleOutline = dynamic(
  async () => (await import("react-icons/io5")).IoCloseCircleOutline
);

export default function Banner() {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setShow(true);
      // Optionally, send analytics event that PWA install promo was shown.
      // console.log("👍", "beforeinstallprompt fired", event);
    });

    window.addEventListener("appinstalled", (event) => {
      // Clear the deferredPrompt so it can be garbage collected
      window.deferredPrompt = null;
      // Hide the install button.
      setState("installed");
      // console.log("👍", "appinstalled fired", event);
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
    //console.log("👍", "userChoice", result);
    if (result) {
      if (result.outcome == "dismissed") {
        setState("dismissed");
        closeBanner();
      } else if (result.outcome == "accepted") {
        closeBanner();
      }
    }
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
  };

  return (
    <div
      className={`fixed z-50 bg-white bottom-0 w-full max-h-fit border border-yellow-500 text-cyan-600 font-poppins`}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            variants={bannerVar}
            initial="hide"
            animate="show"
            exit="hide"
            className="content"
          >
            <button className="float-right p-2" onClick={closeBanner}>
              <IoCloseCircleOutline size="2em" />
            </button>
            <div className="p-6 text-center">
              <p>
                {!state && "Add the Recess application to your HomeScreen"}
                {state && state == "installed" && "Thank you 😀"}
                {state && state == "dismissed" && "Maybe another time"}
              </p>
            </div>
            <div className="grid place-content-center">
              {!state && (
                <button
                  className="btn btn-primary mb-8 max-w-sm"
                  onClick={pwaInstall}
                >
                  Install
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const bannerVar = {
  hide: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
};