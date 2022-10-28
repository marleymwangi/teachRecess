import { SessionProvider } from "next-auth/react";
import { ProvideData } from "../context/dataContext";
import Layout from "../layout";
//css
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
//messaging
import Notification from "../components/elements/ToastNotifications";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ProvideData>
        <Layout>
          <Notification>
            <Component {...pageProps} />
          </Notification>
        </Layout>
      </ProvideData>
    </SessionProvider>
  );
}

export default MyApp;
