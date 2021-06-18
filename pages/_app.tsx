import "nprogress/nprogress.css";
import Ngr from "nprogress";
import Router from "next/router";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useApollo } from "../lib/apolloClient";
import theme from "../src/theme";
import Layout from "@components/Layout";

Router.events.on("routeChangeStart", () => Ngr.start());
Router.events.on("routeChangeComplete", () => Ngr.done());
Router.events.on("routeChangeError", () => Ngr.done());

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
