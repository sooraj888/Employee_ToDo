import React, { useEffect, useRef } from "react";

export default function useOutsideClick(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!ref?.current?.contains?.(event.target)) {
        console.log("You clicked outside of me!");
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return null;
}
