import { Outlet } from "react-router-dom";

import "./page.styles.scss";
import Navbar from "../../components/nav/navbar.component";
import Footer from "../../components/Footer";
import FizzgenModal from "../../components/modals/FizzgenModal";

function Page(props) {
  return (
    <div id="page-container" className="page">
      <div id="content-wrap">
        <Navbar
          user={props.user}
          setUser={props.setUser}
          galleryData={props.galleryData}
          setGalleryData={props.setGalleryData}
          userCredits={props.userCredits}
          setUserCredits={props.setUserCredits}
        />
        <FizzgenModal
          step1={props.step1}
          step2={props.step2}
          step3={props.step3}
        />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Page;
