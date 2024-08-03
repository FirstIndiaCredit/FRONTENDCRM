import React from "react";

function Footer() {
  return (
    <div>
      <footer className="relative bg-gray-900 px-4 pt-20">
        <nav
          aria-label="Footer Navigation"
          className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
        >
          <a href="#" className="font-medium text-white">
            Demo
          </a>
          <a href="#" className="font-medium text-white">
            Support
          </a>
          <a href="#" className="font-medium text-white">
            Privacy Policy
          </a>
          <a href="#" className="font-medium text-white">
            Terms &amp; Conditions
          </a>
        </nav>
        <p className="py-10 text-center text-gray-300">
          © 2022 Boleno | All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default Footer;
