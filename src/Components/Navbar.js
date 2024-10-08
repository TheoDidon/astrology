import React from "react";

function Navbar() {
  return (
    <div>
      <ul className="flex justify-end p-4 text-xl">
        <li className="px-4">
          <a href="/astrology">About</a>
        </li>
        <li className="px-4">
          <a href="/astrology">Your sign</a>
        </li>
        <li className="px-4">
          <a href="/astrology">Prices</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
