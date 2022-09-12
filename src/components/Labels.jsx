import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Labels = () => {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 mr-2 ">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({label:lbl, checked: !checked})}
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded-full focus:ring-0 cursor-pointer`}
            style={{ backgroundColor: `${lbl}`,  }}
          />
        </label>
      ))}
    </>
  );
};

export default Labels;
