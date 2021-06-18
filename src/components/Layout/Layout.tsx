import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Head from 'next/head'

interface Props {
  className?: string;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Simple market</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
