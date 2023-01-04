import React from "react";
import { Link } from "react-router-dom";

function Button({ type, children, href, onClick }) {
  if (type === "external") {
    return (
      <a
         className="mx-5 bg-blue-600"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  } else if (type === "internal") {
    return (
      <Link to={href}  className="mx-5 bg-blue-600">
        {children}
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} className="mx-5 bg-blue-600">
        {children}
      </button>
    );
  }
}

export default Button;
