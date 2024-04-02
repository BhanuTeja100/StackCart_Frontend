import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import { Helmet } from "react-helmet";

import { Toaster } from 'react-hot-toast'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className='layout'>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>

      </Helmet>
      <Header />
      <main >
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'StackCart - Fill You Cart',
  description: 'MERN stack project',
  keywords: 'mern, react, node, mongodb',
  author: 'Teja'
}
export default Layout