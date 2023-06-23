import '@/styles/globals.css'
import SideNavbar from '@/components/SideNavbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Navbar from '@/components/Navbar';
import { Folderwrapper } from '@/lib/Foldercontext';


export default function App({ Component, pageProps }) {


  return (
    <>
      <Folderwrapper>
      <Navbar />
      <SideNavbar />
      <Component {...pageProps} />
      <ScrollToTop />
      <Footer />
      </Folderwrapper>
    </>
  )
}
