import React from "react";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        Demo created by{" "}
        <a
          className="footer__link"
          target="_blank"
          href="https://twitter.com/AdrianBeceDev"
          rel="noreferrer"
        >
          Adrian Bece
        </a>
      </div>
    </footer>
  );
};

export default Footer;
