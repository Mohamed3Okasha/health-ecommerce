import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer w-100 bg-secondary text-center text-white">
      <div className="textcenter p-3">
        <span>© 2022 Copyright: Health Ecommerce Team</span>
        <a
          className="ps-3 text-white"
          href="https://github.com/Mohamed3Okasha/health-ecommerce"
          target="blank"
        >
          <i className="bi bi-github fs-3"></i>
        </a>
        <span></span>
      </div>
    </footer>
  );
};

export default Footer;
