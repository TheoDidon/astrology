import React from "react";

function Navbar() {
  return (
    <div>
      <ul className="flex justify-end p-4 text-xl">
        <li className="px-4">
          <a href="/">About</a>
        </li>
        <li className="px-4">
          <a href="/">Your sign</a>
        </li>
        <li className="px-4">
          <a href="/">Prices</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
