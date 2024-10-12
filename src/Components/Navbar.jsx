import React from "react";
import LanguageBtn from "./LanguageBtn";

function Navbar({ isFrench }) {
  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full bg-transparent p-4 z-50">
      <div>
        <LanguageBtn />
      </div>
      <ul className="flex justify-end p-4 text-xl">
        <li className="px-4">
          <a href="/astrology" className="text-white">
            {isFrench ? <span>A propos</span> : <span>About</span>}
          </a>
        </li>
        <li className="px-4">
          <a href="/astrology" className="text-white">
            {isFrench ? <span>Ton signe</span> : <span>Your sign</span>}
          </a>
        </li>
        <li className="px-4">
          <a href="/astrology" className="text-white">
            {isFrench ? <span>Prix</span> : <span>Prices</span>}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
