import React from "react";

const HeaderTitle = () => {
  return (
    <div>
      <h1 className=" head_text text-center">
        Project Management Tool
        <br className=" max-md:hidden" />
        <span className="orange_gradient text-center">
          Project & Tasks Tracker
        </span>
      </h1>
    </div>
  );
};

export default HeaderTitle;
