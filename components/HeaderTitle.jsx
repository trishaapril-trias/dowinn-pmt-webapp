import Image from "@node_modules/next/image";
import React from "react";

const HeaderTitle = () => {
  return (
    <div>
      <h1 className=" head_text text-center">
        Project Management Tool
        <br className=" max-md:hidden" />
      </h1>
      <p className="orange_gradient text-center text-4xl font-bold mt-2">
        Project & Tasks Tracker
      </p>
    </div>
  );
};

export default HeaderTitle;
