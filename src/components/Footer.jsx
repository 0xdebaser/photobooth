import React from "react";

function Footer() {
  return (
    <div>
      <div id="footer-container">
        <footer className="mt-3 d-flex flex-wrap justify-content-between align-items-center">
          <div className="col-md-4 d-flex align-items-center py-3">
            {/* could put some footer text here */}
          </div>
          <ul className="nav col-md-4 pe-3 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a href="https://twitter.com/fizzgen_me">
                <i className="bi bi-twitter footer-icons"></i>
              </a>
            </li>
            <li className="ms-3">
              <a href="mailto:support@fizzgen.com">
                <i className="bi bi-envelope footer-icons"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="https://fizzgen.me">
                <i className="bi bi-emoji-kiss footer-icons"></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
