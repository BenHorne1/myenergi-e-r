import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons"

 const ToggleCheckbox = ({ onToggle, defaultToggle }) => {
  const [isChecked, setIsChecked] = useState(defaultToggle);

  const handleIsCheckekboxChange = () => {
    setIsChecked( !isChecked);
    if (onToggle) {
      onToggle( !isChecked);
    }
  };

  return (
    <label className="curser-pointer relative">
      <input
      id="check-box-1"
        type="checkbox"
        className="appearance-none h-4 w-4 border-[1px] rounded-md border-green-500 checked:bg-green-500 checked:border-white"
        checked={isChecked}
        onChange={handleIsCheckekboxChange}
      />
      <FontAwesomeIcon icon={faCheck}
      className="=text-8xl h-4 w-4 text-white
      absolute left-0 top-0 text-opacity-0 check-1 transition " />
      
    </label>
  );
};

export default ToggleCheckbox
