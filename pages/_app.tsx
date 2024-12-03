import Wrapper from "@/Layout/Wrapper/Wrapper";
import { NetworkProvider } from "@/Offline";
import { store } from "@/Toolkit/store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './auth/login/Login.css'

import { ThemeContextProvider, useThemeContext } from "@/ThemeContext/ThemeContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeContextProvider>
  <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NetworkProvider>
         
          <Wrapper>
            <Component {...pageProps} />
            <ToastContainer autoClose={1500} />
          </Wrapper>
          
        
        </NetworkProvider>
      </Provider>
    </QueryClientProvider>
    </ThemeContextProvider>
  
  );
}
