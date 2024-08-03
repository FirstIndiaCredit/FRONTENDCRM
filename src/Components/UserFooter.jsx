import React from "react";

function UserFooter() {
  return (
    <div>
      <footer className="py-2">
        <div className="flex w-full flex-wrap items-center justify-end  gap-6 px-2 ">
          <ul className="flex items-center gap-4">
            <li>
              <a
                href="https://www.FirstIndiaCredit.com"
                target="_blank"
                className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                First India Credit
              </a>
            </li>
            <li>
              <a
                href="https://www.FirstIndiaCredit.com/about"
                target="_blank"
                className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://firstindiacredit.com/contact"
                target="_blank"
                className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default UserFooter;
