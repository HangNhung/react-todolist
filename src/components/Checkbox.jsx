import React from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

const styleCheckbox = "text-xl text-blue-600 cursor-pointer";

const Checkbox = ({ status, ...props }) => {
  if (status === "completed") {
    return <RiCheckboxCircleFill className={styleCheckbox} {...props} />;
  } else if (status === "hover") {
    return <RiCheckboxCircleLine className={styleCheckbox} {...props} />;
  } else
    return <RiCheckboxBlankCircleLine className={styleCheckbox} {...props} />;
};

export default Checkbox;
