import { SessionProvider } from "next-auth/react";
import { ProvideData } from "../context/dataContext";
import Layout from "../layout";
//css
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ProvideData>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProvideData>
    </SessionProvider>
  );
}

export default MyApp;
