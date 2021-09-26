import Ngr from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '../lib/apolloClient';

import '../src/styles/tailwind.css';
import '../src/styles/app.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => Ngr.start());
Router.events.on('routeChangeComplete', () => Ngr.done());
Router.events.on('routeChangeError', () => Ngr.done());

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
