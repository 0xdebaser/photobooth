import { Outlet } from "react-router-dom";

import "./page.styles.scss";
import Navbar from "../../components/nav/navbar.component";
import Footer from "../../components/Footer";

function Page(props) {
  return (
    <div id="page-container" className="page">
      <div id="content-wrap">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Page;
