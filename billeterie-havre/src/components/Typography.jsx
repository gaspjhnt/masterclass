import React from "react";

export default function Typography({ children, className, variant, display }) {
  let color;
  switch (display) {
    case "white":
      color = "text-white";
      break;
    case "primary":
      color = "text-sky-900";
      break;

    default:
      color = "text-black";
      break;
  }

  switch (variant) {
    case "title":
      return (
        <div>
          <h1 className={`${className} ${color}  text-5xl `}>{children}</h1>
        </div>
      );

    case "h1":
      return (
        <div>
          <h1 className={`${className} ${color} text-4xl `}>{children}</h1>
        </div>
      );
    case "h2":
      return (
        <div>
          <h1 className={`${className} ${color} text-3xl `}>{children}</h1>
        </div>
      );

    case "xl":
      return (
        <div>
          <h1 className={`${className} ${color} text-xl `}>{children}</h1>
        </div>
      );

    default:
      return (
        <div>
          <h1 className={`${className} ${color}  text-normal `}>{children}</h1>
        </div>
      );
  }
}
