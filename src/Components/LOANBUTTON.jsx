import React from "react";
import { Link } from "react-router-dom";
function LOANBUTTON({ title, img, mainlink, h, w }) {
  return (
    <Link className="hover:scale-105 transition-all" to={mainlink}>
      <img className={` h-${h} w-${w} object-contain`} src={img} alt={title} />
    </Link>
  );
}

export default LOANBUTTON;
