import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/components/Store/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
};

export default MyApp;
