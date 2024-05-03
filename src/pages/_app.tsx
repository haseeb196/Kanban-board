import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { Provider } from "react-redux";
import { categoryReducer } from "@/components/Store/store";
import  { userReducer } from "@/components/Store/UserStore";
import { configureStore } from "@reduxjs/toolkit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
  },
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
