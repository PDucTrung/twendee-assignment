import Layout from "@/components/Layout";
import Head from "next/head";
import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>TWENDEE Assignment</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <StyledEngineProvider injectFirst>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StyledEngineProvider>
      </Provider>
    </>
  );
}
