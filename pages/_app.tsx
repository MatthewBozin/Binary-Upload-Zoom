import { AppProps } from 'next/app';
import React from 'react';
import './styles.css';

import Layout from 'client/components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
