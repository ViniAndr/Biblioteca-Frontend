import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const ExpandableSection = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 w-full md:w-1/2 cursor-pointer">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="p-3" onClick={toggleExpand}>
          {isExpanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </span>
      </div>
      <div className={`${isExpanded && "mt-4"}`}>{isExpanded && children}</div>
    </div>
  );
};

export default ExpandableSection;
