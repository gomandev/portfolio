import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import store from "../store/config";
import { Provider } from "react-redux";

import { MainLayout } from "../components/shared/mainLayout";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}

export default MyApp;
