import { ProvideAuth } from "../context/authContext";
import { ProvideData } from "../context/dataContext";
import Layout from "../layout";
//css
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
//messaging
import Notification from "../components/elements/ToastNotifications";

function MyApp({ Component }) {
  return (
    <ProvideAuth>
      <ProvideData>
        <Layout>
          <Notification>
            <Component />
          </Notification>
        </Layout>
      </ProvideData>
    </ProvideAuth>
  );
}

export default MyApp;
